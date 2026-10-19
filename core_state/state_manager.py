"""
State Manager for Central Command Hub
Single Source of Truth across fleet, family, academic, health, and property domains.
Provides bidirectional persistence across hub_state.json and SQLite database.
"""

import json
import sqlite3
import os
import sys
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

STATE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(STATE_DIR, "hub_state.json")
DB_PATH = os.path.join(STATE_DIR, "hub_state.db")


class StateManager:
    def __init__(self, json_path: str = JSON_PATH, db_path: str = DB_PATH):
        self.json_path = json_path
        self.db_path = db_path
        self._init_sqlite()

    def _init_sqlite(self):
        """Initialize SQLite tables for domains, alerts, and executive briefings."""
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        
        # 1. Domains state table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS domain_state (
                domain TEXT PRIMARY KEY,
                payload_json TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)

        # 2. Alerts table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS alerts (
                id TEXT PRIMARY KEY,
                domain TEXT NOT NULL,
                severity TEXT NOT NULL,
                code TEXT NOT NULL,
                title TEXT NOT NULL,
                message TEXT NOT NULL,
                statute_or_category TEXT,
                due_date TEXT,
                action_url TEXT,
                created_at TEXT NOT NULL,
                acknowledged INTEGER DEFAULT 0,
                dismissed INTEGER DEFAULT 0
            )
        """)

        # 3. Weekly Executive Briefings table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS executive_briefings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cadence TEXT NOT NULL,
                generated_at TEXT NOT NULL,
                week_label TEXT NOT NULL,
                summary TEXT NOT NULL,
                payload_json TEXT NOT NULL
            )
        """)

        conn.commit()
        conn.close()

    def load_json(self) -> Dict[str, Any]:
        """Load full hub state from JSON."""
        if not os.path.exists(self.json_path):
            return {}
        with open(self.json_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def save_json(self, state: Dict[str, Any]) -> None:
        """Save full hub state to JSON and sync to SQLite."""
        state["meta"]["last_updated"] = datetime.now(timezone.utc).isoformat()
        with open(self.json_path, 'w', encoding='utf-8') as f:
            json.dump(state, f, indent=2)
        self.sync_to_sqlite(state)

    def get_domain(self, domain: str) -> Optional[Dict[str, Any]]:
        """Get state for a specific domain (fleet, family, academic, health, rental)."""
        state = self.load_json()
        return state.get(domain)

    def update_domain(self, domain: str, payload: Dict[str, Any]) -> None:
        """Update a specific domain in JSON and SQLite."""
        state = self.load_json()
        state[domain] = payload
        self.save_json(state)

    def sync_to_sqlite(self, state: Optional[Dict[str, Any]] = None) -> None:
        """Mirror JSON data into SQLite tables."""
        if state is None:
            state = self.load_json()
        
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        now_iso = datetime.now(timezone.utc).isoformat()

        # Update domain states
        for domain_name in ["fleet", "family", "academic", "health", "rental"]:
            if domain_name in state:
                cur.execute("""
                    INSERT INTO domain_state (domain, payload_json, updated_at)
                    VALUES (?, ?, ?)
                    ON CONFLICT(domain) DO UPDATE SET
                        payload_json = excluded.payload_json,
                        updated_at = excluded.updated_at
                """, (domain_name, json.dumps(state[domain_name]), now_iso))

        # Update alerts
        if "alerts" in state and isinstance(state["alerts"], list):
            for a in state["alerts"]:
                cur.execute("""
                    INSERT INTO alerts (id, domain, severity, code, title, message, statute_or_category, due_date, action_url, created_at, acknowledged, dismissed)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(id) DO UPDATE SET
                        severity = excluded.severity,
                        title = excluded.title,
                        message = excluded.message,
                        acknowledged = excluded.acknowledged,
                        dismissed = excluded.dismissed
                """, (
                    a.get("id"),
                    a.get("domain", "general"),
                    a.get("severity", "INFO"),
                    a.get("code", "ALERT"),
                    a.get("title", ""),
                    a.get("message", ""),
                    a.get("statute_or_category", ""),
                    a.get("due_date", ""),
                    a.get("action_url", ""),
                    a.get("created_at", now_iso),
                    1 if a.get("acknowledged") else 0,
                    1 if a.get("dismissed") else 0
                ))

        # Update Executive Briefing
        if "executive_briefing" in state and state["executive_briefing"]:
            b = state["executive_briefing"]
            cur.execute("""
                INSERT INTO executive_briefings (cadence, generated_at, week_label, summary, payload_json)
                VALUES (?, ?, ?, ?, ?)
            """, (
                b.get("cadence", "SUNDAY_1800"),
                b.get("generated_at", now_iso),
                b.get("week_label", "Current Week"),
                b.get("summary", ""),
                json.dumps(b)
            ))

        conn.commit()
        conn.close()

    def get_active_alerts(self, min_severity: Optional[str] = None) -> List[Dict[str, Any]]:
        """Fetch all non-dismissed alerts."""
        state = self.load_json()
        alerts = state.get("alerts", [])
        active = [a for a in alerts if not a.get("dismissed", False)]
        if min_severity:
            weights = {"INFO": 1, "WARNING": 2, "CRITICAL": 3}
            min_weight = weights.get(min_severity.upper(), 1)
            active = [a for a in active if weights.get(a.get("severity", "INFO").upper(), 1) >= min_weight]
        return active

    def add_alert(self, alert_item: Dict[str, Any]) -> None:
        """Add or update an alert item in the standardized pipeline."""
        state = self.load_json()
        if "alerts" not in state:
            state["alerts"] = []
        
        # Replace if code/id already exists
        existing_idx = None
        for idx, a in enumerate(state["alerts"]):
            if a.get("id") == alert_item.get("id") or a.get("code") == alert_item.get("code"):
                existing_idx = idx
                break
        
        if existing_idx is not None:
            state["alerts"][existing_idx] = alert_item
        else:
            state["alerts"].append(alert_item)
        
        self.save_json(state)

    def dismiss_alert(self, code_or_id: str) -> bool:
        """Mark an alert as dismissed."""
        state = self.load_json()
        found = False
        for a in state.get("alerts", []):
            if a.get("id") == code_or_id or a.get("code") == code_or_id:
                a["dismissed"] = True
                found = True
        if found:
            self.save_json(state)
        return found


# Singleton instance
hub_state = StateManager()

if __name__ == "__main__":
    hub_state.sync_to_sqlite()
    print("✅ [StateManager] Synchronized hub_state.json with SQLite database:", DB_PATH)
    active = hub_state.get_active_alerts()
    print(f"📊 Active Alerts Count: {len(active)}")
    for a in active:
        print(f"  • [{a.get('severity')}] {a.get('title')} ({a.get('domain')})")
