# Developer Log

## Day 1 — 06-05-2026
**Hours worked:** 9–10  

### What I did:
- Set up the Next.js project and initialized the GitHub repository
- Structured the project using App Router and created a dedicated `/audit-form` route
- Built the complete audit form UI using React and Tailwind CSS
- Implemented centralized state management using a single `auditInput` object
- Added dynamic plan selection based on the selected AI tool (ChatGPT, Claude, Copilot, Gemini, Cursor, etc.)
- Improved UX by resetting plan selections whenever the selected tool changes
- Added validation for required fields before form submission
- Implemented localStorage persistence to retain form data across reloads
- Researched and documented pricing models for major AI platforms
- Built the initial audit engine in a separate `auditEngine.js` module
- Structured pricing data and implemented recommendation logic for:
  - overpayment detection
  - plan vs team-size mismatch
  - tool vs use-case mismatch
- Connected the audit engine with the frontend form
- Displayed audit recommendations, estimated savings, and reasoning dynamically in the UI

### What I learned:
- Better understanding of controlled forms and scalable state management in React
- How to separate UI logic from business logic using reusable modules
- Importance of structuring pricing and recommendation systems cleanly
- How dynamic rendering improves UX and product usability
- How rule-based logic can simulate practical decision-making systems

### Blockers / what I'm stuck on:
- How to make the audit logic more adaptive instead of purely rule-based
- Thinking about how to improve the visual presentation of audit results
- Exploring ways to generate smarter AI-driven summaries

### Plan for next day:
- Improve results UI and overall product design
- Add AI-generated recommendation summaries
- Refine responsiveness and user experience
- Continue polishing the product flow

--------


## Day 2 — 07-05-2026
**Hours worked:** 7–8  

### What I did:
- Created a dedicated SaaS-style landing page for the homepage (`/`)
- Structured the homepage into:
  - hero section
  - stats section
  - feature cards
  - CTA section
  - footer
- Connected navigation flow between landing page and `/audit-form`
- Designed the landing page using Tailwind CSS with:
  - dark gradient theme
  - emerald accent palette
  - glassmorphism cards
  - glow background effects
  - hover animations
  - responsive layouts
- Added smooth scrolling navigation for the “View Features” button
- Improved spacing and section alignment for better user experience
- Refined product messaging and feature descriptions to sound more product-oriented
- Enhanced typography hierarchy and overall visual consistency
- Added hover interactions and scaling animations for cards and CTA buttons
- Fixed UI alignment issues in stats cards and feature sections
- Improved responsiveness for desktop and mobile layouts
- Polished the overall frontend aesthetics and product presentation

### What I learned:
- How landing pages improve product positioning and first impressions
- Better understanding of visual hierarchy, spacing, and UI consistency
- How modern SaaS products use gradients, glassmorphism, and subtle animations
- Importance of balancing aesthetics with usability
- How small UI refinements significantly improve frontend quality

### Blockers / what I'm stuck on:
- Thinking about redesigning the audit form page to visually match the landing page
- Exploring better ways to display audit recommendations and results
- Considering adding charts or analytics visualizations for better insights
- Thinking about integrating real AI-generated recommendations in future iterations

### Plan for next day:
- Redesign the audit form page with a more premium UI
- Improve input styling and results cards
- Enhance loading animations and responsiveness
- Explore OpenAI API integration and deployment workflow


---------


## Day 3 — 08-05-2026
**Hours worked:** 7–8  

### What I did:
- Redesigned the audit form UI with a cleaner glassmorphism-based layout
- Improved overall visual hierarchy, spacing, and responsiveness using Tailwind CSS
- Added support for auditing multiple AI tools within a single workflow
- Implemented dynamic add/remove tool functionality
- Created reusable multi-tool state management using arrays and indexed updates
- Added dynamic AI tool detail cards with platform-specific branding colors
- Improved loading state UI with animated spinner and better feedback messaging
- Enhanced audit result cards with improved typography and layout structure
- Refactored form structure for better scalability and maintainability
- Added persistent localStorage support for multi-tool audit data
- Improved transition animations and hover interactions across the UI
- Continued refining the audit workflow and user experience
- Updated project documentation including README structure and feature documentation

### What I learned:
- Better understanding of scalable state management for dynamic form arrays in React
- How to manage multiple controlled form sections efficiently
- Improved understanding of reusable UI patterns and component structuring
- Learned how better visual hierarchy improves usability and readability
- Gained more experience designing SaaS-style dashboard interfaces

### Blockers / what I'm stuck on:
- Thinking about how to make audit recommendations more intelligent across multiple tools
- Exploring comparative analysis between overlapping AI subscriptions
- Considering adding charts and analytics for better audit visualization
- Planning ways to suggest optimized alternative plans dynamically

### Plan for next day:
- Add smarter multi-tool audit recommendation logic
- Build comparative breakdown cards for each AI tool
- Add suggested alternative plans and optimization insights
- Start implementing charts and analytics visualizations
- Continue improving responsiveness and overall UI polish

-------

## Day 4 — 9-05-2026
**Hours worked:** 6-7 

### What I did:
- Upgraded the audit engine from single-tool analysis to complete AI stack analysis
- Refactored the audit engine to support multiple tools dynamically using array-based analysis
- Added centralized pricing architecture for ChatGPT, Claude, Gemini, Copilot, and Cursor
- Added detailed pricing metadata including:
  - pricing
  - ideal users
  - workflow suitability
  - subscription type
- Implemented optimization scoring system (`score / 100`)
- Added overpayment detection logic based on expected vs actual spending
- Added duplicate workflow detection for overlapping AI subscriptions
- Added intelligent tool recommendation logic:
  - ChatGPT → Cursor/Copilot for coding workflows
  - Copilot → ChatGPT for writing workflows
- Added strengths and issues analysis system
- Added total spend and estimated savings calculations
- Improved recommendation and reasoning generation logic
- Refactored summary generation for multi-tool AI stack analysis
- Added optimization score card in the results UI
- Added issue cards and strengths cards in the audit results section
- Added suggested alternative tool section
- Added dynamic score coloring based on optimization score
- Fixed major bugs related to:
  - `tools.forEach is not a function`
  - incorrect data passed into audit functions
  - duplicate `useEffect` hooks
  - LocalStorage parsing and rendering issues
- Improved overall audit flow and product experience

### What I learned:
- How to build scalable rule-based recommendation systems
- Better understanding of multi-tool SaaS analysis logic
- Importance of separating business logic from UI components
- How scoring systems improve SaaS product experience
- Better debugging strategies for React state and rendering issues
- How centralized pricing architecture improves maintainability

### Blockers / what I'm stuck on:
- Thinking about integrating OpenAI API for smarter recommendations
- Exploring analytics dashboards and visual spend insights
- Considering adding exportable audit reports
- Thinking about improving audit intelligence beyond rule-based logic
- Exploring deployment and production-readiness improvements

### Plan for next day:
- Add analytics dashboard cards
- Add spend visualization and charts
- Improve audit result UI consistency
- Add export/report generation feature
- Prepare application for deployment
- Continue aligning the project with company brief requirements

--------

## Day 5 — 10-05-2026
**Hours worked:** 7-8

### What I did:
- Rewrote the audit engine from scratch with a cleaner, more defensible architecture
- Refactored `calculateAudit` to return a per-tool `toolResults` array instead of a single merged recommendation
- Added three audit checks per tool:
  - overpayment detection (actual spend vs official pricing)
  - plan downgrade opportunities based on team size and use case
  - wrong-tool-for-use-case detection with alternative suggestions
- Fixed a critical bug where `suggestedPlan` was used without being declared, causing silent crashes
- Updated pricing data with corrected figures:
  - Claude Team corrected to $30/user/mo
  - Cursor Pro+ corrected to $60/mo
- Added `annualSavings` calculation (`totalSavings × 12`) to audit result
- Added `overlapWarning` for users running multiple tools with the same use case
- Replaced `generateSummary` with `generateFallbackSummary` for cleaner fallback handling
- Rewrote the results UI to loop over `toolResults` and show one card per tool with:
  - current spend
  - recommendation
  - reason
  - issues
  - strengths
- Fixed duplicate Optimization Score card appearing twice in results
- Added Credex CTA banner that appears only when total savings exceed $500/mo
- Added annual savings display alongside monthly savings in the hero stats
- Upgraded `handleSubmit` to `async` and wired it to the Anthropic API with try/catch fallback
- Created `app/api/summary/route.js` for AI-generated summaries via Anthropic API
- Set up Supabase as the backend database:
  - created `audits` table with RLS policies
  - created `lib/supabase.js` as the shared client
- Built `app/api/save-audit/route.js` to save audit results, tools, summary, and lead data
- Built lead capture form that appears after results — collects email, company name, and role
- Implemented shareable audit URLs — each audit saved with a UUID at `/audit/[id]`
- Built `app/audit/[id]/page.js` as a public server-rendered shareable page
- Added Open Graph and Twitter card metadata to shareable page for clean link previews
- Fixed Next.js 15 `params` async issue in both `generateMetadata` and `SharedAuditPage`
- Added all Supabase environment variables to Vercel and redeployed successfully

### What I learned:
- How to structure a rule-based audit engine with per-item breakdowns instead of a single merged result
- How to set up Supabase with RLS policies for a public-facing tool with no login required
- How Next.js 15 changed `params` to a Promise — must be awaited in server components
- How Vercel requires environment variables to be added separately from `.env.local`
- Importance of testing the full user flow end-to-end in incognito to catch rendering issues
- How Open Graph metadata enables clean link previews for shareable URLs

### Blockers / what I'm stuck on:
- Anthropic API credits not yet received — AI summary currently using fallback template
- Transactional email confirmation after lead capture not yet implemented

### Plan for next day:
- Set up Resend for transactional email on lead capture
- Write 5 audit engine tests and TESTS.md
- Set up GitHub Actions CI workflow
- Start writing PRICING_DATA.md with cited vendor URLs
- Begin GTM.md and ECONOMICS.md entrepreneurial files

-------

## Day 6 — 10-05-2026
**Hours worked:** 0

### Reason: 
- I had my semester final exam due to which I couldn't work on the project. 

--------

## Day 7 — 13-05-2026
**Hours worked:** 6-7

### What I did:
- Debugged the Notify Me button on the "Spending Well" CTA — the original `onClick` only fired an `alert` and never called any API, so no email or audit was ever saved
- Wired Notify Me to reuse the existing lead capture pipeline by calling `handleLeadSubmit` so it saves the audit and triggers the transactional email
- Restored the Tailwind `className` on the Notify Me button after an earlier refactor stripped its styling
- Set up Resend for transactional email on lead capture:
  - installed `resend` and created `app/api/send-email/route.js` as a standalone endpoint
  - inlined the Resend call directly into `/api/save-audit` after discovering the inter-route fetch pattern fails on serverless
  - added `RESEND_API_KEY` to `.env.local` and verified it loads on dev server restart
- Tested email delivery end-to-end — first sends showed status 200 in Resend logs but never arrived; root cause was Resend's sandbox restriction on `onboarding@resend.dev`
- Confirmed email pipeline works after testing with the Resend-registered email address
- Fixed multiple smaller bugs in `app/audit-form/page.js`:
  - removed direct `window.location.origin` reference in JSX that broke server-side rendering on first paint
  - corrected `tabIndex="-1"` string to `tabIndex={-1}` number for the honeypot field
  - fixed invalid HTML nesting in the empty-state card where `<div>` and `<p>` were placed inside an `<h3>`
  - wrapped `JSON.parse` of `localStorage.getItem("tools")` in try/catch to avoid crashing on corrupted storage
- Attempted to ship a PDF download feature for completed audits using `html2pdf.js`:
  - first version with `display: none` produced blank PDFs because html2canvas cannot render hidden elements
  - second version with `position: absolute; left: -9999px` still produced blank PDFs
  - third version added explicit `color: #000` on every element after realizing `<main className="text-white">` was leaking white text color into the PDF
  - fourth version built the PDF element dynamically and appended it to `document.body` at capture time, fully isolated from Tailwind ancestors
  - capture pipeline ran end-to-end with step-by-step logs confirming each stage, but the real report content still produced a blank PDF
- Decided to remove the PDF feature rather than spend more time debugging — the shareable audit URL already covers the save-and-share use case
- Uninstalled `html2pdf.js` and removed all PDF-related code from `app/audit-form/page.js`

### What I learned:
- Resend's `onboarding@resend.dev` sandbox sender silently drops mail to any address other than the Resend account owner's — the API returns 200 and the dashboard shows "delivered" but the recipient never sees it
- Inter-route `fetch` between Next.js API routes is fragile on Vercel because each route is a separate serverless function, so `new URL(path, request.url)` can resolve incorrectly behind proxies
- `.env.local` is only read at dev server startup, so adding a new variable requires a full restart and not just a file save
- `html2canvas` has many silent failure modes including `display: none`, elements positioned far off-screen, ancestors with Tailwind v4 `oklch()` colors, white-on-white from inherited `color`, and tables with `borderCollapse: collapse` — all producing blank output without console errors
- Pasting API keys into chat or commits is a real risk, so rotated both Supabase anon key and Resend API key after accidentally exposing them during a debugging session
- When a non-critical feature consumes disproportionate time, removing it is a legitimate engineering decision — the shareable URL serves the same purpose without the rendering risk

### Blockers / what I'm stuck on:
- Anthropic API credits still not received — AI summary continues to use the fallback template
- Resend domain verification not yet done — production sends limited to the Resend account email until DNS records are added on a verified domain

### Plan for next day:
- Verify a domain in Resend and update the `from:` address so emails can go to any recipient

-------

### CI / Build Failure Debugging

I encountered a production build failure during GitHub Actions CI while running `next build`.

Error:
`supabaseUrl is required`

The failure happened during the static build step for the dynamic route:
`/audit/[id]`

Root cause:
The Supabase client was being initialized at the top level of `save-audit/route.js` using environment variables:

```js
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);