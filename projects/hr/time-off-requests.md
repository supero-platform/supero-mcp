# Time-off requests

**Vertical:** HR · **Level:** Starter · **Status:** open

Employees request leave, a manager approves it, and everyone sees a team calendar.

## The problem

Leave is agreed in conversation and tracked nowhere. Two people on a three-person team book the same week off and nobody notices until the Monday.

## Who uses it

- **Employee**: requests leave, sees their own requests and balance
- **Manager**: approves or declines requests for their team
- **Admin**: sets allowances

## What it keeps track of

- **Leave request**: employee, start, end, type, status, manager note
- **Allowance**: employee, year, days allowed

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An employee requests dates; the request starts as `pending`.
2. The manager approves or declines, with a note.
3. An approved request reduces the employee's remaining balance.
4. The team calendar shows who is away, without the reason.

## Who can see what

- An employee sees their own requests in full.
- The team calendar shows names and dates only, never the leave type or the manager's note.
- Only a manager can approve, and not their own request.

## Platform services to reach for

`approval`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Balance is allowance minus approved days, never negative.
- [ ] The leave type is absent from the calendar response for colleagues.
- [ ] A manager cannot approve their own request.
- [ ] A declined request does not change the balance.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Warn when an approval would leave a team below a minimum headcount.
- Public holidays.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/hr/time-off-requests.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
