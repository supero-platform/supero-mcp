# Tutoring marketplace

**Vertical:** Education · **Level:** Intermediate · **Status:** open

Students find a tutor by subject, book a session and leave a review.

## The problem

Independent tutors run their business from a chat app and a spreadsheet. Students cannot see who is free, tutors double-book, and nobody has a record of what was taught.

## Who uses it

- **Visitor**: browses tutors and subjects without signing in
- **Student**: books sessions, sees their own bookings, reviews a tutor after a session
- **Tutor**: manages their profile and availability, sees only their own sessions
- **Admin**: approves new tutors and sees everything

## What it keeps track of

- **Subject**: name, level
- **Tutor**: display name, bio, subjects, hourly rate, approved
- **Session**: tutor, student, subject, start, end, status
- **Review**: session, rating, comment

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor filters tutors by subject and opens a tutor's page.
2. A student books a free slot; the session starts as `requested`.
3. The tutor confirms or declines; a confirmed session can be completed or cancelled.
4. After a completed session the student can leave one review.

## Who can see what

- Tutor pages and subjects are public. Sessions and reviews in progress are not.
- A student sees only their own sessions; a tutor sees only sessions booked with them.
- A tutor's page shows only tutors an admin has approved.

## Platform services to reach for

`booking`, `reviews`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A signed-out visitor can browse tutors and subjects.
- [ ] Two students cannot book the same tutor for the same slot.
- [ ] A student cannot open another student's session by its ID.
- [ ] A review can only be left on a completed session, once.
- [ ] An unapproved tutor does not appear in the public list.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Take payment for a session with `stripe_checkout`.
- A tutor dashboard with hours taught per month.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/education/tutoring-marketplace.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [showcase](../../showcase/README.md). More than one person can build the same brief.
