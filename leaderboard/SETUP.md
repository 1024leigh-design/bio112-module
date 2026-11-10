# Turning on the class leaderboard

This takes about 10 minutes, once. Students never need an account.

## What gets saved

- Saving is optional. Students type any nickname.
- Only the nickname, score, date, and a short game note are saved.
- Each save gives the student a secret **claim code**. Only you can see codes (in your Sheet). For extra credit, a student shows you their code.

## Steps

1. Go to Google Sheets and create a new blank sheet. Name it something like "BIO 112 Leaderboard".
2. In the sheet, click **Extensions > Apps Script**.
3. Delete the starter code. Paste in everything from `leaderboard/apps-script.gs`. Click **Save**.
4. Click **Deploy > New deployment**.
   - Click the gear next to "Select type" and choose **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**. Google will ask you to authorize it. Allow it (it only touches this one sheet).
5. Copy the **Web app URL** (it ends in `/exec`).
6. Send the URL to Claude, or paste it into `leaderboard.js` on the line `var URL = "";`.

## At the end of the unit

- Open the Sheet. The **Scores** tab lists every save.
- Sort by **Score** to see the top players.
- A student claims extra credit by showing you their claim code. Match it to the **Claim code** column.

## Moderation

- To remove an inappropriate nickname or a fake score, delete that row in the Sheet. It disappears from the board right away.
- Scores above a believable maximum are rejected automatically.

## Turning it off

- In Apps Script: **Deploy > Manage deployments > Archive**. The games keep working without a leaderboard.
