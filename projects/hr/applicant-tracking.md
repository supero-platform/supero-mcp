# Applicant tracking board

**Vertical:** HR · **Level:** Intermediate · **Status:** open

A hiring team moves candidates through stages and keeps interview notes away from the candidate.

## The problem

A ten-person company hires through a shared inbox. Feedback is scattered, candidates wait weeks for an answer, and nobody knows which stage anyone is at.

## Who uses it

- **Candidate**: applies to a job, sees the status of their own application
- **Interviewer**: sees candidates for jobs they are assigned to, adds scores and notes
- **Recruiter**: manages jobs and moves candidates between stages

## What it keeps track of

- **Job**: title, description, status (open, closed)
- **Application**: job, candidate, stage, applied date
- **Interview note**: application, interviewer, score, notes

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. A visitor reads open jobs; a signed-in candidate applies.
2. A recruiter drags an application between stages on a board.
3. An interviewer records a score and notes after an interview.
4. A candidate sees only the stage their application is at.

## Who can see what

- Open jobs are public.
- Scores and interview notes are hidden from the candidate.
- An interviewer sees only applications for jobs they are assigned to.

## Platform services to reach for

`workflows`, `attachment`, `comment`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] A candidate's view of their application contains no score and no notes.
- [ ] A candidate cannot open another candidate's application.
- [ ] Closing a job stops new applications.
- [ ] The board shows a count per stage that matches the data.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Attach a CV with `attachment`.
- Time-in-stage report for the recruiter.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/hr/applicant-tracking.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
