"""
Standardized Alert Pipeline for Central Command Hub
Evaluates high-priority events across rental, health, academic, fleet, and family domains
and routes them through a single unified notification pipeline.
"""

import sys
import os
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from state_manager import hub_state


def evaluate_health_alerts(health_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Check HRV recovery drops and athletic readiness deficits."""
    alerts = []
    athlete = health_data.get("athlete_profile", {})
    hrv = athlete.get("hrv", {})
    current_hrv = hrv.get("current", 0)
    baseline_hrv = hrv.get("target_baseline", 65)

    if current_hrv < baseline_hrv:
        alerts.append({
            "id": "alert_health_hrv",
            "domain": "health",
            "severity": "CRITICAL",
            "code": "HEALTH_HRV_BELOW_TARGET",
            "title": f"HRV Readiness Alert: {current_hrv} ms (Below {baseline_hrv} ms Baseline)",
            "message": f"Athletic recovery compromised. Planned training load should be throttled to Zone 2 active recovery.",
            "statute_or_category": "Athletic Readiness",
            "due_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "action_url": "health",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "acknowledged": False,
            "dismissed": False
        })
    return alerts


def evaluate_academic_alerts(academic_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Flag academic draft deadlines within T-72h."""
    alerts = []
    deadlines = academic_data.get("deadlines", [])
    now = datetime.now(timezone.utc)

    for d in deadlines:
        raw_deadline = d.get("deadline")
        if not raw_deadline:
            continue
        try:
            target_dt = datetime.fromisoformat(raw_deadline.replace('Z', '+00:00'))
            diff = target_dt - now
            hours_rem = diff.total_seconds() / 3600.0

            if 0 <= hours_rem <= 72:
                alerts.append({
                    "id": f"alert_acad_{d.get('id')}",
                    "domain": "academic",
                    "severity": "CRITICAL",
                    "code": f"ACADEMIC_DRAFT_T72H_{d.get('id')}",
                    "title": f"Academic Draft Due in T-{int(hours_rem)}h: {d.get('title')}",
                    "message": f"Draft deadline within T-72 hours ({target_dt.strftime('%b %d, %H:%M UTC')}). Final revision required.",
                    "statute_or_category": "Academic Submission",
                    "due_date": target_dt.strftime("%Y-%m-%d"),
                    "action_url": "academic",
                    "created_at": now.isoformat(),
                    "acknowledged": False,
                    "dismissed": False
                })
        except Exception:
            pass
    return alerts


def evaluate_fleet_alerts(fleet_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Check oil life decay, service intervals, and WA state tabs expirations."""
    alerts = []
    vehicles = fleet_data.get("vehicles", [])

    for v in vehicles:
        v_name = v.get("name", "Vehicle")
        v_id = v.get("id")

        # 1. Oil life decay
        oil_pct = v.get("oil_life_pct", 100)
        if oil_pct <= 20:
            severity = "CRITICAL" if oil_pct <= 10 else "WARNING"
            alerts.append({
                "id": f"alert_{v_id}_oil",
                "domain": "fleet",
                "severity": severity,
                "code": f"{v_id.upper()}_OIL_DECAY",
                "title": f"{v_name} Oil Life at {oil_pct}%",
                "message": f"Service interval approaching. Prepare synthetic oil & filter replacement.",
                "statute_or_category": "Preventive Maintenance",
                "due_date": (datetime.now(timezone.utc) + timedelta(days=14)).strftime("%Y-%m-%d"),
                "action_url": "fleet",
                "created_at": datetime.now(timezone.utc).isoformat(),
                "acknowledged": False,
                "dismissed": False
            })

        # 2. State registration tabs (WA / TN)
        reg = v.get("registration", {})
        tabs_exp = reg.get("tabs_expiration")
        st = reg.get("state", "WA")
        if tabs_exp:
            try:
                exp_dt = datetime.strptime(tabs_exp, "%Y-%m-%d").replace(tzinfo=timezone.utc)
                days_left = (exp_dt - datetime.now(timezone.utc)).days
                if days_left <= 45:
                    reg_org = "Tennessee County Clerk" if st == "TN" else "WA DOL"
                    reg_statute = "Tennessee Title 55 Registration" if st == "TN" else "WA State Vehicle Registration"
                    alerts.append({
                        "id": f"alert_{v_id}_tabs",
                        "domain": "fleet",
                        "severity": "WARNING",
                        "code": f"{v_id.upper()}_TABS_EXPIRING",
                        "title": f"{v_name} Registration Expires in {days_left} Days ({tabs_exp})",
                        "message": f"{reg_org} vehicle registration renewal due. Renew online or at county clerk to avoid penalty.",
                        "statute_or_category": reg_statute,
                        "due_date": tabs_exp,
                        "action_url": "fleet",
                        "created_at": datetime.now(timezone.utc).isoformat(),
                        "acknowledged": False,
                        "dismissed": False
                    })
            except Exception:
                pass
    return alerts


def evaluate_rental_alerts(rental_data: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Check rental maintenance escalations and warranty deadlines."""
    alerts = []
    tickets = rental_data.get("maintenance_tickets", [])
    for t in tickets:
        if t.get("severity") == "CRITICAL":
            alerts.append({
                "id": f"alert_rental_{t.get('id')}",
                "domain": "rental",
                "severity": "CRITICAL",
                "code": f"RENTAL_ESCALATION_{t.get('id')}",
                "title": f"Sierra Pines Maintenance Escalation: {t.get('title')}",
                "message": f"Statutory requirement: {t.get('statute')}. Target resolution by {t.get('deadline')}.",
                "statute_or_category": t.get("statute", "Property Maintenance"),
                "due_date": t.get("deadline"),
                "action_url": "rental",
                "created_at": datetime.now(timezone.utc).isoformat(),
                "acknowledged": False,
                "dismissed": False
            })
    return alerts


def run_pipeline() -> List[Dict[str, Any]]:
    """Executes full standardized evaluation across all domains and updates hub_state."""
    state = hub_state.load_json()
    all_generated: List[Dict[str, Any]] = []

    # 1. Health
    if "health" in state:
        all_generated.extend(evaluate_health_alerts(state["health"]))

    # 2. Academic
    if "academic" in state:
        all_generated.extend(evaluate_academic_alerts(state["academic"]))

    # 3. Fleet
    if "fleet" in state:
        all_generated.extend(evaluate_fleet_alerts(state["fleet"]))

    # 4. Rental
    if "rental" in state:
        all_generated.extend(evaluate_rental_alerts(state["rental"]))

    # Preserve dismissal status if alert was already dismissed by user
    existing_alerts = {a.get("code"): a for a in state.get("alerts", [])}
    for item in all_generated:
        code = item.get("code")
        if code in existing_alerts:
            item["acknowledged"] = existing_alerts[code].get("acknowledged", False)
            item["dismissed"] = existing_alerts[code].get("dismissed", False)
        hub_state.add_alert(item)

    return hub_state.get_active_alerts()


if __name__ == "__main__":
    active_alerts = run_pipeline()
    print(f"🚨 [AlertPipeline] Evaluated all domains. Active High-Priority Alerts: {len(active_alerts)}")
    for a in active_alerts:
        print(f"  • [{a['severity']}] {a['title']} -> Domain: {a['domain']}")
