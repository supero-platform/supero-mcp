# Franchise store checks

**Vertical:** Retail · **Level:** Advanced · **Status:** open

Head office sets store standards, each franchisee runs their own checks, and nobody sees another franchisee's results.

## The problem

A sandwich franchise audits stores with a paper checklist. Results reach head office weeks late, and franchisees suspect they are being compared without ever seeing the numbers.

## Who uses it

- **Store staff**: completes daily checklists
- **Franchisee**: sees their own stores' results and fixes
- **Head office auditor**: publishes checklists, sees every store, opens corrective actions

## What it keeps track of

- **Checklist**: title, items
- **Store**: name, address
- **Check run**: store, checklist, date, answers, score
- **Corrective action**: check run, description, owner, due, state

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. Head office publishes a checklist to every franchisee.
2. Store staff complete it on a phone.
3. A failed item opens a corrective action for the franchisee.
4. Head office sees scores across the network; a franchisee sees only their own.

## Who can see what

- Each franchisee is a separate tenant.
- A franchisee cannot see another franchisee's scores, stores or actions.
- Head office sees all; store staff see only their own store.

## Platform services to reach for

`task`, `attachment`, `workflows`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A franchisee cannot fetch another franchisee's check run by its ID.
- [ ] A score is worked out from the answers, not typed in.
- [ ] A failed item always creates a corrective action.
- [ ] Head office's network view and a franchisee's view of the same data differ as described.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Photo evidence on a failed item.
- A league table that shows each franchisee only their own rank.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/retail/franchise-ops.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
