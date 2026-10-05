# Course enrolment with a waitlist

**Vertical:** Education · **Level:** Starter · **Build status:** not yet built by anyone

> **Workflows do not work on MCP deploys yet.** This brief uses `workflows`. When an app is deployed through MCP today, its workflow triggers are not registered, and we are investigating. Build the rest of the app, leave the workflow out, and list it as a known gap.

A small school publishes courses, fills them, and runs a waitlist when they are full.

## The problem

A community school takes enrolments by email. Courses overfill, the waitlist lives in someone's inbox, and a dropped place is rarely offered to the next person.

## Who uses it

- **Visitor**: reads the course catalogue
- **Learner**: enrols, joins a waitlist, sees their own enrolments
- **Staff**: creates courses, sets capacity, promotes people from the waitlist

## What it keeps track of

- **Course**: title, description, start date, capacity
- **Enrolment**: course, learner, status (enrolled, waitlisted, withdrawn)

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor browses courses and sees how many places are left.
2. A learner enrols; if the course is full they join the waitlist instead.
3. A learner withdraws; staff promote the first person on the waitlist.
4. Staff see a roster per course.

## Who can see what

- The catalogue is public. Rosters are staff-only.
- A learner sees only their own enrolments.

## Platform services to reach for

`workflows`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Places left is correct after every enrol and withdraw.
- [ ] A full course offers the waitlist, never a sixth seat in a class of five.
- [ ] A learner cannot see who else is enrolled.
- [ ] Promoting from the waitlist changes exactly one enrolment.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Email the learner when they are promoted (to their own signed-in address).
- Cohorts: the same course run on several dates.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/education/course-enrolment.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
