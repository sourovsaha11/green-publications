# 🚀 Vercel Deployment Guide

## STEP 1 — Push to GitHub

Create 2 separate repos OR push as one monorepo. Vercel can deploy subfolders.

```bash
cd green-publications
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/green-publications.git
git push -u origin main
```

---

## STEP 2 — Deploy SERVER to Vercel

1. Go to vercel.com → New Project → Import your repo
2. Set **Root Directory** → `server`
3. **Framework Preset** → Other
4. **Build Command** → `npm install`
5. **Output Directory** → leave empty

**Add Environment Variables:**
| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/green-publications` |
| `JWT_SECRET` | `green_pub_secret_2024_xyz` |
| `NODE_ENV` | `production` |

6. Deploy → copy the URL e.g. `https://green-publications-server-xxx.vercel.app`

---

## STEP 3 — Seed Admin (ONE TIME)

After server deploys, open browser and visit:
```
https://YOUR-SERVER-URL.vercel.app/api/auth/seed
```
Admin: admin@greenpublications.com / admin123456

---

## STEP 4 — Deploy FRONTEND to Vercel

1. New Project → Import same repo
2. Set **Root Directory** → `client`
3. **Framework Preset** → Create React App
4. **Build Command** → `npm run build`
5. **Output Directory** → `build`

**Add Environment Variables:**
| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://YOUR-SERVER-URL.vercel.app` |

6. Deploy ✅

---

## STEP 5 — Update Server CORS (after you have frontend URL)

In server/server.js the CORS is set to `*` so it works immediately.
