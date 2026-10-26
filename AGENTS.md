# 🌌 ANTIGRAVITY CENTRAL COMMAND HUB // AGENT & SUBAGENT BLUEPRINT

## 1. Model Tiering & Token/Compute Efficiency Policy

To maximize reasoning quality while strictly preventing token exhaustion and compute waste across the fleet, all agentic workflows in the **Central Command Hub** must enforce the following model hierarchy:

### A. Lead Orchestrating Unit (Parent Agent / Central Commander)
* **Designation:** Central Orchestrator & Systems Architect
* **Model Level:** **Highest Gemini Model Available** (`Gemini 2.5 Pro` / `pro`)
* **Role & Scope:**
  - Executive command, cross-domain synthesis, and strategic planning.
  - Architectural oversight, security audits, and risk assessment.
  - Task decomposition, subagent delegation, quality verification, and user communication.
  - Maintains global project context, single source of truth, and atomic consistency.

### B. Subagent Token & Compute Optimization (`invoke_subagent`)
Subagents must **never** default to `Model: "inherit"`, as inheriting the parent model unnecessarily consumes maximum-tier compute. Every subagent must be explicitly assigned an efficient, task-appropriate model tier:

| Model Tier | Model Identifier | Scope & Workload Matching |
| :--- | :--- | :--- |
| **Tier 1: Ultra-Lightweight** | `'flash_lite'` | **Fastest & most token-efficient.** Ideal for log analysis, file/grep lookups, regex parsing, telemetry heartbeat pings, syntax checks, formatting, and straightforward data transformations. |
| **Tier 2: Balanced Standard** | `'flash'` | **High-efficiency general purpose.** Ideal for writing unit tests, drafting component refactors, DOM/CSS surface audits, bug reproduction, and localized code modifications. |
| **Tier 3: Complex Synthesis** | `'pro'` | **Strictly gated / Exception only.** Reserved exclusively for deep mathematical modeling, novel algorithmic design, or multi-domain conflict resolution that cannot be solved by Flash. |

### C. Subagent Execution Invariants
1. **Explicit Model Selection:** Every invocation of `invoke_subagent` must explicitly specify `Model: 'flash_lite'` or `Model: 'flash'`. Do not leave as `'inherit'`.
2. **Dense, Scoped Prompts:** Provide precise, bounded instructions with strict output formats to avoid runaway token generation and multi-turn loops.
3. **Clean Lifecycle & Resource Cleanup:** Subagents must complete their targeted assignment, report back to the orchestrator, and terminate promptly.

---

## 2. Satellite Fleet Topology & Port Bindings

The Central Command Hub coordinates 6 satellite subsystems across local and cloud environments:

1. **Garage & Fleet Asset Manager (`fleet-asset-manager`):**
   - Local Dev Port: `:3009` | Route: `./dashboards/garage/index.html?v=40.0`
   - Scope: OBD-II vehicle telemetry, maintenance schedules, 3D model visualizer.
2. **Dual-Engine Real Estate Explorer (`rental-asset-explorer`):**
   - Local Hub Port: `:4000` | Route: `./dashboards/rental/index.html`
   - Scope: WA RCW 59.18 compliance, lease accounting, asset preservation lifecycles.
3. **Financial Command Center (`financial-command-center`):**
   - Local Service Port: `:3008` | Route: `http://localhost:3008/`
   - Scope: Net worth tracker, liquidity buffers, high-yield asset allocation.
4. **Mackie's Daily Board (`mackie-mom-board`):**
   - Cloud Satellite Port: `:443` | Route: `https://daily-executive-dashboard.onrender.com/mackie/`
   - Scope: Family calendar, kids meal planner, routine tracking.
5. **Executive Daily Briefing (`daily-executive-briefing`):**
   - Cloud Satellite Port: `:443` | Route: `https://daily-executive-dashboard.onrender.com/`
   - Scope: Sunday 18:00 executive cadence, priority directives, operational alerts.
6. **Rainier Basecamp Trip Planner (`family-road-trip-planner`):**
   - Cloud Satellite Port: `:443` | Route: `https://daily-executive-dashboard.onrender.com/trip-planner/`
   - Scope: Overland expedition routing, Pacific Northwest campsite permits.

---

## 3. Security, Privacy & Runtime Directives

- **Access Protection:** Sensitive records, private PII, and internal state files under `/core_state/*` must yield `403 Forbidden` to direct external HTTP requests.
- **Dynamic Countdowns:** All date calculations must utilize `js/date-utils.js` UTC day calculations to eliminate timezone drift and prevent static string freeze.
- **Iframe Sandboxing:** All embedded satellite iframes must enforce `sandbox="allow-scripts allow-same-origin allow-forms allow-popups"` with `allow-top-navigation` strictly disallowed.
- **CSP Frame Security:** All pages must enforce `Content-Security-Policy: frame-ancestors 'self' http://localhost:* http://127.0.0.1:* https://*.onrender.com;` and `X-Frame-Options: SAMEORIGIN`.
