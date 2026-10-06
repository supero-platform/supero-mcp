# Freelancer invoices

**Vertical:** Developer tools · **Level:** Intermediate · **Build status:** not yet built by anyone

A freelancer bills clients, and each client sees only their own invoices.

## The problem

A freelancer makes invoices in a document template and tracks payment in their head. Two months later they cannot say who still owes them, and a client asks for a copy of something sent in spring.

## Who uses it

- **Freelancer**: manages clients, writes invoices, marks them paid
- **Client**: sees and downloads their own invoices

## What it keeps track of

- **Client company**: name, billing address
- **Invoice**: client company, number, issue date, due date, state (draft, sent, paid, overdue)
- **Line item**: invoice, description, quantity, unit price
- **Private note**: invoice, text

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. The freelancer adds a client and writes an invoice with line items.
2. The freelancer sends it; the client can now see it.
3. The client opens their list and sees what is unpaid.
4. The freelancer marks an invoice paid; overdue invoices are flagged by date.

## Who can see what

- A client sees only their own company's invoices, and never a draft.
- Private notes are visible to the freelancer only.
- Only the freelancer can create, change or mark an invoice paid.

## Platform services to reach for

`customer`, `payment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A client cannot open another client's invoice by its ID.
- [ ] A draft invoice is absent from the client's list.
- [ ] The total is the sum of quantity times unit price, worked out by the app.
- [ ] Invoice numbers do not repeat.
- [ ] Overdue is worked out from the due date, not typed in.
- [ ] The words Account and Project are not used as record names (the platform reserves them).
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Online payment with `stripe_checkout`.
- A yearly income summary by client.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/developer-tools/freelancer-invoices.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
