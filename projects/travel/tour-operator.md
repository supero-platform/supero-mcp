# Day-tour operator

**Vertical:** Travel · **Level:** Intermediate · **Status:** open

A tour company sells seats on dated departures and never sells more than the bus holds.

## The problem

A walking-tour company takes bookings by message and on three resale sites. The guide finds out at the meeting point that 19 people have come for 14 places.

## Who uses it

- **Visitor**: browses tours and dates
- **Traveller**: books seats, sees their bookings
- **Guide**: sees the manifest for their departures
- **Operator**: creates tours and departures, sees sales

## What it keeps track of

- **Tour**: name, description, photos, price
- **Departure**: tour, date, guide, seats
- **Booking**: departure, traveller, seats, state

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor picks a tour and a date with seats left.
2. A traveller books seats; the count drops immediately.
3. A traveller cancels and the seats return.
4. The guide opens the manifest on the day.

## Who can see what

- Tours, dates and seats left are public.
- A traveller sees only their own bookings.
- A guide sees manifests only for their own departures.

## Platform services to reach for

`booking`, `product`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Seats booked never exceed seats on the departure.
- [ ] Two travellers booking the last seat cannot both succeed.
- [ ] A cancelled booking returns its seats.
- [ ] A guide cannot open another guide's manifest.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Payment at booking.
- Reviews after the tour with `reviews`.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/travel/tour-operator.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
