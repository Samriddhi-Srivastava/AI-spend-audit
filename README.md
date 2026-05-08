# AI Spend Auditor

AI Spend Auditor is a modern SaaS-style web application that helps users analyze and optimize their AI subscription spending across platforms like ChatGPT, Claude, Gemini, Copilot, and Cursor.

Built using Next.js, React, and Tailwind CSS, the application provides intelligent cost-saving recommendations, multi-tool audit analysis, and a premium user experience focused on AI subscription optimization.

---

## Features

- Multi-tool AI subscription auditing
- Dynamic plan selection for major AI platforms
- Cost optimization recommendations
- Estimated savings calculation
- Personalized AI usage insights
- Multi-platform support:
  - ChatGPT
  - Claude
  - Gemini
  - Copilot
  - Cursor
- Responsive SaaS-style glassmorphism UI
- Interactive landing page
- Dynamic audit summaries
- Add/remove tool workflow
- LocalStorage persistence
- Loading states and smooth UX

---

## Tech Stack

- Next.js 15
- React.js
- Tailwind CSS
- JavaScript
- LocalStorage API

---

## Project Structure

```bash
app/
 ├── page.js                    # Landing page
 ├── audit-form/
 │    └── page.js               # Multi-tool audit form page

lib/
 └── auditEngine.js             # Audit recommendation logic

public/
```

---

## How It Works

1. Users select one or multiple AI platforms and subscription plans
2. Users enter:
   - monthly spending
   - number of users
   - primary use case
3. The audit engine analyzes:
   - pricing efficiency
   - plan suitability
   - team-size compatibility
   - tool overlap opportunities
4. The application generates:
   - optimization recommendations
   - estimated savings
   - AI-style summaries
   - spending insights

---

## Installation

Clone the repository:

```bash
git clone <your-repository-link>
```

Navigate into the project:

```bash
cd ai-spend-auditor
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Future Improvements

- Smarter multi-tool recommendation engine
- AI-generated optimization insights
- Analytics dashboard and charts
- Exportable audit reports
- Authentication and user accounts
- Real-time pricing updates
- Team collaboration support
- Cloud database integration

---

## Developer Log

Development progress and daily updates are documented inside:

```bash
DEVLOG.md
```

---

## Author

Built by Samriddhi Srivastava
````

````