# Limits and plans

The free plan, as published on [supero.dev/pricing](https://supero.dev/pricing) on 5 October 2026. That page is the authority.

| | Free |
|---|---|
| Price | $0, no card |
| Projects | 3 |
| Preview deployments | 10, about 30 minutes each |
| Schemas | 20 |
| API requests | 10,000 a month |
| Permanent live deployment | From the Basic plan ($9.99 a month) |

## Making ten previews go a long way

- `build_plan`, `build_validate` and `build_doctor` do not deploy and do not use a preview. Get them clean first.
- Ask for the plan to be echoed back before any code is written. A wrong plan costs a preview; a corrected plan costs a sentence.
- Batch your changes. Five small edits and one deploy beats five deploys.
- A preview lasts about 30 minutes. Have your "Done when" list ready before you deploy, and take your screenshots while it is up.

## Making three projects go a long way

One project is one app. Every brief in this repo is sized to fit inside the free plan's 20 schemas. If you want to start an app again from nothing, `build_replace_project` clears it without using another project (dev mode, domain admin).

## Timing

A deploy usually comes up in a few minutes. It can report `launching` for five minutes or more. Ten minutes is the point at which to look at `build_deploy_status` and `build_doctor` for a cause.
