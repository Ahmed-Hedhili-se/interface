# **App Name**: Cipher Portfolio

## Core Features:

- Home Page: Landing page with links to other sections.
- AI Chat Agent: Connect to the external API (https://ahmed-portfolio-api.onrender.com/ask) for AI interaction with input sanitization, and display the output in a secure terminal-like interface.
- AI Security: Implement input sanitization, rate limiting, and error handling to prevent attacks and ensure stability when communicating with the external AI API; disable send button for 2 seconds to prevent request floods.
- Skills Portfolio: Display hard and soft skills, plus project cards with links to code.
- CV Download: Link to downloadable CV in PDF format.
- Animated Background: Implement a full-screen looping background animation to enhance the cyberpunk aesthetic.
- Interactive Portfolio Assistant: Use a tool to interact with a large language model to answer personalized questions from the user about my experience and projects.

## Style Guidelines:

- Primary color: Rich, deep electric purple (#7c3aed) for vibrant highlights and interactive elements.
- Secondary color: Hot, vibrant magenta pink (#db2777) for a cyberpunk feel.
- Accent color: Bright, glowing royal blue (#2563eb) for contrast and call-to-action elements.
- Body and headline font: 'Space Grotesk' sans-serif font will be used for headlines, with 'Inter' as a fallback font for longer blocks of text.
- Use 'lucide-react' icons, styled with white glows on hover, for navigation and links.
- Employ a glassmorphism effect (semi-transparent with a blur) on all containers to give a floating, futuristic appearance, using `backdrop-filter: blur(12px)`.
- Apply `framer-motion` for smooth page transitions, using fade-in and slide-up animations. Add animated typing effect in the Hero section.