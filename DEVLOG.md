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
