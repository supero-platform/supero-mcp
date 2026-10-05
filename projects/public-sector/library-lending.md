# Community library lending

**Vertical:** Public sector · **Level:** Starter · **Status:** open

A small library lends items, takes reservations, and knows what is overdue.

## The problem

A tool library in a community centre tracks loans in an exercise book. Nobody chases overdue items because nobody can see them at a glance.

## Who uses it

- **Visitor**: searches the catalogue
- **Member**: borrows, reserves, sees their own loans
- **Librarian**: checks items out and in, sees what is overdue

## What it keeps track of

- **Item**: title, category, photo, copies
- **Loan**: item, member, out, due, returned
- **Reservation**: item, member, placed, state

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor searches the catalogue and sees availability.
2. A librarian checks an item out to a member with a due date.
3. A member reserves an item that is out.
4. The librarian sees overdue loans, oldest first.

## Who can see what

- The catalogue and availability are public.
- A member sees only their own loans and reservations.
- Who has an item is librarian-only.

## Platform services to reach for

`rental`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Copies out never exceed copies owned.
- [ ] A returned item goes to the first reservation, not back on the shelf.
- [ ] Overdue is worked out from the due date, not typed in.
- [ ] A member cannot see who holds an item.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A loan limit per member.
- Condition notes on return.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/public-sector/library-lending.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
