# Zoho Recruit Enterprise ATS Platform Clone

A high-fidelity, reverse-engineered clone of Zoho Recruit's applicant tracking and recruitment CRM platform. Built according to REA reverse-engineering specifications, it faithfully replicates Zoho Recruit's signature navy enterprise design, modular data architecture, multi-stage visual recruitment pipeline, candidate resume parsing, interview scheduling with structured scorecards, and dual Corporate HR & Staffing Agency operational workflows.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Based on your answers, this build replicates Zoho Recruit's authentic design and deep functionality:
> 1. **Visual Theme**: Authentic Zoho Recruit corporate navy theme (`#0F2537` / `#1B365D`) with crisp borderlines, high-density data tables, and cohesive Zoho branding.
> 2. **Operational Scope**: Dual-mode operational switcher supporting both **Corporate In-House HR** (Internal Requisitions, Departments, Hiring Managers) and **Staffing Agency** (Client Accounts, Billable Rates, Submissions).
> 3. **Deep Interactive Modules**: Full ATS suite including Job Openings, Candidate Database, Interactive Drag-and-Drop / Multi-Stage Kanban Pipeline, One-Click Resume Parser, Interview Evaluation Scorecards, Offer Generator, and Real-time Recruitment Analytics.

- **Confirmed Decision 1**: Authentic Zoho Recruit look-and-feel — Top navigation bar with global search, quick-create `+` modal, module ribbon (Dashboard, Job Openings, Candidates, Interviews, Clients/Departments, Offers, Analytics), and high-density tabular data grids.
- **Confirmed Decision 2**: Deep interactivity with zero dead clicks — Every button (Status Change, Log Call, Send Email, Schedule Interview, Submit Feedback, Parse Resume, Export CSV) connects to active state mutations and persists across sessions via client storage.

---

### 1. Overview & Core Concept

- **What It Does**: Provides a complete, full-featured Applicant Tracking System (ATS) and Recruitment CRM identical to Zoho Recruit. Recruiters and hiring managers can manage requisitions, review candidates, progress applicants across hiring stages in a visual Kanban board, schedule interviews with rating scorecards, generate offer proposals, and inspect funnel metrics.
- **Target Audience / Persona**: In-house talent acquisition teams, HR directors, and third-party staffing recruiters seeking an enterprise-grade recruiting platform.
- **Key Value**: Streamlines the end-to-end recruitment lifecycle from sourcing and resume ingestion to stage evaluations and hiring decisions within an authentic Zoho Recruit user experience.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Job Requisition Management**:
   - Browse job openings via customizable high-density list view or stage-filtered cards.
   - Create new job openings with title, department/client, recruiter, target hire date, salary range, job type, and skill requirements.
   - Inspect job opening detail view with associated candidates, stage progress funnel, and requisition status.
2. **Candidate Pipeline & Kanban Board**:
   - View talent pool across recruitment stages: *Sourced*, *Screening / Shortlisted*, *Interview Round 1*, *Interview Round 2 / Executive*, *Offer Sent*, and *Hired / Rejected*.
   - Drag or click to advance candidates between stages with status progression updates and automatic activity logging.
   - Filter candidates by job opening, source (LinkedIn, Career Portal, Referral, Indeed), skills, and ratings.
3. **Candidate Detail & Resume Parser**:
   - Slide-over candidate 360° record featuring contact details, experience, applied jobs, notes timeline, call logs, and attachments.
   - Integrated **Interactive Resume Parser**: Upload or paste resume text to automatically extract candidate name, contact details, skill tags, and work history directly into the talent pool.
4. **Interview Scheduling & Scorecards**:
   - Schedule structured interview rounds with round type, panel interviewers, date/time, and meeting links.
   - Interviewers submit quantitative criteria scorecards (Technical Mastery, Problem Solving, Communication, Culture Fit) with overall recommendation (*Strong Hire*, *Hire*, *Hold*, *No Hire*).
5. **Staffing vs Corporate Mode**:
   - Instant toggle between Corporate HR terminology (Departments, Hiring Managers, Internal Requisitions) and Staffing Agency terminology (Client Accounts, Bill Rates, Candidate Submissions).

#### Visual Identity & Theme
- **Color Palette & Tokens**:
  - Primary Brand Navy: `#0F2537` / `#162D42` (Zoho top bar and header chrome)
  - Secondary Accent Blue: `#0066CC` / `#1D70B8` (Primary CTAs, active module tabs, stage focus)
  - Canvas Background: `#F8FAFC` (Clean, low-fatigue enterprise gray canvas)
  - Structural Surfaces: `#FFFFFF` with `#E2E8F0` hairline borders
  - Semantic Status Tokens:
    - *Active / Sourced*: `#0284C7` (Sky blue)
    - *Interviewing*: `#7C3AED` (Purple)
    - *Offered / Hired*: `#16A34A` (Emerald green)
    - *On Hold*: `#D97706` (Amber)
    - *Rejected / Closed*: `#DC2626` (Red)
- **Typography & Hierarchy**:
  - Primary UI: `Plus Jakarta Sans` / `DM Sans` for crisp enterprise legibility.
  - Tabular Figures: `tabular-nums font-mono` for salaries, candidate counts, dates, and ratings.
  - Strict anti-slop rules: zero decorative pulsing dots, zero AI slop gradients, zero pill badge sandwiches, clean hairline borders.
- **Component Styling & Layout**:
  - Authentic Zoho Recruit top masthead with Search bar, quick action `+`, help icon, and user badge.
  - Module ribbon with active tab indicator.
  - Toolbar with view toggle (Grid / Kanban / List), filter toggle, column config, and export button.
  - Detail flyout modal with smooth transition for candidate dossier and job cards.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dual Architecture (Corporate HR & Staffing Agency Modes)**
  - *Chosen Approach*: Single unified data store with dynamic vocabulary and relationship mapping (e.g., Client & Bill Rate for Staffing; Department & Hiring Manager for Corporate).
  - *Why*: Allows users to experience both core operational paradigms of Zoho Recruit without maintaining two disjointed applications.
- **Decision 2: State Persistence via Reactive LocalStorage Store**
  - *Chosen Approach*: Robust reactive state management initialized with realistic enterprise seed data (12+ candidates, 6 active job openings, 5 scheduled interviews, client accounts, realistic resumes) and synced to `localStorage`.
  - *Why*: Ensures instant load times, zero configuration friction, and complete persistence of newly created jobs, dragged pipeline stages, and scorecards.
- **Decision 3: Built-in Realistic Resume Parser Simulator**
  - *Chosen Approach*: Multi-input parsing modal allowing preset sample resumes (Senior Full Stack Engineer, Growth Marketing Lead, DevOps Specialist) or custom pasted text, with regex and pattern extraction for candidate metadata.
  - *Why*: Emulates Zoho Recruit's signature resume ingestion capability seamlessly within the browser.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ZOHO RECRUIT CLONE                              │
├────────────────────────────────────────────────────────────────────────┤
│ Top App Header (Brand, Mode Switcher, Global Search, Quick Create (+)) │
├────────────────────────────────────────────────────────────────────────┤
│ Navigation Ribbon (Dashboard | Jobs | Candidates | Interviews | etc.)  │
├────────────────────────────────────────────────────────────────────────┤
│ Contextual Sub-Toolbar (Filters, View Switcher, Bulk Actions, + Item)  │
├────────────────────────────────────────────────────────────────────────┤
│                           VIEWPORT CANVAS                              │
│ ┌──────────────────────┐ ┌───────────────────────────────────────────┐ │
│ │  Kanban / Data Grid  │ │  Detail Drawer / Flyout (360° Dossier)    │ │
│ │  - Stage Columns     │ │  - Stage Progression, Resume Viewer       │ │
│ │  - Candidate Cards   │ │  - Activity Stream, Interview Scorecards  │ │
│ │  - Drag & Drop / Move│ │  - Quick Actions (Email, Call, Schedule)  │ │
│ └──────────────────────┘ └───────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ Modular Modals: Quick Create Requisition / Candidate, Resume Parser,   │
│                 Interview Scheduler, Scorecard Form, Offer Letter      │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities
- **JobOpening**: `id`, `title`, `clientOrDepartment`, `hiringManager`, `type`, `location`, `status`, `targetDate`, `salaryMin`, `salaryMax`, `skills`, `description`, `candidatesCount`.
- **Candidate**: `id`, `name`, `email`, `phone`, `currentRole`, `company`, `experienceYears`, `jobId`, `stage`, `rating`, `source`, `skills`, `resumeText`, `notes`, `appliedDate`.
- **Interview**: `id`, `candidateId`, `jobId`, `roundName`, `scheduledDate`, `time`, `interviewers`, `type`, `status`, `scorecard`.
- **Scorecard**: `interviewId`, `technicalRating`, `problemSolvingRating`, `communicationRating`, `cultureRating`, `feedback`, `recommendation`.
- **Offer**: `id`, `candidateId`, `jobId`, `offeredSalary`, `startDate`, `status`, `terms`.

---

### 5. Step-by-Step Implementation Strategy

1. **Step 1: Configuration & Metadata**
   - Update `metadata.json` with official name "Zoho Recruit - Talent Acquisition & ATS Platform" and description.
   - Update `index.html` with appropriate title and Google fonts (`Plus Jakarta Sans`).
2. **Step 2: Domain Store & Seed Data Engine (`src/types/recruit.ts` & `src/data/seedData.ts`)**
   - Define comprehensive TypeScript models for jobs, candidates, stages, interviews, scorecards, offers, clients, and activity logs.
   - Build seed dataset with realistic enterprise candidate profiles, job requisitions across engineering, product, and sales, and sample resumes.
3. **Step 3: Core UI Chrome & Navigation (`src/components/layout/`)**
   - Implement Zoho Recruit Top Header with Global Search, Mode Switcher (Corporate HR vs Agency), Quick Create dropdown, and user profile.
   - Implement Module Navigation Bar (Dashboard, Job Openings, Candidates, Interviews, Clients/Departments, Offers, Analytics).
4. **Step 4: Module Views (`src/components/modules/`)**
   - **Dashboard**: Executive recruiting cockpit with pipeline metrics, time-to-hire, active openings, interview schedule widget, and recent activities.
   - **Job Openings**: High-density table view with status filters, candidate counts, and requisition creation.
   - **Candidates**: Dual view — High-density Data Grid and Multi-Stage Kanban Board with drag-and-drop / column advancement.
   - **Interviews & Scorecards**: Schedule viewer, calendar/list toggle, and interactive scorecard evaluation submission modal.
   - **Clients / Departments**: Relationship directory for agency client accounts or internal corporate departments.
   - **Offers & Placements**: Offer letter tracker and status management.
   - **Analytics & Reports**: Visual recruitment conversion funnel, source effectiveness, and hiring velocity.
5. **Step 5: Interactive Features & Modals (`src/components/modals/`)**
   - **Quick Create Requisition Modal**: Detailed multi-field requisition form.
   - **Quick Add Candidate & Resume Parser Modal**: Paste resume or upload to auto-extract fields.
   - **Candidate 360° Detail Slide-over**: Complete dossier with resume text preview, stage progression stepper, call logs, and notes.
   - **Schedule Interview & Submit Scorecard Modals**.
6. **Step 6: Verification & Compilation**
   - Run `compile_applet` and verify zero TypeScript or layout errors.
