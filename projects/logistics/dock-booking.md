# Warehouse dock booking

**Vertical:** Logistics · **Level:** Starter · **Build status:** not yet built by anyone

Carriers book an unloading slot at a warehouse dock.

## The problem

Trucks arrive when they arrive. Three turn up at nine, the yard jams, and the afternoon dock sits empty.

## Who uses it

- **Carrier**: books and cancels slots for their own trucks
- **Warehouse staff**: sets up docks and opening hours, checks trucks in

## What it keeps track of

- **Dock**: name, accepts (pallets, bulk, chilled)
- **Slot booking**: dock, carrier, start, end, reference, status (booked, arrived, done, no-show)

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A carrier picks a dock and a free slot and books it.
2. Staff check the truck in when it arrives and close the booking when it leaves.
3. A carrier cancels and the slot becomes free.
4. Staff see today's schedule per dock.

## Who can see what

- A carrier sees which slots are taken, not who took them.
- A carrier sees and changes only their own bookings.

## Platform services to reach for

`booking`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Two bookings cannot overlap on one dock.
- [ ] A carrier cannot read another carrier's reference number.
- [ ] A cancelled slot can be booked again immediately.
- [ ] The day view matches the bookings.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- No-show rate per carrier.
- Different slot lengths per load type.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/logistics/dock-booking.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
