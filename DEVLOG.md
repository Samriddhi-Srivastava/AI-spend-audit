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

### Blockers / what I’m thinking about:
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

### Blockers / what I’m thinking about:
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


## Day 3 — 09-05-2026
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

### Blockers / what I’m thinking about:
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