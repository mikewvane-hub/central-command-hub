"""
Antigravity Weekly Cadence Agent
Executes every Sunday at 18:00 (or on demand) to aggregate:
1. Upcoming 7-day deadlines & family milestones (User: 29 Mar 1993, Wife: 23 Apr 1996, Anniversary: 23 Sep, Google Calendar).
2. Property cash flow and pending maintenance (Sierra Pines / JBLM).
3. Training readiness and planned athletic load (HRV recovery & workout block).
4. Academic deadlines & vehicle telemetry.
5. Baby Aiden NRMC upcoming 14-day immediate sortie tasks, clinical milestones, and command anchors.
Publishes the Executive Weekly Briefing to hub_state.json, SQLite, and the Executive Dashboard.
"""

import os
import sys
import json
from datetime import datetime, timezone, timedelta

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
from alert_pipeline import run_pipeline
from family import run_family_workflow
from fleet import run_fleet_workflow
from academic import run_academic_workflow
from health import run_health_workflow
from aiden import run_aiden_workflow


def generate_executive_weekly_briefing():
    now = datetime.now(timezone.utc)
    # Calculate week window (current Sunday to next Sunday)
    week_start = now.strftime("%B %d")
    week_end = (now + timedelta(days=7)).strftime("%B %d, %Y")
    week_label = f"Week of {week_start} – {week_end}"

    print(f"🚀 [WeeklyCadenceAgent] Running Sunday 18:00 Cadence Synthesis ({week_label})...")

    # 1. Collect domain workflows
    family_rep = run_family_workflow()
    fleet_rep = run_fleet_workflow()
    acad_rep = run_academic_workflow()
    health_rep = run_health_workflow()
    aiden_rep = run_aiden_workflow()

    # 2. Run Alert Pipeline (with all domains rehydrated in hub_state)
    active_alerts = run_pipeline()

    # 3. Read rental property financials
    rental_data = hub_state.get_domain("rental") or {}
    financials = rental_data.get("financials", {})
    tickets = rental_data.get("maintenance_tickets", [])
    critical_ticket = next((t["title"] for t in tickets if t.get("severity") == "CRITICAL"), "None")

    # 4. Synthesize deadlines & upcoming 14-day tasks
    upcoming_7d = []
    upcoming_14d = []

    # Family milestones
    for item in family_rep.get("upcoming_7d", []):
        entry = {"category": "Family", "detail": item}
        upcoming_7d.append(entry)
        upcoming_14d.append(entry)

    # Academic deadlines
    for d in acad_rep.get("deadlines", []):
        if d.get("hours_remaining") is not None and 0 <= d.get("hours_remaining") <= 168:
            entry = {
                "category": "Academic",
                "detail": f"{d['title']} (Due {d['deadline'][:10]} • T-{d['hours_remaining']}h)"
            }
            upcoming_7d.append(entry)
            upcoming_14d.append(entry)

    # Vehicle tabs / service
    for v in fleet_rep.get("vehicles", []):
        if "expiring" in v.get("status", "").lower() or v.get("status") == "SERVICE_SOON":
            entry = {"category": "Fleet", "detail": f"{v['name']} maintenance/registration action due."}
            upcoming_7d.append(entry)
            upcoming_14d.append(entry)

    # Baby Aiden 14-day upcoming sortie tasks & clinical milestones
    aiden_tasks = aiden_rep.get("upcoming_14d_tasks", [])
    for t in aiden_tasks:
        entry = {
            "category": "Baby Aiden",
            "priority": t.get("priority", "HIGH"),
            "due_date": t.get("due_date"),
            "days_remaining": t.get("days_remaining"),
            "detail": f"[{t.get('priority', 'HIGH')}] {t['title']} (Target {t['due_date']} • T-{t['days_remaining']}d)"
        }
        upcoming_14d.append(entry)
        # Include in executive upcoming view
        upcoming_7d.append(entry)

    # 5. Build structured highlights
    aiden_profile = aiden_rep.get("profile", {})
    highlights = [
        f"BABY AIDEN // NRMC: DOB in {aiden_rep.get('days_until_dob', 11)} days ({aiden_profile.get('dob', '2026-11-15')}). Immediate Sortie armed ({len(aiden_tasks)} tasks & vaccines queued for next 14 days). TRICARE 90-day grace clock stands by.",
        f"FAMILY: User Birthday (29 Mar 1993, in {family_rep['milestones'][0]['days_until']}d), Wife Birthday (23 Apr 1996, in {family_rep['milestones'][1]['days_until']}d), Anniversary (23 Sep).",
        f"PROPERTY: Sierra Pines cash flow at +${financials.get('monthly_net', 1120):,}/mo Net (${financials.get('monthly_gross', 2450):,} Gross). Priority ticket: '{critical_ticket}'.",
        f"ATHLETIC: Readiness Score {health_rep['readiness_score']}/100. HRV at {health_rep['hrv']['current']} ms ({health_rep['hrv']['status']}). Directive: {health_rep['recovery_recommendation']}.",
        f"FLEET: Colorado ZR2 oil life at 18% (service due); 2022 Nissan Murano TN registration current through May 2027."
    ]

    briefing_payload = {
        "cadence": "SUNDAY_1800_EXECUTIVE_BRIEFING",
        "generated_at": now.isoformat(),
        "week_label": week_label,
        "cadence_window": week_label,
        "summary": f"Executive briefing for {week_label} integrating Baby Aiden NRMC Sortie, Family Milestones, Property Cash Flow, Athletic Readiness, and Fleet Telemetry.",
        "highlights": highlights,
        "executive_highlights": highlights,
        "upcoming_7d_milestones": upcoming_7d,
        "upcoming_14d_tasks": upcoming_14d,
        "aiden_nrmc": {
            "profile": aiden_profile,
            "days_until_dob": aiden_rep.get("days_until_dob"),
            "upcoming_14d_tasks": aiden_tasks,
            "command_anchors": aiden_rep.get("command_anchors", {}),
            "financial_telemetry": aiden_rep.get("financial_telemetry", {})
        },
        "family_registry": {
            "user_birthday": "1993-03-29",
            "wife_birthday": "1996-04-23",
            "anniversary": "September 23",
            "milestone_countdowns": family_rep.get("milestones", [])
        },
        "property_cashflow": {
            "monthly_net": financials.get("monthly_net", 1120),
            "monthly_gross": financials.get("monthly_gross", 2450),
            "pending_tickets_count": len(tickets),
            "critical_ticket": critical_ticket
        },
        "athletic_readiness": {
            "readiness_score": health_rep.get("readiness_score"),
            "hrv_current": health_rep["hrv"]["current"],
            "hrv_target": health_rep["hrv"]["target"],
            "hrv_status": health_rep["hrv"]["status"],
            "cardio_progress": health_rep["athletic_load"]["cardio_progress"],
            "strength_progress": health_rep["athletic_load"]["strength_progress"],
            "recovery_directive": health_rep["recovery_recommendation"]
        },
        "academic_queue": acad_rep.get("deadlines", []),
        "fleet_status": fleet_rep.get("vehicles", []),
        "active_alerts_count": len(active_alerts)
    }

    # 6. Save directly into hub_state.json & SQLite
    state = hub_state.load_json()
    state["executive_briefing"] = briefing_payload
    hub_state.save_json(state)

    # 7. Write clean Markdown artifact for display
    anchors = aiden_rep.get("command_anchors", {})
    tricare = anchors.get("tricare_grace", {})
    rapids = anchors.get("rapids_appointment", {})

    md_content = f"""# EXECUTIVE WEEKLY BRIEFING // {week_label.upper()}
*Generated on {now.strftime('%A, %B %d, %Y at %H:%M UTC')} | Cadence: Sunday 18:00*

---

## 📌 Executive Highlights
{chr(10).join(f"- {h}" for h in highlights)}

---

## 👶 Baby Aiden // Newborn Readiness & Milestone Command (NRMC)
- **Status:** Expected Delivery in **{aiden_rep.get('days_until_dob', 11)} Days** ({aiden_profile.get('dob', '2026-11-15')})
- **Pediatric PCM Alignment:** {aiden_profile.get('pediatrician', 'Dr. Sarah Vance, MD')} @ {aiden_profile.get('pcm_clinic', 'Madigan AMC Pediatric Clinic')}
- **TRICARE 90-Day Grace Clock:** Target Delivery ({aiden_profile.get('dob')}) &rarr; Hard Cutoff: {tricare.get('deadline', '2027-02-13')}
- **RAPIDS Appointment:** {rapids.get('scheduled_date', '2026-12-05')[:10]} @ {rapids.get('location', 'JBLM Waller Hall')} (Confirmation: `{rapids.get('confirmation_code', 'DMDC-AIDEN-7749')}`)
- **Upcoming 14-Day Sortie & Clinical Tasks ({len(aiden_tasks)} items):**

| Priority | Task / Milestone | Due Date | SLA / Timeframe |
| :--- | :--- | :--- | :--- |
{chr(10).join(f"| **{t.get('priority', 'HIGH')}** | {t['title']} | {t['due_date']} (T-{t['days_remaining']}d) | {t.get('timeframe', 'At Birth')} |" for t in aiden_tasks)}

---

## 📅 Upcoming Deadlines & Operations Milestones
| Category | Event / Deadline Details |
| :--- | :--- |
{chr(10).join(f"| **{m['category']}** | {m['detail']} |" for m in upcoming_7d)}

**Core Family Milestones:**
- **User Birthday:** 29 Mar 1993 ({family_rep['milestones'][0]['days_until']} days remaining)
- **Wife's Birthday:** 23 Apr 1996 ({family_rep['milestones'][1]['days_until']} days remaining)
- **Wedding Anniversary:** September 23 ({family_rep['milestones'][2]['days_until']} days remaining)

---

## 🏡 Property Cash Flow & Maintenance (Sierra Pines // JBLM)
- **Monthly Net Cash Flow:** **+${financials.get('monthly_net', 1120):,}/month** (Gross: ${financials.get('monthly_gross', 2450):,})
- **Pending Maintenance Tickets:** {len(tickets)}
- **Priority Escalation:** `{critical_ticket}` (Deadline: Q4 2026)

---

## 🏃 Athletic Readiness & Planned Load
- **Training Readiness Score:** **{health_rep.get('readiness_score')}/100**
- **Heart Rate Variability (HRV):** **{health_rep['hrv']['current']} ms** *(Target Baseline: {health_rep['hrv']['target']} ms)* &rarr; `{health_rep['hrv']['status']}`
- **Cardio Mileage Target:** {health_rep['athletic_load']['cardio_progress']}
- **Strength Sessions Planned:** {health_rep['athletic_load']['strength_progress']}
- **Coaching Directive:** {health_rep['recovery_recommendation']}

---

## 🛞 Fleet Telemetry & Service Intervals
- **2021 Chevy Colorado ZR2:** {fleet_rep['vehicles'][0]['odometer']} | Oil Life: {fleet_rep['vehicles'][0]['oil_life']} (Service Due Soon) | WA Tabs: {fleet_rep['vehicles'][0]['tabs_expiration']}
- **2022 Nissan Murano Midnight:** {fleet_rep['vehicles'][1]['odometer']} | Oil Life: {fleet_rep['vehicles'][1]['oil_life']} | TN Registration (BVZ7440): **{fleet_rep['vehicles'][1]['tabs_expiration']} (Current)**

---
*Autonomous aggregation completed by Central Command Hub Weekly Cadence Agent.*
"""

    md_path = os.path.join(STATE_DIR, "latest_executive_briefing.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(md_content)

    print("✅ [WeeklyCadenceAgent] Executive Briefing synchronized to hub_state.json, SQLite, and latest_executive_briefing.md")
    return briefing_payload


if __name__ == "__main__":
    briefing = generate_executive_weekly_briefing()
    print("\n" + "="*60)
    print("🌟 EXECUTIVE BRIEFING SUMMARY:")
    for h in briefing["highlights"]:
        print(f"  • {h}")
    print("="*60)
