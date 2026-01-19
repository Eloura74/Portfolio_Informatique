# 🚀 Deploying to Vercel

This guide explains how to deploy your GitHub Portfolio to Vercel.

## Prerequisites

1.  A [GitHub account](https://github.com/).
2.  A [Vercel account](https://vercel.com/).

## ⚠️ CRITICAL SETTINGS FIX ⚠️

**You must check these settings or the deployment will fail (404 Error).**

1.  Go to your Project Settings in Vercel.
2.  Select **Build & Development**.
3.  **Root Directory**:
    *   **MUST BE EMPTY**.
    *   ❌ Do NOT type `./`.
    *   ❌ Do NOT type `/`.
    *   ✅ It should say "N/A" or be completely blank.
    *   **Action**: Delete everything in this box and click **Save**.

4.  **Framework Preset**:
    *   Select **Other**.

5.  **Build Command**:
    *   **MUST BE EMPTY**.
    *   Toggle "Override" to **ON** and leave the box **BLANK**.
    *   (Do not use `npm run build`).

6.  **Output Directory**:
    *   **MUST BE EMPTY**.
    *   Toggle "Override" to **ON** and leave the box **BLANK**.

---

## Standard Deployment Steps

1.  **Push to GitHub**: Ensure your latest code (including `vercel.json` and `requirements.txt`) is pushed to your GitHub repository.

2.  **Import Project in Vercel**:
    *   Log in to your Vercel dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Find your `github-portfolio` repository and click **"Import"**.

3.  **Configure Project**:
    *   Follow the **CRITICAL SETTINGS FIX** above.

4.  **Deploy**:
    *   Click **"Deploy"**.
    *   If you have already deployed and it failed, go to the **Deployments** tab and click **Redeploy** (dots menu -> Redeploy) after fixing the settings.

## Troubleshooting

### ❌ "Root Directory" Error
If you see a red error saying "Root Directory must be a relative path...", it means you have typed `./` in the box. **Clear it completely.**

### ❌ 404 Not Found
This means Vercel didn't build the Python app correctly.
1.  Ensure `vercel.json` is in the root of your repo.
2.  Ensure **Build Command** is empty (so Vercel uses the default Python build).
3.  Ensure **Root Directory** is empty.
