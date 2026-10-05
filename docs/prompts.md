# Prompts that work

Copy, change the part in square brackets, paste.

## First build, project key

```text
Connect to Supero over MCP and use your build_ tools. Everything runs through MCP: don't look for a local supero CLI or a SKILLS.md file on disk, there isn't one.

Build this app in my project: [describe your app: the main thing users do, the key screens, and an admin view].

Work in this order: build_whoami, then build_get_skills to load the spec, then build_plan. Echo the plan back to me and wait for my go-ahead. Then build_get_examples with the closest archetype as your reference, author the bundle, run build_validate and fix everything it reports, run build_doctor and fix its warnings, then build_publish and deploy (build_deploy for a ~30-minute preview, build_go_live for the permanent URL). Finally build_smoke_test the deployed URL and finish with a short summary: what you built, the URL, and how I log in.
```

## First build, domain key

Same as above, with the second paragraph replaced by:

```text
Create a new project with build_create_project (pick a short name and namespace), then build this app in it: [describe your app].
```

## From a brief in this repo

```text
Build the app described here: https://github.com/supero-platform/supero-mcp/blob/main/projects/[vertical]/[brief].md
Follow the order build_whoami, build_get_skills, build_plan (wait for my go-ahead), build_get_examples, author, build_validate, build_doctor, build_publish, build_deploy, build_smoke_test. When it is deployed, go through the brief's "Done when" list and tell me which lines pass.
```

## The assistant is hunting for a CLI

```text
Stop reading the local filesystem. There is no CLI and no SKILLS.md. Call build_get_skills over MCP now, author the bundle, then build_validate.
```

## Change an existing app

```text
Fetch the current bundle with build_get_bundle. Change this and nothing else: [the change]. Then build_validate, build_publish and build_deploy, and tell me the new version number and URL.
```

## The deploy failed or the app is blank

```text
Call build_deploy_status and build_doctor and show me what they say. Fix the cause in the bundle, not the symptom, then validate, publish and deploy again.
```

## Describe an app well

One paragraph is enough if it answers four questions:

1. **Who uses it?** Name the roles: "customers, staff and an owner".
2. **What does each do?** One sentence per role.
3. **Who must not see what?** "A customer sees only their own orders. Staff notes are hidden from customers."
4. **What does done look like?** "A customer can book a slot, and two customers cannot book the same one."

The third question is the one people skip, and it is the one that makes an app safe to put in front of someone.
