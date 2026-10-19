"""
Domain Agent: health.py
Monitors biometric recovery, HRV drops below target, and planned athletic training load.
"""

import os
import sys
from datetime import datetime, timezone
from typing import Dict, Any

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "core_state"))
from state_manager import hub_state


def run_health_workflow():
    health_data = hub_state.get_domain("health") or {}
    athlete = health_data.get("athlete_profile", {})
    hrv = athlete.get("hrv", {})
    load = health_data.get("planned_athletic_load", {})

    current_hrv = hrv.get("current", 0)
    target_hrv = hrv.get("target_baseline", 65)
    readiness = athlete.get("readiness_score", 70)

    # Recovery evaluation
    is_hrv_depressed = current_hrv < target_hrv
    recommendation = "Optimal recovery. Proceed with scheduled high-intensity sessions."
    if is_hrv_depressed:
        recommendation = f"⚠️ HRV at {current_hrv} ms (Target: {target_hrv} ms). Autonomic nervous system fatigued. Throttle training to Zone 2 Active Recovery."

    cardio_target = load.get("weekly_cardio_target_miles", 20)
    cardio_done = load.get("completed_cardio_miles", 0)
    strength_target = load.get("planned_strength_sessions", 4)
    strength_done = load.get("completed_strength_sessions", 0)

    return {
        "domain": "health",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "readiness_score": readiness,
        "hrv": {
            "current": current_hrv,
            "target": target_hrv,
            "status": "BELOW_TARGET" if is_hrv_depressed else "NOMINAL"
        },
        "recovery_recommendation": recommendation,
        "athletic_load": {
            "block": load.get("weekly_block", "Aerobic Base"),
            "cardio_progress": f"{cardio_done} / {cardio_target} miles",
            "strength_progress": f"{strength_done} / {strength_target} sessions",
            "next_session": load.get("next_session", {}).get("type", "Active Recovery")
        }
    }


if __name__ == "__main__":
    rep = run_health_workflow()
    print("🏃‍♂️ [HealthAgent] Athletic Readiness & Load Report:")
    print(f"  • Readiness Score: {rep['readiness_score']} / 100")
    print(f"  • HRV: {rep['hrv']['current']} ms (Baseline: {rep['hrv']['target']} ms) [{rep['hrv']['status']}]")
    print(f"  • Cardio Load: {rep['athletic_load']['cardio_progress']}")
    print(f"  • Strength Sessions: {rep['athletic_load']['strength_progress']}")
    print(f"  • Next Workout: {rep['athletic_load']['next_session']}")
    print(f"  • Directive: {rep['recovery_recommendation']}")
