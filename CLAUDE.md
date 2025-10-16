# DesignCrit - Project Architecture & Development Guide

## Project Overview

DesignCrit is an AI-powered design critique tool that provides expert-level analysis of website designs. It accepts either a URL (which it screenshots) or a direct image upload, analyzes the design using GPT-4o, and generates comprehensive reports scoring the design across 10 different categories.

**Key Value Proposition**: Convert design expertise into AI-powered evaluation with actionable recommendations and AI pattern detection.

---

## Technology Stack

### Core Framework
- **Next.js 15** (App Router) - React framework with server/client components
- **React 19** - UI component library
- **TypeScript 5** - Type-safe development (strict mode enabled)

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11** - Animation library
- **Heroicons 2.2** - Icon library

### AI & Processing
- **OpenAI GPT-4o** - Vision and text analysis (requires `OPENAI_API_KEY` env var)
- **Playwright 1.50** - Browser automation for screenshot capture (requires chromium)

### Utilities
- **clsx 2.1** - Conditional class name utility
- **tailwind-merge 2.2** - Merges Tailwind classes intelligently (prevents conflicts)

### Development
- **ESLint 9** - Code linting (extends Next.js defaults)
- **PostCSS 8.4** - CSS processing with Autoprefixer

---

## Project Structure

```
design-crit/
├── app/                           # Next.js App Router directory
│   ├── api/
│   │   └── analyze/route.ts       # POST endpoint for design analysis
│   ├── results/[id]/page.tsx      # Dynamic results page (shows analysis)
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Home page (input interface)
│   └── globals.css                # Global styles & typography
│
├── components/                    # Reusable React components
│   ├── OverallScore.tsx           # Circular progress visualization for overall score
│   └── ScoreCard.tsx              # Category score card with mini-circle progress
│
├── lib/                           # Shared utilities & business logic
│   ├── analyze.ts                 # GPT-4o analysis orchestration
│   ├── screenshot.ts              # Playwright screenshot capture utilities
│   ├── types.ts                   # TypeScript interfaces (AnalysisResult, etc.)
│   ├── utils.ts                   # Helper functions (cn, formatDate, getScoreColor, etc.)
│   └── prompts/
│       └── design-critique.md     # AI critique prompt (categories, scoring, instructions)
│
├── public/
│   ├── results/                   # Saved analysis JSON files (auto-created)
│   └── screenshots/               # Captured screenshots (auto-created)
│
├── Configuration Files
│   ├── tsconfig.json              # TypeScript configuration (strict mode, path aliases @/*)
│   ├── tailwind.config.ts         # Design system tokens (colors, fonts, shadows, animations)
│   ├── next.config.js             # Next.js config (React strict mode enabled)
│   ├── postcss.config.js          # PostCSS configuration
│   ├── .eslintrc.json             # ESLint configuration
│   └── vercel.json                # Vercel deployment config
│
├── package.json                   # Dependencies & scripts
├── .env.example                   # Environment variables template
└── README.md                      # Project documentation
```

---

## Core Architecture & Data Flow

### 1. Input Flow (Home Page)
**File**: `app/page.tsx` (Client Component)

- **Input Options**: 
  - URL input with validation
  - File upload with drag-and-drop (10MB limit, image only)
- **State Management**: 
  - `inputType` (url | screenshot)
  - `url`, `screenshot` (user input)
  - `isLoading`, `error` (UI state)
- **Form Submission**:
  - Validates input
  - Sends FormData to `/api/analyze`
  - Redirects to `/results/[id]` on success

### 2. Analysis Endpoint
**File**: `app/api/analyze/route.ts` (Server Route)

**Request Flow**:
1. Parse FormData from request
2. For URL input:
   - Validate URL format
   - Call `captureScreenshot(url)` → Playwright browser automation
   - Convert screenshot buffer to base64
3. For screenshot upload:
   - Validate file is an image
   - Convert File to ArrayBuffer → base64
4. Call `analyzeDesign(imageBase64, type, sourceValue)` → OpenAI API
5. Generate unique ID (hex from randomBytes)
6. Save results JSON to `public/results/[id].json`
7. Save screenshot PNG to `public/screenshots/[id].png`
8. Return `{ id, success: true }`

**Environment**: 
- `runtime: 'nodejs'` (required for Playwright)
- `maxDuration: 60` (Vercel timeout)

### 3. AI Analysis
**Files**:
- `lib/analyze.ts` - Analysis orchestration
- `lib/prompts/design-critique.md` - **Critique prompt (easy to edit!)**

**Process**:
1. Initialize OpenAI client with `OPENAI_API_KEY`
2. Load critique prompt from `design-critique.md` file
3. Create message with:
   - Image URL (base64 data URL)
   - Loaded prompt text
4. Call `gpt-4o` with:
   - `response_format: { type: 'json_object' }` (enforces JSON output)
   - `max_tokens: 4096`
   - `temperature: 0.7`
5. Parse JSON response
6. Add metadata (timestamp, sourceType, sourceValue)
7. Return `AnalysisResult` object

**Analysis Categories** (10 total):
- Aesthetic Cohesion
- Hierarchy & Layout
- Typography
- Color & Contrast
- Imagery & Iconography
- Brand Expression
- System Consistency
- Visual Craft & Detail
- AI Slop Indicators (inverse scoring: 1 = heavy slop, 10 = original)
- Emotional Resonance

**💡 To modify the critique logic**: Edit `lib/prompts/design-critique.md` directly

### 4. Results Display
**File**: `app/results/[id]/page.tsx` (Client Component)

**Data Loading**:
- Fetch `/results/[id].json` on mount
- Parse `AnalysisResult` object
- Display with Framer Motion animations (staggered)

**Sections**:
1. Meta header (source info, timestamp, screenshot thumbnail)
2. Overall score (circular progress visualization)
3. Key recommendations (top 3 refinements)
4. Executive summary
5. Category scores (2-column grid)
6. AI pattern detection (with originality score)

---

## Design System & Styling

### Typography
- **Sans**: Space Grotesk (body text)
- **Heading**: Playfair Display (headings)
- **Mono**: JetBrains Mono (code/technical)

### Color Palette
```typescript
// Primary Brand Color
primary: #e07a5f (coral)
  - hover: #cc6e55
  - dark: #b8624d
  - light: #f5d5cd
  - 50: #fef6f4

// Accent Color
accent: #81b29a (sage)
  - hover: #6fa389
  - dark: #5e9278
  - light: #d4e8df
  - 50: #f2f9f6

// Semantic Colors
success: #10B981
warning: #F59E0B
error: #EF4444

// Text
text.DEFAULT: #0b0b0c
text.muted: #6b7280

// Background
background.DEFAULT: #ffffff
background.light: #fafafa
background.dark: #f5f5f5
```

### CSS Components (Global)
- `.heading-xl`, `.heading-lg`, `.heading-md`, `.heading-sm` - Typography classes
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button styles
- `.card`, `.card-hover` - Card components
- `.glass-panel` - Glassmorphism effect
- `.container` - Max-width wrapper
- `.section`, `.section-spacious` - Vertical spacing

### Shadows & Effects
- `shadow-subtle` - Light shadow (2px blur)
- `shadow-card` - Medium shadow (4px blur)
- `shadow-elevated` - Heavy shadow (8px blur)
- `shadow-float` - Extra heavy shadow (12px blur)
- `shadow-glow-primary` - Coral glow
- `shadow-glow-accent` - Sage glow

### Animations
- `animation-float` - 6s vertical floating motion
- `animation-pulse-slow` - 4s slow pulse
- Custom Framer Motion variants (staggered, fade-in animations)

---

## Key Conventions & Patterns

### 1. Component Structure
- **Client Components**: Use `'use client'` directive for interactivity
- **Server Route**: `/api/analyze` handles external API calls and file I/O
- **Functional Components**: All React components are functional (no class components)
- **Props Interface**: Define explicit TypeScript interfaces for all props

**Example**:
```typescript
interface ScoreCardProps {
  title: string;
  score: number;
  rationale: string;
  index?: number;
}
```

### 2. Styling Pattern (cn utility)
Use `cn()` from `lib/utils.ts` for merging Tailwind classes:
```typescript
className={cn(
  'base-class',
  condition && 'conditional-class',
  score >= 8 ? 'text-success' : 'text-error'
)}
```

This prevents Tailwind conflicts using `tailwind-merge`.

### 3. Animation Pattern (Framer Motion)
Consistent staggered animations across pages:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

### 4. Error Handling
- Client-side validation before API calls
- Try-catch blocks with user-friendly error messages
- Graceful error UI components with error icons

### 5. File Storage Strategy
- Results stored as JSON in `public/results/[id].json`
- Screenshots stored as PNG in `public/screenshots/[id].png`
- IDs generated using crypto.randomBytes(16).toString('hex')
- ⚠️ Note: For production, migrate to database

### 6. Accessibility
- Semantic HTML (header, main, footer)
- Keyboard-accessible form inputs
- ARIA-compatible button states
- Sufficient color contrast for WCAG AA
- Alt text for images

### 7. Type Safety
- `AnalysisResult` interface defines complete analysis structure
- `CategoryScore` interface for individual scores
- Path alias `@/*` maps to root for clean imports

---

## Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Create .env file
cp .env.example .env

# Add your OpenAI API key
echo "OPENAI_API_KEY=your_key_here" >> .env
```

### Local Development
```bash
# Start dev server (runs on port 3002)
npm run dev

# Access at http://localhost:3002
```

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm start        # Run production server
npm run lint     # Run ESLint
```

### Testing Design
1. Go to home page
2. Enter a URL or upload a screenshot
3. Wait for analysis (15-30 seconds)
4. Results redirect automatically
5. View scores, recommendations, and AI detection

---

## API Endpoints

### POST /api/analyze
Analyzes a design from URL or screenshot upload.

**Request (URL)**:
```
POST /api/analyze
Content-Type: multipart/form-data

type: "url"
value: "https://example.com"
```

**Request (Screenshot)**:
```
POST /api/analyze
Content-Type: multipart/form-data

type: "screenshot"
screenshot: [File object]
```

**Success Response (200)**:
```json
{
  "id": "a1b2c3d4e5f6...",
  "success": true
}
```

**Error Response (400/500)**:
```json
{
  "error": "Error message"
}
```

**Client should redirect to**: `/results/{id}`

---

## Important Notes & Limitations

### External Dependencies
- **OpenAI API**: Requires `OPENAI_API_KEY` environment variable
- **Playwright**: Requires chromium binary (installed via `npx playwright install chromium`)
- Both are required for app to function

### Performance
- Screenshot capture: ~5-10 seconds (depends on page size)
- AI analysis: ~5-15 seconds (depends on OpenAI API latency)
- Total analysis time: 15-30 seconds average

### Limitations
- 10MB file size limit for uploads
- Analysis results stored in filesystem (not scalable for production)
- Full-page screenshots only (1920x1080 viewport)
- No user authentication or saved history
- No database - results expire when server restarts or files deleted

### Future Enhancements (from README)
- [ ] Database integration (replace filesystem storage)
- [ ] User authentication & saved analyses
- [ ] Before/after design comparison
- [ ] PDF export functionality
- [ ] Shareable analysis links
- [ ] Public gallery of critiques
- [ ] Team collaboration features

---

## Deployment (Vercel)

### Serverless Chromium Support
The app uses **serverless-compatible Chromium** (`@sparticuz/chromium`) for Vercel deployment:
- `lib/screenshot.ts` automatically detects serverless environment
- Uses `playwright-core` + `@sparticuz/chromium` in production
- Falls back to local Playwright for development

### Environment Setup
1. Add `OPENAI_API_KEY` to Vercel environment variables (all environments)
2. Serverless Chromium works automatically - no additional config needed
3. Requires **Vercel Pro** for 60s timeout and 3GB memory (free tier: 10s timeout, 1GB memory)

### Configuration Files
- `vercel.json` - Function settings (60s timeout, 3GB memory for `/api/analyze`)
- `next.config.js` - React strict mode enabled
- `tsconfig.json` - Strict TypeScript mode
- `DEPLOYMENT.md` - Full deployment guide with troubleshooting

### Vercel Function Configuration
```json
{
  "functions": {
    "app/api/analyze/route.ts": {
      "maxDuration": 60,
      "memory": 3008
    }
  }
}
```

### Notes
- API route needs 60s timeout (screenshot + AI analysis can take 15-30s total)
- 3GB memory recommended for Chromium + large page screenshots
- Results stored in `/public` directory (accessible via static file serving)
- Screenshots accessible at `/screenshots/[id].png`
- Results JSON accessible at `/results/[id].json`
- See `DEPLOYMENT.md` for detailed deployment instructions

---

## Common Development Tasks

### Modifying the AI Critique Prompt
**File**: `lib/prompts/design-critique.md`

This markdown file contains the entire prompt sent to GPT-4o. You can easily edit:
- Evaluation categories and their descriptions
- Scoring criteria (currently 1-10 scale)
- AI slop detection patterns
- Response format requirements
- Tone and style of the critique

Changes take effect immediately on next analysis (no code changes needed).

### Adding a New Score Category
1. Update `AnalysisResult.categories` interface in `lib/types.ts`
2. Update `lib/prompts/design-critique.md` (add to evaluation framework)
3. Add label to `categoryLabels` in `app/results/[id]/page.tsx`
4. Component will auto-render in grid

### Changing Design Tokens
- Colors: `tailwind.config.ts` (theme.extend.colors)
- Typography: `tailwind.config.ts` (theme.extend.fontFamily)
- Shadows/Effects: `tailwind.config.ts` (theme.extend.boxShadow)
- Global CSS classes: `app/globals.css`

### Debugging Analysis Issues
- Check console logs in `app/api/analyze/route.ts` (lines 40, 67)
- OpenAI response parsing happens in `lib/analyze.ts` (lines 108-113)
- Screenshot capture logs in `lib/screenshot.ts`

### Testing with Different Input Types
- URLs: Use live websites (e.g., studiopimmit.com, vercel.com)
- Screenshots: Export design mocks from Figma as images
- Large images may take longer to analyze

---

## File Naming Conventions

- **Pages**: lowercase, kebab-case
- **Components**: PascalCase (OverallScore.tsx)
- **Utilities**: camelCase (utils.ts, types.ts)
- **Styles**: Global in app/globals.css, component styles in Tailwind classes
- **API Routes**: lowercase under app/api/ (route.ts)
- **Dynamic Routes**: [bracketed] names in Next.js (app/results/[id])

---

## Notes for Future Developers

1. **Always check `.env.example`** - Ensure OPENAI_API_KEY is set before running
2. **Playwright is memory-intensive** - Each analysis spawns a browser process
3. **Results are public** - Files in `/public` are accessible to anyone
4. **TypeScript strict mode is enabled** - All code must be fully typed
5. **Framer Motion used throughout** - Check animation patterns before modifying
6. **Tailwind design system is comprehensive** - Prefer using existing color tokens
7. **Error messages are user-friendly** - Maintain descriptive error text for UX

---

Generated: October 15, 2025
Last Updated: Next.js 15.1.6, React 19, TypeScript 5
