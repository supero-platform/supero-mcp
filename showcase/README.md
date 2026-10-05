# Showcase

Apps built from the [project briefs](../projects/README.md). Yours goes here.

| App | Brief | Built by | Assistant | Notes |
|---|---|---|---|---|
| *Be the first.* | | | | |

## Add yours

1. Build a brief and get to the end of its "Done when" list.
2. Make a folder: `showcase/<vertical>/<brief>-<your-github-name>/`.
3. Put in it:
   - `README.md`: what you built, which assistant you used, the "Done when" list with each line ticked or explained, and anything that surprised you.
   - `screenshot.png`: one screen, taken while the preview was up.
   - `bundle/` (optional): the app's files, from `build_get_bundle`, so others can learn from them.
4. Add a row to the table above and open a pull request.

## Before you push

- **No keys.** Search your folder for `ak_` and for `.env`. `python3 scripts/check_repo.py` checks too.
- **No real people's data.** Use made-up names and addresses in seed data and screenshots.
- **Messages go only to a verified identity.** If your app sends email or SMS, the recipient must be the signed-in user's own verified address, never something typed into a form. A demo that will message any address it is given gets used to message strangers.
- A preview URL expires after about 30 minutes, so the screenshot is what lasts. If your app is live on a paid plan, link it.

Being honest about what did not work is welcome. "The assistant got the voting rule wrong twice" helps the next person more than a perfect write-up.
