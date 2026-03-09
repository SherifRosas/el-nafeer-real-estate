# 🧠 Al-Nafeer Project Memory (v3.5_ELITE)

*Generated: March 9, 2026*

## 🏢 Project Overview

**Al-Nafeer Real Estate & Services Platform** is a sophisticated Next.js application designed to manage luxury real estate and specialized vertical services (like Elevators) in Egypt and KSA. It features a high-end "Liquid Gloss/Sahara Gold" aesthetic, comprehensive Admin/Owner dashboards, and an integrated RAG-based AI assistant.

## 🏗️ Technology Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Custom themes: Liquid Gloss, Sahara Gold, Nile Obsidian)
- **Database ORM:** Prisma
- **Database Engine:** PostgreSQL (Hosted on Supabase Pooler `aws-1-eu-central-1`)
- **Authentication:** NextAuth.js (Google OAuth, Credentials)
- **AI/LLM:** Groq API (`llama-3.1-8b-instant` for Chat), `@xenova/transformers` (`all-MiniLM-L6-v2` for local offline RAG embeddings)
- **Vector Store:** Local JSON (`lib/ai/project_index.json`) for project awareness

## 🔄 Current State & Accomplishments

### 1. Aesthetic Overhaul (v3.5_ELITE)

- Implemented "Prestige Card" and "Liquid Gloss" CSS effects globally.
- Redesigned the Hero section and navigation for a premium feel.
- Unified the Footer with Milky Glass effects and dual "Master" calling nodes (Ahmed Abdel Sattar).

### 2. Elevator Vertical (Al-Nafeer Pro)

- Built `BrandProfile` schema for service companies.
- Implemented `BrandOnboardingTerminal` for capturing industry/portfolio data.
- Created `AlNafeerTrackerHUD` for real-time analytics and geographic heatmaps (Egypt/KSA).
- Added AI-driven marketing generation for elevator maintenance/installation.

### 3. Universal Context (AI RAG Engine)

- **Goal:** Give the AI chatbot codebase awareness and persistent chat history.
- **Implemented:**
  - `ProjectIndexer` (`lib/ai/project-indexer.ts`) to chunk/embed code.
  - `ContextRetriever` (`lib/ai/context-retriever.ts`) for cosine similarity search.
  - `ChatSession` and `ChatMessage` Prisma schemas for history.
  - UI indicators ("Context Loaded", "Project Awareness" toggle) in `AIChatbot.tsx`.

## ✅ Resolved Blockers (What We Fixed)

We previously faced a persistent **P1000/P1012** authentication error with the Supabase connection. 
- **The Fix:** We standardized the `.env` format, renamed the variable to `EL_NAFEER_DB_URL` locally, connected to the `aws-1` pooler on port `6543`, and reset the database password to an alphanumeric string (`NafeerElite2026`).
- **Result:** The database synced perfectly (`npx prisma db push` succeeded).

## 🚀 Final Execution & Active State

After resolving the database blocker, we successfully ran the final activation scripts:
1. **AI Indexing Complete:** The command `npx tsx lib/ai/project-indexer.ts` successfully ran. The codebase is now chunked and embedded in the local vector store.
2. **Elevator Campaign Deployed:** We executed a script (`scripts/create-elevator-campaign.ts`) that created the first official Brand Profile (`Al-Nafeer Elite Elevators`) and generated a multi-channel campaign (`PIONEER_ELEVATOR_AWARENESS_Q1`). The campaign is currently active in the database.

## 🎯 Next Steps (For the Next Session)

The project is fully stable and the Universal Context system is activated. In the new session, you can:
1. **Test the Universal Context:** Open the AI ChatHUD on the site and verify it can answer questions based on the scanned files.
2. **Expand the Marketing Engine:** Review the newly generated campaigns in the Admin Panel (`/admin/campaigns`) and add execution tracking.
3. **Continue Development:** Proceed with the next major feature in the roadmap (e.g., automated interview scheduling or advanced admin analytics reporting).

## 📂 Key Modified Files

- `prisma/schema.prisma` (Added Chat, Context, Brand profiles)
- `components/AIChatbot.tsx` (Added RAG UI/Settings)
- `app/api/ai/chat/route.ts` (Dynamic System Prompt with RAG injection)
- `lib/ai/project-indexer.ts` & `lib/ai/context-retriever.ts` (Core AI Engine)
- `package.json` (Added `tsx` and `ai:sync` script)
- `app/globals.css` (Premium v3.5_ELITE aesthetics)
