# Independent car rental

**Vertical:** Automotive · **Level:** Intermediate · **Build status:** not yet built by anyone

A small rental firm shows its fleet, takes reservations, and checks cars out and back in.

## The problem

A ten-car rental business runs on a wall calendar. A car comes back late and the next customer is already at the counter.

## Who uses it

- **Visitor**: browses the fleet and checks dates
- **Renter**: reserves, sees their own rentals
- **Counter staff**: checks cars out and in, records mileage and damage

## What it keeps track of

- **Car**: make, model, class, daily rate, photos, state
- **Reservation**: car, renter, pick-up, return, state
- **Handover**: reservation, kind (out, in), mileage, fuel, notes

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor filters cars by dates and class.
2. A renter reserves a car for a date range.
3. Staff check the car out, then back in with mileage and fuel.
4. A late return shows on the next reservation for that car.

## Who can see what

- The fleet and availability are public.
- A renter sees only their own reservations.
- Handover notes about damage are staff-only until shared.

## Platform services to reach for

`rental`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Two reservations cannot overlap on one car.
- [ ] A car checked out is not offered for those dates.
- [ ] Price is daily rate times days, worked out by the app.
- [ ] A renter cannot open another renter's reservation.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A deposit hold with `stripe_checkout`.
- Maintenance blocks that take a car off the calendar.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/automotive/car-rental.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
