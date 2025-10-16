import OpenAI from 'openai';
import { AnalysisResult } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ANALYSIS_PROMPT = `You are an expert design critic with world-class taste and deep knowledge of visual design principles, UX best practices, and modern design trends. Analyze the provided website design/screenshot using the following evaluation framework:

## Evaluation Framework

Evaluate the design across these 10 categories, scoring each from 1-10:

1. **Aesthetic Cohesion** - Overall visual harmony, consistency of design elements, how well components work together
2. **Hierarchy & Layout** - Typography scale, grid systems, use of white space, information architecture
3. **Typography** - Font choices, type system, readability, personality, uniqueness
4. **Color & Contrast** - Color palette effectiveness, contrast ratios, emotional impact, accessibility
5. **Imagery & Iconography** - Image quality, icon consistency, custom vs generic assets, visual language
6. **Brand Expression** - How well the design expresses brand personality and values
7. **System Consistency** - Design token discipline, component reusability, systematic approach
8. **Visual Craft & Detail** - Micro-interactions, animation quality, attention to detail, polish
9. **AI Slop Indicators** - Presence of generic AI-generated patterns (score 1-10, where 1 = heavy AI slop, 10 = highly original)
10. **Emotional Resonance** - How the design makes users feel, memorability, human connection

## AI Slop Detection

Identify common AI-generated design patterns (score inversely - higher score means less slop):
- Particle backgrounds (tsparticles)
- Generic gradient blur orbs
- Overuse of glass-morphism
- Common AI color palettes (coral + sage, etc.)
- Default typography stacks (Inter + Space Grotesk)
- Predictable SaaS template layouts
- Generic Heroicons/Lucide icons only
- No custom illustrations or branded elements

## Response Format

Respond with a JSON object in this exact structure:

{
  "overallScore": number (1-10, calculated as average of all categories),
  "categories": {
    "aestheticCohesion": { "score": number, "rationale": "string" },
    "hierarchyLayout": { "score": number, "rationale": "string" },
    "typography": { "score": number, "rationale": "string" },
    "colorContrast": { "score": number, "rationale": "string" },
    "imageryIconography": { "score": number, "rationale": "string" },
    "brandExpression": { "score": number, "rationale": "string" },
    "systemConsistency": { "score": number, "rationale": "string" },
    "visualCraft": { "score": number, "rationale": "string" },
    "aiSlopIndicators": { "score": number, "rationale": "string" },
    "emotionalResonance": { "score": number, "rationale": "string" }
  },
  "summary": "2-3 paragraph overall assessment of the design",
  "aiSlopDetection": {
    "score": number (1-10, where 1 = heavy AI slop, 10 = highly original),
    "indicators": ["list", "of", "specific", "AI", "patterns", "found"]
  },
  "topRefinements": [
    "Specific, actionable recommendation 1",
    "Specific, actionable recommendation 2",
    "Specific, actionable recommendation 3"
  ]
}

Be specific, direct, and honest in your assessment. Focus on actionable insights rather than generic observations.`;

export async function analyzeDesign(
  imageBase64: string,
  sourceType: 'url' | 'screenshot',
  sourceValue: string
): Promise<AnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/png;base64,${imageBase64}`,
                detail: 'high',
              },
            },
            {
              type: 'text',
              text: ANALYSIS_PROMPT,
            },
          ],
        },
      ],
      max_tokens: 4096,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in response');
    }

    // Parse the JSON response
    let analysisData;
    try {
      analysisData = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse analysis results');
    }

    // Add metadata
    const result: AnalysisResult = {
      ...analysisData,
      timestamp: new Date().toISOString(),
      sourceType,
      sourceValue,
    };

    return result;
  } catch (error) {
    console.error('Error analyzing design:', error);
    throw new Error('Failed to analyze design. Please try again.');
  }
}
