# Coworking network

**Vertical:** Workspace · **Level:** Advanced · **Status:** open

Several coworking locations share one app, and each location sees only its own members and bookings.

## The problem

A coworking brand with three sites runs three copies of the same booking tool. Head office cannot see occupancy across them, and a member of one site cannot book a desk at another.

## Who uses it

- **Visitor**: sees locations and desk types
- **Member**: books desks and rooms at their own location
- **Location manager**: runs one location
- **Head office**: sees every location

## What it keeps track of

- **Desk type**: name, count, daily rate
- **Meeting room**: name, capacity, hourly rate
- **Membership**: member, plan, state
- **Desk booking**: member, desk type, date
- **Room booking**: member, room, start, end

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A member books a desk for a day at their location.
2. A member books a meeting room by the hour.
3. A location manager sees today's occupancy.
4. Head office switches between locations and compares them.

## Who can see what

- Each location is a separate tenant: its members, bookings and revenue are invisible to the others.
- A member sees only their own bookings.
- Head office can see all locations; a location manager cannot see another's.

## Platform services to reach for

`booking`, `membership`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A manager at one location cannot read a booking from another, even by its ID.
- [ ] Desk bookings never exceed the desk count for a day.
- [ ] Head office can switch location and see different data.
- [ ] The same catalogue of desk types can exist at each location without mixing.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A roaming plan that lets a member book at any location.
- Monthly billing with `recurring_plan`.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/workspace/coworking-network.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
