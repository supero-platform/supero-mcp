# Weekly meal-prep subscription

**Vertical:** Food · **Level:** Intermediate · **Build status:** not yet built by anyone

Customers subscribe to weekly meals, choose from this week's menu, and can skip a week.

## The problem

A meal-prep cook takes orders over social media every Sunday. Half the customers forget, and the cook buys ingredients for a number that turns out to be wrong.

## Who uses it

- **Visitor**: sees this week's menu
- **Subscriber**: picks meals, skips or pauses, sees their deliveries
- **Cook**: publishes the weekly menu, sees what to make

## What it keeps track of

- **Subscription**: subscriber, meals per week, state
- **Weekly menu**: week, dishes
- **Selection**: subscription, week, dishes chosen
- **Delivery**: subscription, week, state

These are a starting point, not a schema. Name lifecycle fields `<something>_state` (not `status` or `state`), and do not name a record `Project`, `User`, `Account`, `Organization` or `Tenant`: the platform uses those names.

## What people do

1. The cook publishes next week's menu.
2. A subscriber chooses their dishes before a cut-off.
3. A subscriber skips a week or pauses altogether.
4. The cook sees a count per dish for the week.

## Who can see what

- The current menu is public.
- A subscriber sees only their own subscription and selections.
- The production count is cook-only.

## Platform services to reach for

`recurring_plan`, `membership`

Ask your assistant to call `build_get_service_contract` for each one before it writes any code. Using a platform service is better than rebuilding it.

## Done when

- [ ] Selections cannot change after the cut-off.
- [ ] A skipped week produces no delivery and no count.
- [ ] Dish counts equal the selections for that week.
- [ ] A subscriber who chooses nothing gets a default, stated in the app.
- [ ] `build_validate` and `build_doctor` are clean, and `build_smoke_test` passes on the deployed URL.

## Stretch goals

- Billing each week with `recurring_plan`.
- Allergen filters on the menu.

## Starter prompt

Paste this into an assistant that is [connected to Supero](../../README.md#2-connect-your-assistant):

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: there is no local supero CLI and no SKILLS.md file on disk.

Build the app described in this brief: https://github.com/supero-platform/supero-mcp/blob/main/projects/food/meal-prep-subscription.md
(If you cannot open the link, I will paste the brief.)

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and build_deploy for a preview. Finally build_smoke_test the URL and check each line of the brief's "Done when" list. Finish with a short summary: what you built, the URL, and how I log in.
```

## Built it?

Add your build to the [community apps](../../apps/README.md). More than one person can build the same brief.
