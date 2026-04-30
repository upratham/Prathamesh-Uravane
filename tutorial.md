# Portfolio Digital Twin Tutorial

This file explains how the portfolio works, how the code is organized, and how the AI chat was added. It is written for a beginner who wants to understand the project from top to bottom.

## 1. What This Project Is

This is a personal portfolio website for Prathamesh Uravane.

The site has three main goals:

1. Present the portfolio in a polished, modern way.
2. Show career information such as education, experience, projects, and skills.
3. Let visitors talk to a Groq-powered AI chat called the Digital Twin, which answers questions about the career profile.

The app is built with Next.js, React, TypeScript, Tailwind CSS v4, Framer Motion, and Groq.

## 2. Project Structure

The most important files and folders are:

- `app/layout.tsx` - the root layout, metadata, and fonts.
- `app/page.tsx` - the main homepage that assembles every section.
- `app/api/digital-twin/route.ts` - the server endpoint that talks to Groq.
- `app/globals.css` - global styling, colors, animations, and utility classes.
- `components/` - reusable UI sections like Hero, About, Projects, and the chat widget.
- `lib/digitalTwin.ts` - shared career facts and the system prompt for the AI.
- `tutorial.md` - this guide.

## 3. How The Site Is Built

The site uses a common Next.js App Router pattern:

1. `layout.tsx` defines the overall HTML document.
2. `page.tsx` composes the homepage sections.
3. Each section lives in its own component inside `components/`.
4. The digital twin chat sends messages to a server API route.
5. The API route calls Groq and returns the answer to the browser.

This separation keeps the app easier to read and maintain.

## 4. Root Layout

File: `app/layout.tsx`

This file wraps the whole site.

It does three important things:

1. Loads the Geist and Geist Mono fonts with `next/font/google`.
2. Sets the page metadata such as title, description, and keywords.
3. Applies the font variables to the `<html>` element.

The layout file is also where the site-wide `<body>` element is created.

## 5. Global Styling

File: `app/globals.css`

This file defines the visual system of the portfolio.

It includes:

- The dark background and foreground colors.
- Accent colors like cyan and violet.
- Shared helper classes such as `.glass-card`, `.gradient-text`, `.grid-bg`, and `.section-label`.
- Animations like floating orbs, shimmer text, and glow effects.

It also sets `scroll-behavior: smooth`, which makes section links feel polished when users click navigation items.

## 6. Main Homepage

File: `app/page.tsx`

This is the entry page for the portfolio.

It imports and places all major sections in order:

1. Navigation bar
2. Hero section
3. About section
4. Experience section
5. Projects section
6. Skills section
7. Education section
8. Digital Twin chat
9. Contact section

This file is intentionally simple. It does not hold the detailed content itself. Instead, it acts like a page composer.

### Why This Matters

Keeping the page file small makes the app easier to change. If you want to redesign the projects section later, you only edit the project component rather than the whole homepage.

## 7. Navigation

File: `components/Nav.tsx`

The navigation bar is a client component because it needs browser behavior such as:

- Tracking scroll position.
- Opening and closing the mobile menu.

The nav contains links to every section on the page using anchor IDs such as `#about`, `#projects`, and `#digital-twin`.

It also contains the email action, which now opens a browser-safe compose flow instead of relying on a plain `mailto:` link.

## 8. Hero Section

File: `components/Hero.tsx`

The Hero section is the first thing people see.

It includes:

- The name and title.
- A short introduction.
- Buttons to jump to key sections.
- Social icons.
- Stat cards showing highlights like GPA and publications.

The animations come from Framer Motion. They make the page feel alive without requiring complex code.

## 9. About, Experience, Projects, Skills, and Education

These components follow the same general pattern:

1. A section heading.
2. Structured data arrays near the top of the file.
3. A loop that renders cards or bullet lists from that data.
4. Motion animation for entrance effects.

### About

File: `components/About.tsx`

Explains the background, working style, and technical strengths.

### Experience

File: `components/Experience.tsx`

Shows a career timeline with roles, organizations, locations, dates, and bullet points.

### Projects

File: `components/Projects.tsx`

Shows major portfolio projects with descriptions, highlights, technologies, and links.

### Skills

File: `components/Skills.tsx`

Shows skill groups and progress bars, plus a broader tool list.

### Education

File: `components/Education.tsx`

Shows education history, publications, and certifications.

## 10. Shared Career Data

File: `lib/digitalTwin.ts`

This file stores the facts that the AI chat is allowed to use.

It includes:

- Name and role.
- Location.
- Education.
- Summary.
- Highlights.
- Tools and stack.
- Contact details.
- Example suggested questions.

It also defines the system prompt for the AI.

### Why This File Exists

Instead of hardcoding career facts in the chat UI and the API separately, this file provides a single source of truth.

That means if you update a project or email address later, you can change it in one place.

## 11. The Digital Twin Chat

This is the most interesting part of the app.

There are three pieces involved:

1. `components/DigitalTwinChat.tsx` - the interactive chat UI.
2. `components/DigitalTwinChatClient.tsx` - a client-only wrapper that avoids hydration mismatch problems.
3. `app/api/digital-twin/route.ts` - the backend route that talks to Groq.

### 11.1 Chat UI

File: `components/DigitalTwinChat.tsx`

This component renders the modern chat widget.

It contains:

- A summary panel explaining what the Digital Twin knows.
- Suggested prompt buttons.
- A scrollable message window.
- A textarea for new prompts.
- A send button.
- Loading and error states.

When the user sends a message, the component:

1. Adds the user message to the local chat state.
2. Sends the full conversation to the API route.
3. Waits for the reply.
4. Displays the assistant response.

### 11.2 Client-Only Wrapper

File: `components/DigitalTwinChatClient.tsx`

This file prevents the chat from rendering on the server.

Why this helps:

- Some browser extensions can alter form fields like textareas before React hydrates.
- That can create hydration mismatch warnings.
- By waiting until the component mounts in the browser, the page avoids that issue.

### 11.3 API Route

File: `app/api/digital-twin/route.ts`

This is the server-side function that sends a request to Groq.

What it does:

1. Reads the `GROQ_API_KEY`.
2. Falls back to the root `.env` file if needed.
3. Builds a chat request using the `openai/gpt-oss-120b` model.
4. Sends the system prompt plus the user conversation to Groq.
5. Returns the assistant reply to the frontend.

The route is marked as `nodejs` runtime because it reads from the filesystem as a fallback.

## 12. Why The AI Answers Stay On Topic

The Digital Twin is constrained by the system prompt in `lib/digitalTwin.ts`.

That prompt tells the model to:

- Speak in first person as Prathamesh.
- Answer only from the portfolio facts.
- Stay concise and professional.
- Admit when something is not covered.

This is important because a chat assistant should be useful and grounded, not imaginative about career details.

## 13. Email Handling

File: `components/EmailAction.tsx`

The site uses a shared email action component instead of plain `mailto:` links.

This was done because email links can behave inconsistently across browsers and environments.

The component:

1. Opens a reliable web compose URL.
2. Copies the email address to the clipboard as a backup.
3. Still behaves like a normal link in the UI.

This component is reused in the nav, hero, contact section, and chat panel.

## 14. Styling Approach

The design is intentionally dark, futuristic, and glass-like.

Key ideas:

- Use `glass-card` panels for depth.
- Use `gradient-text` for emphasis.
- Use motion for entrance animation and floating atmosphere.
- Keep spacing generous so the site feels premium.

This style is defined mostly in `app/globals.css` and applied throughout the components with utility classes and inline accent colors.

## 15. Data Flow Summary

Here is the simplest way to think about the app flow:

1. The browser loads the homepage.
2. `app/page.tsx` renders all the sections.
3. The user opens the Digital Twin chat.
4. The chat sends the message to `/api/digital-twin`.
5. The API route sends the request to Groq.
6. Groq returns a reply.
7. The frontend shows the response in the chat window.

## 16. How To Extend The Project

If you are a beginner and want to add more features, here are safe improvements:

1. Add more projects to the `projects` array.
2. Update the career facts in `lib/digitalTwin.ts`.
3. Add another section component and import it into `app/page.tsx`.
4. Change the chat prompt style in `DigitalTwinChat.tsx`.
5. Adjust colors or spacing in `app/globals.css`.

## 17. Deployment Notes

The app is ready for Vercel deployment.

Important points:

- The root folder for deployment should be `portfolio`.
- The API route expects `GROQ_API_KEY` to be available in the environment.
- The code has already been built successfully with `npm run build`.

## 18. Final Beginner Advice

If you are new to codebases like this, start by reading in this order:

1. `app/layout.tsx`
2. `app/page.tsx`
3. `components/Hero.tsx`
4. `components/DigitalTwinChat.tsx`
5. `app/api/digital-twin/route.ts`
6. `lib/digitalTwin.ts`

That order helps you understand both the visible website and the invisible server logic.

The main idea behind the project is simple:

- React components render the UI.
- Next.js connects the UI to server routes.
- Groq powers the AI conversation.
- Shared data keeps everything consistent.
