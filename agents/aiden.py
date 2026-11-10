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
        "dob": "2026-11-06",
        "hospital": "A.T. Augusta Military Medical Center (ATAMMC) / Fort Belvoir Community Hospital",
        "pediatrician": "Dr. Saro Verghese, MD (Team Pink PCM) / NP Meagan Leigh Van Assche (Team Blue)",
        "pcm_clinic": "FBCH Pediatric Medicine Team Pink / Team Blue"
    })

    dob_str = profile.get("dob", "2026-11-06")
    days_until_dob = calculate_days_until(dob_str, ref)
    dob_date = datetime.strptime(dob_str, "%Y-%m-%d").date()

    def format_delta(days_left: int) -> str:
        if days_left > 0:
            return f"T-{days_left}d"
        if days_left == 0:
            return "TODAY"
        return f"DUE NOW (+{abs(days_left)}d)"

    # Explicit target offsets (days from DOB) calibrated to ATAMMC paperwork & Veterans Day (Nov 11)
    TASK_TARGET_OFFSETS = {
        "A1": 0,   # Signed 11/09, COMPLETE
        "A2": 31,  # SSN EAB 4-8 wks (Dec 7 - Jan 4)
        "A3": 6,   # Thu Nov 12 DMV opening after Veterans Day (Nov 11)
        "A4": 6,   # 72h Newborn Screen + Bilirubin future order check (Nov 12)
        "A5": 14,  # Verify Hearing clearance at Nov 10 / Nov 20 FBCH visits
        "A6": 14,  # ATAMMC Rx (Vit D3, Vaseline) & FBCH Visits Nov 10 / Nov 20
        "A7": 90,  # Hard TRICARE 90d cutoff Feb 4, 2027
        "B1": 31,  # Book RAPIDS/DEERS after BC + SSN (~Dec 7)
        "B2": 32,  # TRICARE Prime selection post-DEERS
        "B3": 7,   # SGLI/FSGLI verification (Nov 13)
        "B4": 35,  # DD Form 93 update post-DEERS
        "B5": 40,  # IPPS-A / BAH check
        "C1": 42,  # Passport DS-11 after BC + SSN
        "C2": 40,  # Infant passport photo before DS-11 appointment
        "C3": 42,  # Notarized DS-3053 (only if one parent cannot attend DS-11)
        "C4": 35,  # Equifax minor credit freeze (requires SSN)
        "C5": 35,  # Experian minor credit freeze (requires SSN)
        "C6": 35,  # TransUnion minor credit freeze (requires SSN)
        "C7": 35,  # ChexSystems minor freeze (requires SSN)
        "D1": 35,  # W-4 CTC post-SSN
        "D2": 60,  # DCFSA QLE hard cutoff Jan 5, 2027
        "D3": 35,  # 529 plan post-SSN
        "D4": 45,  # UTMA custodial brokerage post-SSN
        "D5": 365 * 13,  # Authorized User Age 13 milestone
        "D6": 35,  # Trump Account Form 4547 ($1k pilot) post-SSN
    }

    def parse_timeframe_offset(tf_str: str, task_id: str = "") -> int:
        """Convert NRMC timeframe strings to offset days from DOB."""
        if task_id in TASK_TARGET_OFFSETS:
            return TASK_TARGET_OFFSETS[task_id]
        if not tf_str:
            return 0
        tf = tf_str.strip()
        if "Age" in tf or "Future" in tf:
            return 365 * 13
        if "T-0" in tf:
            return 0
        if "T+12h" in tf or "T+24h" in tf:
            return 1
        if "T+48h" in tf:
            return 2
        if "T+72h" in tf:
            return 3
        import re
        match = re.search(r'T\+(\d+)', tf)
        if match:
            return int(match.group(1))
        return 0

    upcoming_14d_tasks: List[Dict[str, Any]] = []
    upcoming_7d_tasks: List[Dict[str, Any]] = []

    # 1. Parse Module Tasks (only incomplete/pending/in-flight tasks)
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
            if status in ("COMPLETE", "ADMINISTERED"):
                continue
            timeframe = task.get("timeframe", "")

            target_date_str = task.get("target_date") or task.get("due_date")
            if not target_date_str:
                offset_days = parse_timeframe_offset(timeframe, task_id or "")
                calc_target = dob_date + timedelta(days=offset_days)
                target_date_str = calc_target.strftime("%Y-%m-%d")

            days_left = calculate_days_until(target_date_str, ref)
            if days_left is not None and -7 <= days_left <= 14:
                delta_lbl = format_delta(days_left)
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
                    "detail": f"{title} (Target: {target_date_str} • {delta_lbl})"
                }
                upcoming_14d_tasks.append(item)
                if days_left <= 7:
                    upcoming_7d_tasks.append(item)

    # 2. Parse Vaccine Glidepath (Module E) - only non-completed doses in active window
    mod_e = modules.get("module_e", {})
    vaccines = mod_e.get("vaccine_glidepath", [])
    for vac in vaccines:
        vac_id = vac.get("id")
        vac_name = vac.get("vaccine")
        vac_date = vac.get("target_date")
        vac_status = vac.get("status", "SCHEDULED")
        if vac_status in ("COMPLETE", "ADMINISTERED"):
            continue
        if vac_date:
            days_left = calculate_days_until(vac_date, ref)
            if days_left is not None and -7 <= days_left <= 14:
                delta_lbl = format_delta(days_left)
                item = {
                    "id": vac_id,
                    "title": vac_name,
                    "category": "Pediatric Immunization",
                    "module": "Pediatric Clinical Schedule",
                    "priority": "HIGH",
                    "status": vac_status,
                    "timeframe": vac.get("stage", "Birth / Follow-Up"),
                    "due_date": vac_date,
                    "days_remaining": days_left,
                    "sla": vac.get("mandate_label", "Discuss plan w/ FBCH Pediatrics"),
                    "detail": f"{vac_name} (Target: {vac_date} • {delta_lbl})"
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

    tricare_deadline = tricare_grace.get("deadline", "2027-02-04")
    days_to_tricare_deadline = calculate_days_until(tricare_deadline, ref)

    rapids_date = rapids_apt.get("scheduled_date")
    days_to_rapids = calculate_days_until(rapids_date, ref) if rapids_date else None

    if days_until_dob is not None and days_until_dob <= 0:
        age_days = abs(days_until_dob)
        dob_summary = f"Born {dob_str} 12:38 EST @ ATAMMC (T+{age_days}d Post-Birth, 7.10 lbs). {len(upcoming_14d_tasks)} active sortie/clinical items queued in 14d window."
    else:
        dob_summary = f"DOB in {days_until_dob} days ({dob_str}). Immediate Sortie armed ({len(upcoming_14d_tasks)} tasks & vaccines queued for upcoming 14 days)."

    if rapids_date:
        rapids_summary = (
            f"RAPIDS DEERS C2: Appointment at {rapids_apt.get('location', 'Fort Belvoir DEERS/RAPIDS')} "
            f"on {rapids_date[:10]} ({format_delta(days_to_rapids)}, Code: {rapids_apt.get('confirmation_code', 'CONFIRMED')})."
        )
    else:
        rapids_summary = (
            f"RAPIDS DEERS C2: NEEDS BOOKING at {rapids_apt.get('location', 'Fort Belvoir Bldg 1189 / NCR DEERS')} "
            f"once VA Certified Birth Cert (A3) & SSN Card (A2) arrive (hard TRICARE cutoff {tricare_deadline})."
        )

    # 4. Generate Operational Highlights
    highlights = [
        f"BABY AIDEN // NRMC: {dob_summary}",
        f"TRICARE GRACE: 90-day newborn coverage window active from birth ({dob_str}) with hard DEERS & TRICARE East cutoff on {tricare_deadline} (T-{days_to_tricare_deadline}d).",
        rapids_summary,
        f"PEDIATRIC CLINICAL: {profile.get('pcm_clinic', 'FBCH Pediatric Medicine Team Pink / Team Blue')} — {profile.get('pediatrician', 'Dr. Saro Verghese, MD (Team Pink) & NP Meagan Van Assche (Team Blue)')}."
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
    days_dob = rep.get("days_until_dob")
    dob_tag = f"T+{abs(days_dob)}d Post-Birth" if (days_dob is not None and days_dob <= 0) else f"T-{days_dob}d"
    print("👶 [AidenAgent] Newborn Readiness & Milestone Command (NRMC) Report:")
    print(f"  • Profile: {rep['profile']['baby_name']} | DOB: {rep['profile']['dob']} ({dob_tag})")
    print(f"  • Upcoming 14-Day Tasks Queue ({len(rep['upcoming_14d_tasks'])} items):")
    for t in rep["upcoming_14d_tasks"]:
        d_left = t['days_remaining']
        d_lbl = f"T-{d_left}d" if d_left > 0 else ("TODAY" if d_left == 0 else f"DUE +{abs(d_left)}d")
        print(f"    - [{t['priority']}] {t['id']}: {t['title']} (Due {t['due_date']} • {d_lbl})")
    print("\n🌟 Domain Highlights:")
    for h in rep["highlights"]:
        print(f"  • {h}")
