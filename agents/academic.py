"""
Domain Agent: academic.py
Monitors academic research drafts, thesis milestones, and journal deadlines.
Flags items entering the critical T-72h submission window.
"""

import os
import sys
from datetime import datetime, timezone
from typing import List, Dict, Any

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "core_state"))
from state_manager import hub_state


def run_academic_workflow():
    acad_data = hub_state.get_domain("academic") or {}
    deadlines = acad_data.get("deadlines", [])
    now = datetime.now(timezone.utc)

    processed_items = []
    t72h_alerts = []

    for d in deadlines:
        raw_dl = d.get("deadline")
        hours_rem = None
        urgency = d.get("urgency", "ON_TRACK")

        if raw_dl:
            try:
                target_dt = datetime.fromisoformat(raw_dl.replace('Z', '+00:00'))
                diff = target_dt - now
                hours_rem = round(diff.total_seconds() / 3600.0, 1)

                if 0 <= hours_rem <= 72:
                    urgency = "T_MINUS_72H"
                    t72h_alerts.append(f"🚨 T-{int(hours_rem)}h: '{d.get('title')}' is due on {target_dt.strftime('%b %d at %H:%M UTC')}")
                elif hours_rem < 0:
                    urgency = "OVERDUE"
            except Exception:
                pass

        processed_items.append({
            "id": d.get("id"),
            "title": d.get("title"),
            "deadline": raw_dl,
            "hours_remaining": hours_rem,
            "urgency": urgency,
            "target": d.get("target")
        })

    return {
        "domain": "academic",
        "timestamp": now.isoformat(),
        "deadlines": processed_items,
        "t72h_alerts": t72h_alerts,
        "has_urgent_drafts": len(t72h_alerts) > 0
    }


if __name__ == "__main__":
    rep = run_academic_workflow()
    print("📚 [AcademicAgent] Research & Draft Deadlines Status:")
    for d in rep["deadlines"]:
        print(f"  • {d['title']} | T-{d['hours_remaining']}h | Status: {d['urgency']}")
    if rep["t72h_alerts"]:
        print("\n⚠️ Critical T-72h Alerts:")
        for a in rep["t72h_alerts"]:
            print(f"  {a}")
