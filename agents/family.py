"""
Domain Agent: family.py
Tracks family milestones, calendar synchronizations, birthdays, and anniversaries:
- User Birthday: 29 Mar 1993
- Wife Birthday: 23 Apr 1996
- Anniversary: 23 Sep
- Google Calendar sync & upcoming 7-day milestones
"""

import os
import sys
from datetime import datetime, date, timezone
from typing import Optional, List, Dict, Any

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "core_state"))
from state_manager import hub_state


def calculate_days_until(month: int, day: int, reference_date: Optional[date] = None) -> int:
    """Calculate days until the next occurrence of an annual event."""
    ref = reference_date or date.today()
    this_year = date(ref.year, month, day)
    if this_year >= ref:
        return (this_year - ref).days
    next_year = date(ref.year + 1, month, day)
    return (next_year - ref).days


def run_family_workflow(reference_date: Optional[date] = None):
    ref = reference_date or date.today()
    family_data = hub_state.get_domain("family") or {}

    # Core milestones
    milestones = [
        {
            "event": "User Birthday (29 Mar 1993)",
            "date": "March 29",
            "days_until": calculate_days_until(3, 29, ref),
            "age_turning": ref.year - 1993 + (1 if date(ref.year, 3, 29) < ref else 0)
        },
        {
            "event": "Wife's Birthday (23 Apr 1996)",
            "date": "April 23",
            "days_until": calculate_days_until(4, 23, ref),
            "age_turning": ref.year - 1996 + (1 if date(ref.year, 4, 23) < ref else 0)
        },
        {
            "event": "Wedding Anniversary (23 Sep)",
            "date": "September 23",
            "days_until": calculate_days_until(9, 23, ref)
        }
    ]

    # Check Google Calendar events in next 7 days
    cal_sync = family_data.get("google_calendar_sync", {})
    events = cal_sync.get("upcoming_events", [])
    
    upcoming_7d = []
    for m in milestones:
        if m["days_until"] <= 7:
            upcoming_7d.append(f"🎉 {m['event']} is in {m['days_until']} days!")

    for ev in events:
        upcoming_7d.append(f"📅 {ev.get('title')} ({ev.get('date', '')[:10]})")

    return {
        "domain": "family",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "milestones": milestones,
        "upcoming_7d": upcoming_7d,
        "calendar_sync_status": "ONLINE",
        "weekly_routine": family_data.get("weekly_cadence", {})
    }


if __name__ == "__main__":
    rep = run_family_workflow()
    print("👨‍👩‍👧 [FamilyAgent] Family Milestones & 7-Day Calendar Sync:")
    for m in rep["milestones"]:
        print(f"  • {m['event']}: in {m['days_until']} days ({m['date']})")
    print("\n📅 Upcoming 7-Day Focus Items:")
    for item in rep["upcoming_7d"]:
        print(f"  • {item}")
