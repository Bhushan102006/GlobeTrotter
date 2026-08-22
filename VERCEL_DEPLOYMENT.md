# Deploying GlobeTrotter Frontend to Vercel

Your frontend is now pre-configured and ready for Vercel deployment. Follow these steps to host your application on Vercel:

---

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   Ensure all changes (including `client/vercel.json` and root `vercel.json`) are committed and pushed to your git repository.

2. **Import Project into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
   - Select your repository (`GlobeTrotter`).

3. **Configure Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client` *(Recommended)*
     - *If left as `./` (root), Vercel will automatically use root `vercel.json` to build the `client` directory.*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables**:
   In the **Environment Variables** section on Vercel, add:
   - `VITE_API_BASE_URL`: The full URL of your deployed backend API (e.g., `https://your-backend-api.onrender.com/api/v1`).
   - *(Optional)* `VITE_PEXELS_API_KEY`: Your custom Pexels API Key.

5. **Deploy**:
   - Click **"Deploy"**. Vercel will build and host your site.

---

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy from the client folder**:
   ```bash
   cd client
   vercel
   ```

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## Key Configurations Added

- **[client/vercel.json](file:///c:/dukulu%20tech/GlobeTrotter/client/vercel.json)**: Configured SPA rewrite rules so client-side routing (React Router) routes work properly on page refresh without 404 errors.
- **[vercel.json](file:///c:/dukulu%20tech/GlobeTrotter/vercel.json)**: Root configuration so Vercel builds the `client` directory automatically if deployed from repository root.
- **[client/.env.example](file:///c:/dukulu%20tech/GlobeTrotter/client/.env.example)**: Environment variable template for your backend API URL (`VITE_API_BASE_URL`).
