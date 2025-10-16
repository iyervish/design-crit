# DesignCrit

Get instant, expert-level feedback on any website design—powered by AI.

## What is DesignCrit?

DesignCrit is like having a world-class design critic available 24/7. Just paste a URL or upload a screenshot, and get a comprehensive analysis of your design across 10 critical categories—complete with scores, detailed feedback, and actionable recommendations.

Perfect for:
- **Product designers** seeking objective feedback on their work
- **Design teams** wanting consistent design evaluation criteria
- **Stakeholders** who need to understand design quality
- **Agencies** reviewing client work or competitive analysis

## What You'll Get

Every analysis includes:

### 📊 **Comprehensive Scoring** (10 Categories)
- **Aesthetic Cohesion** - How well your design elements work together
- **Hierarchy & Layout** - Information architecture and visual organization
- **Typography** - Font choices, readability, and type system quality
- **Color & Contrast** - Palette effectiveness and accessibility
- **Imagery & Iconography** - Visual asset quality and consistency
- **Brand Expression** - How well the design reflects brand personality
- **System Consistency** - Design token discipline and reusability
- **Visual Craft & Detail** - Polish, micro-interactions, and attention to detail
- **AI Slop Detection** - Originality vs. generic AI-generated patterns
- **Emotional Resonance** - Memorability and human connection

### 🎯 **Actionable Recommendations**
Get 3 specific, prioritized suggestions to improve your design immediately.

### 🔍 **AI Pattern Detection**
Identifies common AI-generated design patterns like:
- Generic gradient blur orbs
- Overused glassmorphism effects
- Predictable SaaS template layouts
- Common AI color palette combinations
- Default icon libraries without customization

### 📈 **Professional Reports**
Beautiful, shareable reports with score visualizations and detailed rationale for every category.

---

## Example Feedback

Here's what DesignCrit might say about a design:

**Typography Score: 7/10**
> "The use of Space Grotesk creates good readability, but the heading hierarchy could be stronger. Consider increasing the size difference between H1 and H2 elements to establish clearer information architecture. The body text line-height of 1.5 is excellent for readability."

**AI Slop Detection: 8/10 (Highly Original)**
> "The design shows strong originality with custom illustrations and a unique color palette. However, the particle background effect in the hero section is a common AI-generated pattern that could be replaced with something more distinctive."

**Top Recommendations:**
1. Increase heading size contrast by 20-30% to strengthen visual hierarchy
2. Replace particle background with custom branded animations or illustrations
3. Add more white space around CTA buttons to improve visual breathing room

---

## How to Use

### Option 1: Use the Live Demo
The easiest way to try DesignCrit is to use a hosted version (if available). Just open the URL, paste a website link or upload a screenshot, and get instant feedback.

### Option 2: Run It Yourself

Want to run DesignCrit on your own computer? Here's how:

#### What You'll Need
- A computer with [Node.js](https://nodejs.org/) installed (download the LTS version)
- An OpenAI API key ([sign up here](https://platform.openai.com/signup) - you'll need to add payment info, analyses cost ~$0.05-0.10 each)

#### Setup Steps

**1. Get the code**
Download this repository or clone it using Git.

**2. Install dependencies**
Open Terminal (Mac) or Command Prompt (Windows), navigate to the project folder, and run:
\`\`\`bash
npm install
\`\`\`
This downloads all the required libraries. Takes about 1-2 minutes.

**3. Install the browser automation tool**
This lets DesignCrit capture screenshots of websites:
\`\`\`bash
npx playwright install chromium
\`\`\`

**4. Add your OpenAI API key**
Create a file named \`.env\` in the project folder and add:
\`\`\`
OPENAI_API_KEY=sk-your-actual-api-key-here
\`\`\`
(Get your API key from [OpenAI's platform](https://platform.openai.com/api-keys))

**5. Start the app**
\`\`\`bash
npm run dev
\`\`\`

**6. Open in your browser**
Go to [http://localhost:3002](http://localhost:3002)

That's it! You can now analyze any design.

---

## For Developers

### Tech Stack
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS with custom design system
- GPT-4o Vision (OpenAI)
- Playwright for screenshot capture
- Framer Motion for animations

### Deployment to Vercel (Optional)
Want to host DesignCrit online for your team?

1. Push your code to GitHub
2. Sign up for [Vercel](https://vercel.com) (free for personal projects)
3. Connect your GitHub repository
4. Add your \`OPENAI_API_KEY\` in Vercel's environment variables
5. Click Deploy

Vercel will give you a URL like \`your-project.vercel.app\`. You can also add a custom domain in the settings.

---

## How It Works (Behind the Scenes)

1. **You submit a design** - Either paste a URL or upload a screenshot
2. **Screenshot capture** - For URLs, we automatically capture a full-page screenshot
3. **AI analysis** - GPT-4o Vision analyzes the design using a carefully crafted prompt
4. **Results generation** - Scores, feedback, and recommendations are formatted into a beautiful report
5. **You get insights** - View your analysis with detailed breakdowns for each category

The entire process takes 15-30 seconds.

## Customizing the Critique Criteria

Want to adjust what DesignCrit evaluates? The critique prompt is stored in a simple markdown file at:

\`lib/prompts/design-critique.md\`

You can edit:
- Evaluation categories and their descriptions
- Scoring criteria
- AI pattern detection rules
- The tone and style of feedback

No coding required—just edit the text file and your changes take effect immediately!

---

## The Evaluation Framework

DesignCrit evaluates designs using a professional framework that considers:

### Visual Design Principles
- Aesthetics, hierarchy, typography, and color usage
- How well design elements work together as a cohesive system

### System & Craft Quality
- Design token discipline and component consistency
- Attention to detail, micro-interactions, and polish

### Originality & Authenticity
- Detection of generic AI-generated patterns
- Assessment of custom vs. template-based design choices

### Emotional Impact
- Memorability and human connection
- How the design makes users feel

Each category is scored 1-10 with detailed rationale explaining the score.

---

## Use Cases

**Design Reviews**
Get objective feedback before presenting to stakeholders. Identify potential issues early.

**Competitive Analysis**
Analyze competitor websites to understand design quality and find opportunities for differentiation.

**Portfolio Evaluation**
Assess your portfolio pieces with the same rigor a hiring manager might apply.

**Client Education**
Help clients understand design quality with data-backed scoring and clear explanations.

**Design System Audits**
Evaluate consistency and system thinking across your product or website.

---

## Limitations & Notes

- Analysis takes 15-30 seconds depending on complexity
- 10MB file size limit for screenshot uploads
- Costs ~$0.05-0.10 per analysis (OpenAI API fees)
- Results are stored locally (no database by default)

---

## Roadmap

Ideas for future enhancements:

- [ ] **Save & History** - Database integration to save past analyses
- [ ] **Before/After Comparisons** - Track design improvements over time
- [ ] **PDF Export** - Download professional reports to share with clients
- [ ] **Shareable Links** - Send analysis results to teammates and stakeholders
- [ ] **Public Gallery** - Browse community-submitted design critiques
- [ ] **Team Workspaces** - Collaborate with your design team
- [ ] **Custom Rubrics** - Create evaluation frameworks for specific design types
- [ ] **Accessibility Deep Dive** - Enhanced WCAG compliance analysis
- [ ] **Mobile Design Analysis** - Critique mobile app screenshots and responsive designs

---

## Built By

**[Studio Pimmit](https://studiopimmit.com)** - An AI-First Design & Development Consultancy

We help design teams leverage AI to work faster and smarter without sacrificing craft or creativity.

---

## Questions or Feedback?

Have ideas for improving DesignCrit? Want to customize it for your team? Get in touch or open an issue on GitHub.

---

## License

Private - All Rights Reserved
