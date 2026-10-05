# Venue and room hire

**Vertical:** Events · **Level:** Starter · **Status:** open

A community hall rents its rooms by the hour and keeps a diary nobody has to phone for.

## The problem

A village hall takes bookings by phone and a paper diary. Double bookings happen, and the treasurer never knows which hires have been paid.

## Who uses it

- **Visitor**: sees rooms and which hours are free
- **Hirer**: requests a hire, sees their own hires
- **Hall manager**: approves requests, marks them paid, blocks out maintenance days

## What it keeps track of

- **Room**: name, capacity, hourly rate, photos
- **Hire**: room, hirer, start, end, purpose, status (requested, approved, declined, cancelled), paid

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor checks a room's availability for a date.
2. A hirer requests a slot; it holds the time while pending.
3. The manager approves or declines.
4. The manager marks a hire paid and sees unpaid hires.

## Who can see what

- Availability is public, but who booked is not.
- A hirer sees only their own hires.
- Only the manager can approve and mark paid.

## Platform services to reach for

`rental`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Two approved hires cannot overlap in one room.
- [ ] A visitor sees a slot as taken without seeing who took it.
- [ ] Cost is rate times hours, worked out by the app.
- [ ] A declined request frees the time.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A deposit taken online.
- Recurring weekly hires for clubs.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/events/venue-hire.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
