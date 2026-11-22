# Save sign-ups to a Google Sheet (about 10 minutes)

Without this, sign-ups are saved to a file that Streamlit Cloud erases whenever the app restarts.
The site works either way. With this, every sign-up, feedback answer and poll vote also lands in your Sheet.

1. Create a new Google Sheet. Rename the first tab **Signups** and add a second tab named **Poll**.
2. In Signups, row 1: `timestamp | name | email | role | note | feedback`. In Poll, row 1: `timestamp | answer`.
3. Menu **Extensions > Apps Script**. Delete the sample code and paste in `docs/apps_script.gs`.
   Change `CHANGE-THIS-TO-A-LONG-RANDOM-WORD` to your own secret word and save.
4. Click **Deploy > New deployment**, type **Web app**. Set *Execute as*: **Me**, *Who has access*: **Anyone**. Deploy,
   approve the permissions, and copy the **Web app URL** (ends in `/exec`).
5. In Streamlit Cloud open your app, then **Settings > Secrets** and paste (with your own values):

       [sheet]
       webhook_url = "THE-WEB-APP-URL"
       token = "THE-SAME-SECRET-WORD"

6. Save. The app restarts. Submit a test sign-up and check that a row appears in the Signups tab.

Notes
- The token stops strangers from writing to your Sheet. Do not put it in GitHub.
- The CSV backup is still written, so a sign-up is never lost if the Sheet is unreachable.
- Anyone who opens your Sheet sees names and emails. Keep it private and share it only with your team.
