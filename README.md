# DesignCrit - AI-Powered Design Critique Tool

An AI-powered design critique tool that provides expert-level analysis of website designs. Built to showcase AI capabilities and provide valuable insights to designers and product teams.

## Features

- **Dual Input Options**: Analyze designs by entering a URL or uploading a screenshot
- **Comprehensive Analysis**: Evaluates 10 key design categories:
  - Aesthetic Cohesion
  - Hierarchy & Layout
  - Typography
  - Color & Contrast
  - Imagery & Iconography
  - Brand Expression
  - System Consistency
  - Visual Craft & Detail
  - AI Slop Indicators
  - Emotional Resonance

- **AI Slop Detection**: Identifies common AI-generated design patterns
- **Actionable Recommendations**: Provides specific, expert-level suggestions
- **Beautiful Reports**: Professional scoring visualizations and detailed breakdowns

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **AI**: GPT-4o (OpenAI)
- **Screenshot Capture**: Playwright
- **Animation**: Framer Motion
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
\`\`\`bash
cd designcrit
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install Playwright browsers:
\`\`\`bash
npx playwright install chromium
\`\`\`

4. Create a \`.env\` file:
\`\`\`bash
cp .env.example .env
\`\`\`

5. Add your OpenAI API key to \`.env\`:
\`\`\`
OPENAI_API_KEY=your_api_key_here
\`\`\`

### Development

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3002](http://localhost:3002) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Connect your repository to Vercel

3. Add environment variable:
   - \`OPENAI_API_KEY\`: Your OpenAI API key

4. Deploy!

### Subdomain Configuration

To deploy on a subdomain (e.g., \`designcrit.yourdomain.com\`):

1. In Vercel project settings, go to **Domains**
2. Add custom domain: \`designcrit.yourdomain.com\`
3. Update your DNS records as instructed by Vercel

## Project Structure

\`\`\`
designcrit/
├── app/
│   ├── api/
│   │   └── analyze/        # Analysis endpoint
│   ├── results/[id]/       # Results display page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (input interface)
│   └── globals.css         # Global styles
├── components/
│   ├── OverallScore.tsx    # Overall score visualization
│   └── ScoreCard.tsx       # Individual category score card
├── lib/
│   ├── analyze.ts          # AI analysis logic
│   ├── screenshot.ts       # Screenshot capture utilities
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
├── public/
│   ├── results/            # Saved analysis results
│   └── screenshots/        # Captured screenshots
└── tailwind.config.ts      # Tailwind configuration
\`\`\`

## Design System

This project uses the same design tokens as the main Studio Pimmit website:

- **Fonts**: Space Grotesk (sans), Playfair Display (headings), JetBrains Mono (mono)
- **Colors**: Coral primary (#e07a5f), Sage accent (#81b29a)
- **Shadows**: Custom glow effects and elevation system
- **Animations**: Framer Motion with custom easing curves

## How It Works

1. **User Input**: User enters a URL or uploads a screenshot
2. **Screenshot Capture**: For URLs, Playwright captures a full-page screenshot
3. **AI Analysis**: GPT-4o analyzes the design using a comprehensive prompt
4. **Results Storage**: Analysis is saved as JSON with a unique ID
5. **Visualization**: Results are displayed with scores, rationale, and recommendations

## Evaluation Framework

The tool evaluates designs based on a professional framework that assesses:

- Visual design principles (aesthetics, hierarchy, typography, color)
- System design quality (consistency, reusability, tokens)
- Craft and detail (micro-interactions, polish, animations)
- Originality (detection of AI-generated patterns)
- Emotional impact (memorability, human connection)

## API Usage

### POST /api/analyze

**Request (URL):**
\`\`\`
Content-Type: multipart/form-data

type: "url"
value: "https://example.com"
\`\`\`

**Request (Screenshot):**
\`\`\`
Content-Type: multipart/form-data

type: "screenshot"
screenshot: File (image)
\`\`\`

**Response:**
\`\`\`json
{
  "id": "unique-analysis-id",
  "success": true
}
\`\`\`

## Limitations

- Screenshot capture requires chromium to be installed
- Analysis can take 15-30 seconds depending on image complexity
- Results are stored in filesystem (consider database for production)
- 10MB file size limit for uploads

## Future Enhancements

- [ ] Database integration for result persistence
- [ ] User authentication and saved analyses
- [ ] Compare before/after designs
- [ ] Export to PDF
- [ ] Share links for analyses
- [ ] Public gallery of critiques
- [ ] Team collaboration features

## Built By

[Studio Pimmit](https://studiopimmit.com) - An AI-First Design & Development Consultancy

## License

Private - All Rights Reserved
