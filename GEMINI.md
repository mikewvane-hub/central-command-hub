# 🤖 GEMINI ORCHESTRATION & AGENT DIRECTIVES

> **Workspace:** Central Command Hub (`Futuristic Voice-Controlled Command Hub`)  
> **Rule Scope:** Repository-wide / All Agentic Operations

## Mandatory Model & Compute Tiering Guidelines

1. **Orchestrating Unit (Parent Agent):**
   - Must ALWAYS operate using the **highest tier Gemini model** (`Gemini 2.5 Pro` / `pro`).
   - Acts as Chief Architect, responsible for high-level reasoning, system integrity, task planning, subagent supervision, and final quality assurance.

2. **Subagents (`invoke_subagent`):**
   - Must prioritize **compute and token efficiency**.
   - Do NOT use `Model: "inherit"`. Over-provisioning subagents consumes unnecessary compute.
   - Assign appropriate lower-tier models based on assignment scope:
     - **`flash_lite`**: Fast searches, log audits, regex extraction, format normalization, and lightweight checks.
     - **`flash`**: Standard coding, unit tests, component refactors, and diagnostic investigations.
     - **`pro`**: Only for rare, deeply complex algorithmic synthesis that exceeds Flash capabilities.

See `AGENTS.md` for full fleet architecture, security invariants, and domain routing.
