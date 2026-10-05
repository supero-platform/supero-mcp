# Expense claims

**Vertical:** Finance · **Level:** Starter · **Status:** open

Staff submit expenses with a receipt, and a manager approves them.

## The problem

Expenses arrive as photos in a chat, months late. The bookkeeper retypes them, and nobody is sure which have been paid.

## Who uses it

- **Employee**: submits claims with receipts, sees their own
- **Approver**: approves or rejects claims for their team
- **Bookkeeper**: marks approved claims as paid

## What it keeps track of

- **Claim**: employee, date, category, amount, receipt, state
- **Approval**: claim, approver, outcome, note

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An employee submits a claim with a photo of the receipt.
2. The approver approves or rejects it with a note.
3. The bookkeeper marks approved claims as paid.
4. An employee sees which of their claims are still outstanding.

## Who can see what

- An employee sees only their own claims.
- An approver sees their team's claims and cannot approve their own.
- Only the bookkeeper can mark a claim paid.

## Platform services to reach for

`approval`, `attachment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A claim cannot be paid before it is approved.
- [ ] A claim without a receipt cannot be submitted.
- [ ] An approver cannot approve their own claim.
- [ ] Totals by category match the claims.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A monthly spending limit per category.
- Export approved claims for the accountant.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/finance/expense-claims.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
