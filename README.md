# 🧩 Teams App

A modern **product management platform** built with **React**, **TypeScript**, and **Supabase**.  
The app enables users to **create, join, and manage teams + products**, view **real-time member presence**, and perform **secure authentication** — all with a clean and responsive UI.

---

## 🚀 Overview

The **Teams App** is designed to demonstrate a complete full-stack workflow using modern frontend and backend technologies.  
It integrates **Supabase** for authentication, database management, and serverless functions — while the client is powered by **React** with **TypeScript**, **Tailwind CSS**, and **TanStack Query** for efficient data fetching and caching.

---

## ✨ Key Features

### 🖥️ Client Side

- **Modern UI** with Tailwind CSS and responsive design
- **Form validation and handling** via React Hook Form
- **Data fetching and caching** with TanStack Query
- **Real-time updates** for team members’ online/offline status
- **TypeScript** for type-safe and maintainable codebase

### ⚙️ Backend (Supabase)

- **Authentication & Authorization** (email/password, google auth)
- **Edge Functions** for custom server-side logic
- **Relational database** setup with foreign keys (Teams ↔ Users ↔ Tasks, etc.)
- **Row-Level Security (RLS)** policies for secure data access
- **Storage** for user avatars or project images
- **Real-time subscriptions** for live presence updates

---

## ⚙️ Installation & Setup

1. Clone the repository

2. Copy content of .env.example file and populate with your secret values

3. Install dependencies

```bash
npm i
```

4. Run the development server

```bash
npm run dev
```
