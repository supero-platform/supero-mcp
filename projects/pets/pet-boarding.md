# Pet boarding kennel

**Vertical:** Pets · **Level:** Intermediate · **Build status:** not yet built by anyone

A kennel takes multi-night bookings against a fixed number of pens.

## The problem

A boarding kennel overbooks at Christmas every year because the diary shows names, not pens. Vaccination records are checked from memory.

## Who uses it

- **Owner**: books stays for their pets, uploads vaccination records
- **Kennel staff**: sees arrivals and departures, records daily notes
- **Manager**: sets pen counts and prices, approves stays

## What it keeps track of

- **Pen type**: name, count, nightly rate
- **Pet**: owner, name, species, vaccination record
- **Stay**: pet, pen type, arrive, depart, state
- **Daily note**: stay, date, note

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. An owner requests a stay for a date range.
2. The manager approves it if a pen of that type is free every night.
3. Staff see today's arrivals and departures.
4. Staff add a daily note the owner can read.

## Who can see what

- An owner sees only their own pets, stays and notes.
- Occupancy is staff-only.

## Platform services to reach for

`rental`, `attachment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Approved stays never exceed the pen count on any night.
- [ ] A stay cannot be approved without a vaccination record.
- [ ] Price is nightly rate times nights.
- [ ] An owner cannot read notes about someone else's pet.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A waiting list for full dates.
- Add-on services such as a walk or a bath.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/pets/pet-boarding.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
