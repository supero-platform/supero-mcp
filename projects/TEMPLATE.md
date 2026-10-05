# [App name]

**Vertical:** [vertical] · **Level:** [Starter | Intermediate | Advanced] · **Status:** open

[One sentence: who does what.]

## The problem

[Two or three sentences about a real situation. Who is doing this by hand today, and what goes wrong?]

## Who uses it

- **[Role]**: [what they do]
- **[Role]**: [what they do]

## What it keeps track of

- **[Record]**: [fields, in plain words]

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. [A step somebody takes, start to finish.]
2. [...]

## Who can see what

- [A rule. "A customer sees only their own orders."]
- [A field that is hidden from a role.]

## Platform services to reach for

[`service_id`, `service_id`] (only ones that `build_list_capabilities` returns)

## Done when

- [ ] [A check a stranger could run in the deployed app, with a yes or no answer.]
- [ ] [At least one check that something is *not* visible or *not* allowed.]
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- [Optional extras.]

## Starter prompt

[Copy the prompt from any existing brief and change the link.]
