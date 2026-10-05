# Car repair shop job cards

**Vertical:** Automotive · **Level:** Intermediate · **Build status:** not yet built by anyone

A garage quotes a repair, gets the customer's approval, and tracks the job and the parts.

## The problem

A garage phones customers for approval and writes it on the job card. Disputes over what was agreed are common, and the parts shelf is counted by looking at it.

## Who uses it

- **Customer**: sees their vehicles and jobs, approves or declines a quote
- **Mechanic**: works assigned jobs, records parts used
- **Service adviser**: creates jobs and quotes, manages stock

## What it keeps track of

- **Vehicle**: customer, registration, make, model
- **Job card**: vehicle, mechanic, description, state
- **Quote line**: job card, description, amount
- **Part**: name, stock on hand
- **Part used**: job card, part, quantity

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An adviser opens a job card and writes a quote.
2. The customer approves or declines the quote online.
3. The mechanic works the job and records parts used, which reduces stock.
4. The job is completed and the customer sees the final total.

## Who can see what

- A customer sees only their own vehicles and jobs.
- A mechanic sees jobs assigned to them.
- Stock levels are staff-only.

## Platform services to reach for

`approval`, `inventory`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Work cannot start on an unapproved quote.
- [ ] Recording a part used reduces stock by that quantity.
- [ ] Stock cannot go below zero.
- [ ] A customer cannot see another customer's vehicle.
- [ ] The quote total is the sum of its lines.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Take payment on completion.
- A reminder when a service is due.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/automotive/repair-shop.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
