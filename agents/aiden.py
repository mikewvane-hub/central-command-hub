"""
Domain Agent: aiden.py
Manages Newborn Readiness & Milestone Command (Baby Aiden // NRMC) telemetry,
pulls immediate sortie tasks, clinical milestones, vaccines, and command anchors
for upcoming 14-day (two-week) executive synthesis.
"""

import os
import sys
import json
from datetime import datetime, date, timezone, timedelta
from typing import Optional, List, Dict, Any

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
STATE_DIR = os.path.join(CURRENT_DIR, "..", "core_state")
sys.path.insert(0, STATE_DIR)
sys.path.insert(0, CURRENT_DIR)

from state_manager import hub_state

LOCAL_AIDEN_PATH = os.path.join(CURRENT_DIR, "..", "dashboards", "aiden", "data", "nrmc_state.json")
EXTERNAL_AIDEN_PATH = os.path.join(CURRENT_DIR, "..", "..", "Baby Aiden Tracker", "data", "nrmc_state.json")


def load_nrmc_state() -> Dict[str, Any]:
    """Load NRMC state from local dashboard data or fallback path."""
    for p in [LOCAL_AIDEN_PATH, EXTERNAL_AIDEN_PATH]:
        if os.path.exists(p):
            try:
                with open(p, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                print(f"⚠️ [AidenAgent] Warning loading {p}: {e}")
    return {}


def calculate_days_until(target_date_str: str, reference_date: Optional[date] = None) -> Optional[int]:
    """Calculate days from reference date until target date (YYYY-MM-DD or ISO)."""
    if not target_date_str:
        return None
    ref = reference_date or date.today()
    try:
        clean_date = target_date_str[:10]
        target_dt = datetime.strptime(clean_date, "%Y-%m-%d").date()
        return (target_dt - ref).days
    except Exception:
        return None


def run_aiden_workflow(reference_date: Optional[date] = None) -> Dict[str, Any]:
    """
    Executes the Baby Aiden NRMC workflow:
    1. Ingests profile, command anchors, modules, and financial telemetry.
    2. Identifies all tasks & clinical milestones for the upcoming 14-day (2-week) window.
    3. Formats executive briefing highlights and updates hub_state domain 'aiden'.
    """
    ref = reference_date or date.today()
    raw_state = load_nrmc_state()

    profile = raw_state.get("profile", {
        "baby_name": "Aiden James Vane",
        "dob": "2026-11-15",
        "hospital": "Naval Hospital / Regional Military Medical Center",
        "pediatrician": "Dr. Sarah Vance, MD, FAAP",
        "pcm_clinic": "Madigan AMC Pediatric Clinic"
    })

    dob_str = profile.get("dob", "2026-11-15")
    days_until_dob = calculate_days_until(dob_str, ref)
    dob_date = datetime.strptime(dob_str, "%Y-%m-%d").date()

    def parse_timeframe_offset(tf_str: str) -> Optional[int]:
        """Convert NRMC timeframe strings (e.g. 'T-0 to T+12h', 'T+3 to T+30d', 'T+14 to T+60d') to offset days."""
        if not tf_str:
            return 0
        tf = tf_str.strip()
        if "Age" in tf or "Future" in tf:
            return 365 * 13 # Future adolescent milestone
        if "T-0" in tf:
            return 0
        if "T+12h" in tf or "T+24h" in tf:
            return 1
        if "T+48h" in tf:
            return 2
        if "T+72h" in tf:
            return 3
        # Regex / string match for T+<number>
        import re
        match = re.search(r'T\+(\d+)', tf)
        if match:
            num = int(match.group(1))
            return num
        return 0

    upcoming_14d_tasks: List[Dict[str, Any]] = []
    upcoming_7d_tasks: List[Dict[str, Any]] = []

    # 1. Parse Module Tasks
    modules = raw_state.get("modules", {})
    for mod_key, mod_val in modules.items():
        tasks = mod_val.get("tasks", [])
        if not isinstance(tasks, list):
            continue

        for task in tasks:
            task_id = task.get("id")
            title = task.get("title")
            priority = task.get("priority", "HIGH")
            status = task.get("status", "PENDING")
            timeframe = task.get("timeframe", "")

            # Calculate target date based on offset from DOB
            target_date_str = task.get("target_date") or task.get("due_date")
            if not target_date_str:
                offset_days = parse_timeframe_offset(timeframe)
                calc_target = dob_date + timedelta(days=offset_days)
                target_date_str = calc_target.strftime("%Y-%m-%d")

            days_left = calculate_days_until(target_date_str, ref)
            if days_left is not None and 0 <= days_left <= 14:
                item = {
                    "id": task_id,
                    "title": title,
                    "category": task.get("category", mod_val.get("title", "Baby Aiden NRMC")),
                    "module": mod_val.get("title", mod_key),
                    "priority": priority,
                    "status": status,
                    "timeframe": timeframe,
                    "due_date": target_date_str,
                    "days_remaining": days_left,
                    "sla": task.get("sla", ""),
                    "detail": f"{title} (Target: {target_date_str} • T-{days_left}d)"
                }
                upcoming_14d_tasks.append(item)
                if days_left <= 7:
                    upcoming_7d_tasks.append(item)

    # 2. Parse Vaccine Glidepath (Module E)
    mod_e = modules.get("module_e", {})
    vaccines = mod_e.get("vaccine_glidepath", [])
    for vac in vaccines:
        vac_id = vac.get("id")
        vac_name = vac.get("vaccine")
        vac_date = vac.get("target_date")
        if vac_date:
            days_left = calculate_days_until(vac_date, ref)
            if days_left is not None and 0 <= days_left <= 14:
                item = {
                    "id": vac_id,
                    "title": vac_name,
                    "category": "Pediatric Immunization",
                    "module": "Pediatric Clinical Schedule",
                    "priority": "HIGH",
                    "status": vac.get("status", "SCHEDULED"),
                    "timeframe": "At Birth",
                    "due_date": vac_date,
                    "days_remaining": days_left,
                    "sla": "Administered prior to hospital discharge",
                    "detail": f"{vac_name} (Target: {vac_date} • T-{days_left}d)"
                }
                upcoming_14d_tasks.append(item)
                if days_left <= 7:
                    upcoming_7d_tasks.append(item)

    # Sort upcoming tasks by due date / days remaining
    upcoming_14d_tasks.sort(key=lambda x: x["days_remaining"])
    upcoming_7d_tasks.sort(key=lambda x: x["days_remaining"])

    # 3. Command Anchors
    anchors = raw_state.get("command_anchors", {})
    tricare_grace = anchors.get("tricare_grace", {})
    rapids_apt = anchors.get("rapids_appointment", {})

    tricare_deadline = tricare_grace.get("deadline", "2027-02-13")
    days_to_tricare_deadline = calculate_days_until(tricare_deadline, ref)

    rapids_date = rapids_apt.get("scheduled_date", "2026-12-05")
    days_to_rapids = calculate_days_until(rapids_date, ref)

    # 4. Generate Operational Highlights
    highlights = [
        f"BABY AIDEN // NRMC: DOB in {days_until_dob} days ({dob_str}). Immediate Sortie armed ({len(upcoming_14d_tasks)} tasks & vaccines queued for upcoming 14 days).",
        f"TRICARE GRACE: 90-day newborn coverage window begins on delivery ({dob_str}) with hard DEERS cutoff on {tricare_deadline} (T-{days_to_tricare_deadline}d).",
        f"RAPIDS DEERS C2: Appointment confirmed at {rapids_apt.get('location', 'JBLM Waller Hall')} on {rapids_date[:10]} (T-{days_to_rapids}d, Code: {rapids_apt.get('confirmation_code', 'DMDC-AIDEN-7749')}).",
        f"PEDIATRIC CLINICAL: Primary Care aligned at {profile.get('pcm_clinic', 'Madigan AMC Pediatric Clinic')} under {profile.get('pediatrician', 'Dr. Sarah Vance, MD')}."
    ]

    payload = {
        "domain": "aiden",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "profile": {
            **profile,
            "days_until_dob": days_until_dob
        },
        "days_until_dob": days_until_dob,
        "upcoming_14d_tasks": upcoming_14d_tasks,
        "upcoming_7d_tasks": upcoming_7d_tasks,
        "command_anchors": {
            "tricare_grace": {
                **tricare_grace,
                "days_until_deadline": days_to_tricare_deadline
            },
            "rapids_appointment": {
                **rapids_apt,
                "days_until_appointment": days_to_rapids
            }
        },
        "financial_telemetry": raw_state.get("financial_telemetry", {}),
        "action_required": len(upcoming_14d_tasks) > 0,
        "highlights": highlights
    }

    # Persist domain state into hub_state
    hub_state.update_domain("aiden", payload)

    return payload


if __name__ == "__main__":
    rep = run_aiden_workflow()
    print("👶 [AidenAgent] Newborn Readiness & Milestone Command (NRMC) Report:")
    print(f"  • Profile: {rep['profile']['baby_name']} | DOB: {rep['profile']['dob']} (T-{rep['days_until_dob']}d)")
    print(f"  • Upcoming 14-Day Tasks Queue ({len(rep['upcoming_14d_tasks'])} items):")
    for t in rep["upcoming_14d_tasks"]:
        print(f"    - [{t['priority']}] {t['id']}: {t['title']} (Due {t['due_date']} • T-{t['days_remaining']}d)")
    print("\n🌟 Domain Highlights:")
    for h in rep["highlights"]:
        print(f"  • {h}")
