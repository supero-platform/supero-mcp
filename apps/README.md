# Community apps

Apps people have built on Supero over MCP, with their source. Anyone can add one, anyone can run one, and anyone can send a fix to one.

| App | What it is | Started by | From brief | State |
|---|---|---|---|---|
| *Be the first.* | | | | |

## Run one

Clone this repo, connect your assistant ([how](../README.md#2-connect-your-assistant)), and paste:

```text
Use your Supero build_ tools. Read the bundle in apps/[vertical]/[app]/bundle in this repo.
Call build_whoami and build_get_skills first, set the bundle's namespace to my project's,
then build_validate, build_publish, build_deploy and build_smoke_test. Tell me the URL and how I log in.
```

It deploys into **your** project, on your account. Nothing you do touches the author's copy.

## Add yours

Your app can come from a [brief](../projects/README.md) or be entirely your own idea.

1. Build it and check it works on a preview.
2. Make a folder: `apps/<vertical>/<app-name>/`.
3. Put in it:
   - `README.md`, copied from [APP-TEMPLATE.md](APP-TEMPLATE.md): what it does, who uses it, who can see what, how to sign in to a fresh deploy, which assistant built it, and what is known not to work yet.
   - `screenshot.png`: one screen.
   - `bundle/`: the app's files. Ask your assistant to save what `build_get_bundle` returns.
4. Add a row to the table above and open a pull request.

Your name goes in the "Started by" column and stays there.

## Improve someone else's

This is the part we hope catches on. Every app here is unfinished in some way, and its README says how.

1. Pick an app and read its "Known gaps" list and its open issues (they carry the app's name in the title).
2. Deploy it into your own project with the prompt above.
3. Ask your assistant for the change, starting from the files in `bundle/`. Check it on a preview.
4. Save the changed bundle back into the folder and open a pull request that says what you changed and how you checked it.

One change per pull request. A fix to an access rule, a missing screen, a clearer label and a test are all welcome. If your change is large, open an issue first so the person who started the app can weigh in.

## Before you push

- **No keys.** Search your folder for `ak_` and for `.env`. `python3 scripts/check_repo.py` checks too.
- **No real people's data** in seed data or screenshots. Seed users need made-up addresses and may use a shared demo password, which the README should state.
- **Messages go only to a verified identity.** If the app sends email or SMS, the recipient must be the signed-in user's own verified address, never something typed into a form.
- Say what does not work. "The assistant got the voting rule wrong twice" helps the next person more than a perfect write-up.

A preview URL expires after about 30 minutes, so the source and the screenshot are what last. If your app is live on a paid plan, link it.
