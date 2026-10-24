# Zoho Recruit — Enterprise ATS & Recruitment CRM Platform Clone

> A high-fidelity, reverse-engineered clone of the **Zoho Recruit** applicant tracking system (ATS) and recruitment CRM. Built using the **REA (Reverse Engineer Anything)** methodology to faithfully replicate Zoho Recruit's signature deep-navy enterprise design, dual-mode operational workflows, multi-stage visual candidate pipeline, automated resume parser, and quantitative interview evaluation scorecards.

---

## 🎯 Goal of the Application

The primary goal of this application is to deliver a comprehensive, production-grade recreation of **Zoho Recruit**, offering talent acquisition teams and staffing agencies a complete end-to-end recruitment platform.

### Core Objectives:
1. **End-to-End Recruitment Lifecycle**: Guide candidates smoothly from sourcing and AI resume ingestion to interview scoring, offer extension, and onboarding placement.
2. **Dual-Mode Operational Architecture**:
   - **Corporate HR Mode**: Tailored for internal company hiring with organizational departments, requisitions, and hiring manager approvals.
   - **Staffing Agency Mode**: Tailored for third-party recruiters with client accounts, billable hourly rates, and candidate client submissions.
3. **Zero Dead Clicks**: Every button, status pill, dropdown, modal, call logger, note-taker, and filter connects to active state mutations and persists across sessions.

---

## 📸 Screenshots

### 1. Talent Acquisition Command Center & Dashboard
![Zoho Recruit Dashboard](/src/assets/images/zoho_recruit_overview_1792819834388.jpg)
*Real-time executive dashboard featuring recruitment stage conversion funnel bar, scheduled interviews queue, active requisition metrics, and recent activity audit stream.*

### 2. Candidate Pipeline Kanban Board & 360° Candidate Dossier
![Candidate Pipeline Kanban](/src/assets/images/zoho_recruit_kanban_1792819851154.jpg)
*Visual multi-stage Kanban board with drag-and-drop column advancement, star ratings, and the 360° candidate slide-over dossier with resume viewer and screening call logs.*

---

## 💼 Primary Use Cases

* **Corporate Talent Acquisition**: Internal HR teams managing headcount approvals, organizing interview panels, logging debrief notes, and issuing formal offer letters.
* **Staffing & Executive Search Agencies**: Recruitment firms managing multiple client accounts, tracking client bill rates, and submitting shortlisted candidates.
* **Hiring Managers & Interviewers**: Panel interviewers conducting structured technical or behavioral assessments and submitting quantitative scorecards.
* **Talent Operations & HR Leadership**: Leaders analyzing recruitment funnel conversion velocity, identifying drop-off stages, and evaluating sourcing channel yield.

---

## 🚀 Step-by-Step User Guide

If you are exploring the application on GitHub or running it locally, here is how you can use each module:

### Step 1: Switch Operating Modes
* Look at the top masthead to toggle between **Corporate HR** and **Staffing Agency** modes.
* Notice how terminology dynamically updates across the app (e.g. *Departments* vs. *Client Accounts*, *Salary Bands* vs. *Bill Rates*).

### Step 2: Manage Job Requisitions
1. Navigate to **Job Openings** in the module navigation.
2. Click **+ New Job Opening** (or **+ Create** in the top bar).
3. Fill in the job title, department/client, salary range, location, and required skill tags.
4. Filter openings by status (*In-progress*, *Filled*, *On-hold*, *Draft*) or click on a job title to view its assigned candidates.

### Step 3: Sourced Candidates & Automated Resume Parsing
1. Open the **Candidates** module.
2. Click **Parse Resume** in the top toolbar.
3. Choose one of the realistic preset resumes (*Staff Full Stack Engineer*, *Lead DevOps Architect*, or *Director of Product*) or paste your own plain text CV.
4. Click **Run Zoho Resume Parser** to automatically extract the candidate's name, email, phone, location, years of experience, education, and skill taxonomy.
5. Select a target job requisition and click **Ingest Candidate into Pipeline**.

### Step 4: Advance Candidates Across the Kanban Funnel
1. Switch between **Kanban** view and **List Grid** view.
2. In the Kanban view, drag candidate cards across columns:
   - `Sourced / Applied` → `Screening` → `Round 1 (Technical)` → `Round 2 (Executive)` → `Offer Extended` → `Hired`.
3. In the List Grid view, select multiple candidates with checkboxes to perform bulk stage updates or export all records to a **CSV** spreadsheet.

### Step 5: Inspect the 360° Candidate Dossier
1. Click on any candidate name or click **View 360°**.
2. Explore the tabs:
   - **Candidate Overview**: Core contact details, verified skills, and screening history.
   - **Resume & Dossier**: Formatted resume summary and parsed text preview.
   - **Recruiter Notes**: Add timestamped interview debriefs and recruiter commentary.
   - **Interviews**: Complete history of past and upcoming rounds with panel evaluations.
3. Click **Log Phone Call** to record candidate screening call outcomes (*Interested*, *Screening Passed*, *Voicemail*).

### Step 6: Conduct Interviews & Submit Evaluation Scorecards
1. Go to the **Interviews & Evaluations** module.
2. Click **Schedule Interview** to set up a round with meeting links and panel interviewers.
3. For completed interviews, click **Evaluate** to open the **Quantitative Scorecard**:
   - Rate candidates 1 to 5 stars on *Technical Mastery*, *Problem Solving*, *Communication*, and *Cultural Fit*.
   - Select an official recommendation: `Strong Hire`, `Hire`, `Hold`, or `Strong No Hire`.
   - Submit the scorecard to log the evaluation to the activity audit trail.

### Step 7: Draft Offers & Finalize Placements
1. Open the **Offers & Placements** module.
2. Click **+ Create Offer Proposal**.
3. Input base salary, target bonus percentage, equity units, target joining date, and special terms.
4. Click **Send Offer**. When the candidate accepts, click **Accepted** to transition their status to `Placed & Hired`.

### Step 8: Inspect Talent Analytics & Reports
1. Navigate to **Analytics & Reports**.
2. View the visual **Recruitment Conversion Funnel** to see drop-off rates from Sourced to Hired.
3. Review **Sourcing Channel Yield** comparing applicant volumes to final hires across LinkedIn, Referrals, and Career Portals.

---

## 🛠️ Prerequisites

Before running the project locally, ensure you have the following installed:

* **Node.js**: `v18.0.0` or higher (recommended: `v20.x` or `v22.x`)
* **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`
* **Modern Web Browser**: Chrome, Edge, Safari, or Firefox with ES2022 support

---

## 💻 Local Installation & Setup

Follow these simple steps to run the application on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/zoho-recruit-clone.git
cd zoho-recruit-clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

The application will start with Vite on **`http://localhost:3000`**. Open this URL in your web browser.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### 5. Run Type Checking & Linter
```bash
npm run lint
```

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | React 19 | Component-driven UI architecture with modern hooks |
| **Language** | TypeScript (v5+) | Strict type safety across all ATS entities and stage flows |
| **Styling** | Tailwind CSS v4 | High-density enterprise layout styling adhering to Zoho design specs |
| **Icons** | Lucide React | Clean, functional enterprise icon library |
| **Build Tool** | Vite | Lightning-fast development server and optimized bundler |
| **State & Persistence** | React Context + LocalStorage | Client-side reactive data store with automatic persistence |
| **Reverse Engineering** | REA Methodology (`morluto/rea`) | Systematic extraction and reconstruction of UI, state, and workflows |

---

## 📦 Data Reset & Demo Data

The application comes pre-loaded with a realistic enterprise dataset:
- **6 Active Job Requisitions** across Engineering, Product, DevOps, Sales, and Design.
- **12+ Realistic Candidates** in various stages of the hiring funnel with full skill tags and contact details.
- **5 Scheduled & Completed Interview Rounds** with evaluation scorecards.
- **Client Accounts & Organizational Departments**.
- **3 Realistic Sample Resumes** ready for the Resume Parser simulator.

> 💡 **Tip:** If you make test edits or delete records, you can instantly restore the system to its initial state by clicking the **Reset Demo Data** button (`↺`) in the top navigation bar.

---

## 📄 License

Distributed under the Apache-2.0 License. See `LICENSE` for more information.
