import OpenAI from 'openai';
import { AnalysisResult } from './types';
import { readFile } from 'fs/promises';
import { join } from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load the design critique prompt from external file
async function loadCritiquePrompt(): Promise<string> {
  const promptPath = join(process.cwd(), 'lib', 'prompts', 'design-critique.md');
  return await readFile(promptPath, 'utf-8');
}

export async function analyzeDesign(
  imageBase64: string,
  sourceType: 'url' | 'screenshot',
  sourceValue: string
): Promise<AnalysisResult> {
  try {
    // Load the critique prompt from the markdown file
    const prompt = await loadCritiquePrompt();

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
              text: prompt,
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
