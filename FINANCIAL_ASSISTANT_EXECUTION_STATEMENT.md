# FINANCIAL_ASSISTANT_EXECUTION_STATEMENT.md

How to Direct Copilot for the Financial Assistant Roadmap
Paste the following statement to Copilot to work through the FINANCIAL_ASSISTANT_ROADMAP.md, one step at a time, with all standards and test data requirements:

---

\*\*"Let's work on the next unchecked item (only that one) on the FINANCIAL_ASSISTANT_ROADMAP.md.

When implementing new features, avoid duplicating code (such as components or hook logic) and never call React hooks (like useState, useEffect, etc.) outside of function components or custom hooks. Duplicating code or misusing hooks can cause errors such as 'Invalid hook call' or 'return outside of function'. Always review and refactor existing code before adding new logic, and ensure only one export per file.

Before starting, confirm with me that you are working on the correct item. After implementing a feature, update or add realistic test data for a ~$60k/year household (if necessary). Maintain modular design: place new code in the most logical location in the codebase, and ensure new features or UI elements are user-friendly and fit the navigation structure. If a feature does not fit an existing page, create a new one as needed. Do all of this for me, keep everything according to the critical implementation instructions and Quality Standards in the roadmap. Do not stop to ask what I want to do—just do what is appropriate for that step. Match the theme and complexity of the existing app. Style and polish each feature as you build it, including dark/light theme support.

After making changes, always run the build process (npm run build) before testing new features. If you install new dependencies, run npm install before building. After confirming the feature is complete and tests pass, mark it complete on the roadmap."\*\*

---

Copilot will check off each item as it is completed, following all standards and updating test data as needed.
Always run the build process (npm run build) after making changes and before testing new features in the app.
Deployments are handled automatically by Vercel when changes are pushed to the main branch on GitHub.
