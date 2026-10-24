"""
Domain Agent: fleet.py
Manages vehicle maintenance, oil life decay, service intervals, and state vehicle registrations (WA / TN).
Vehicles:
- 2021 Chevy Colorado ZR2 (Overland / Utility Truck)
- 2022 Nissan Murano Midnight Edition (Executive Family Crossover)
"""

import os
import sys
from datetime import datetime, timezone

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "core_state"))
from state_manager import hub_state


def run_fleet_workflow():
    fleet_data = hub_state.get_domain("fleet") or {}
    vehicles = fleet_data.get("vehicles", [])

    summary_cards = []
    alerts = []

    for v in vehicles:
        name = v.get("name")
        odo = v.get("odometer", 0)
        oil = v.get("oil_life_pct", 100)
        reg = v.get("registration", {})
        tabs_exp = reg.get("tabs_expiration", "Unknown")

        status_flag = "NOMINAL"
        if oil <= 20:
            status_flag = "SERVICE_SOON"
            alerts.append(f"{name}: Oil life at {oil}%.")
        
        summary_cards.append({
            "name": name,
            "odometer": f"{odo:,} mi",
            "oil_life": f"{oil}%",
            "tabs_expiration": tabs_exp,
            "status": status_flag
        })

    return {
        "domain": "fleet",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "vehicles": summary_cards,
        "action_required": len(alerts) > 0,
        "highlights": alerts if alerts else ["All fleet vehicles operating within safe service thresholds."]
    }


if __name__ == "__main__":
    report = run_fleet_workflow()
    print("🛞 [FleetAgent] Vehicle Telemetry & Maintenance Report:")
    for v in report["vehicles"]:
        print(f"  • {v['name']}: {v['odometer']} | Oil: {v['oil_life']} | Registration: {v['tabs_expiration']} [{v['status']}]")
