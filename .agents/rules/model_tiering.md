# Rule: Subagent Model Tiering & Compute Efficiency

**Scope:** All subagents spawned in this project (`invoke_subagent`).

1. **Lead Orchestrator:**
   The parent orchestrating unit must always be running on the highest level/model of Gemini (`Gemini 2.5 Pro` / `pro`) to ensure superior executive oversight, multi-file synthesis, and architectural decisions.

2. **Subagents:**
   To preserve tokens and optimize compute:
   - Default all routine, analytical, search, or repetitive tasks to `flash_lite`.
   - Default standard code implementation, testing, and debugging tasks to `flash`.
   - Reserve `pro` solely for high-complexity, multi-system architectural problems where lower models cannot produce accurate results.
   - Avoid `inherit` when invoking subagents to prevent unintentional over-consumption of top-tier model quota.
