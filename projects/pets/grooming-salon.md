# Pet grooming salon

**Vertical:** Pets · **Level:** Starter · **Status:** open

Owners book a groom for their pet, and the salon sees the day's appointments.

## The problem

A grooming salon books by text message. Owners forget which dog needs which cut, and the groomer finds out about the nervous spaniel when it arrives.

## Who uses it

- **Visitor**: sees services and prices
- **Owner**: registers pets, books and cancels appointments
- **Groomer**: sees the day's appointments with the pet's notes

## What it keeps track of

- **Service**: name, duration, price
- **Pet**: owner, name, breed, handling notes
- **Appointment**: pet, service, start, state

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor reads the price list.
2. An owner adds a pet and books a slot.
3. The groomer opens today's list and sees each pet's handling notes.
4. An owner cancels and the slot becomes free.

## Who can see what

- Services and prices are public.
- An owner sees only their own pets and appointments.
- Groomers see all appointments.

## Platform services to reach for

`appointment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Two appointments cannot overlap for one groomer.
- [ ] An owner cannot see another owner's pet.
- [ ] A cancelled slot can be booked again.
- [ ] The day list is in time order.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- A photo of the finished groom with `attachment`.
- Loyalty stamps with `loyalty_points`.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/pets/grooming-salon.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
