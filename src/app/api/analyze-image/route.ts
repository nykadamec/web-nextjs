import { NextRequest, NextResponse } from 'next/server';
import { getAPIKey, validateAPIKeyWithMessage, debugAPIKey } from '@/lib/api-keys';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, settings } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // Default settings
    const defaultSettings = {
      language: "english",
      detailLevel: "detailed",
      outputLength: "normal",
      outputStyle: "basic-ai-image-generator",
      model: "openai",
      geminiModel: "gemini-2.5-flash",
      awsRegion: "us-east-1",
    };

    const finalSettings = { ...defaultSettings, ...settings };

    // Create prompt based on settings
    const createPrompt = (language: string, detailLevel: string, outputLength: string, outputStyle: string) => {
      const languageInstructions = {
        english: "Please respond in English.",
        czech: "Please respond in Czech (České).",
        polish: "Please respond in Polish (Polski).",
        german: "Please respond in German (Deutsch).",
      };

      const detailInstructions = {
        brief: "brief",
        detailed: "detailed",
        extensive: "comprehensive"
      };

      const outputLengthInstructions = {
        short: "Keep your response concise and to the point, using approximately 50-150 words.",
        normal: "Provide a balanced description with approximately 150-400 words.",
        long: "Give a comprehensive and thorough description, using 400 or more words when appropriate."
      };

      const outputStyleInstructions = {
        "basic-ai-image-generator": "Provide a straightforward, clear description of what you see in the image. Focus on the main subjects, objects, colors, and basic composition. Use simple, descriptive language without technical jargon.",
        
        "midjourney": "Create a structured Midjourney-style prompt description. Describe the scene with specific details about subjects, setting, style, lighting, camera angle, and artistic elements. Use concise, descriptive phrases separated by commas. Include style modifiers like 'photorealistic', 'cinematic lighting', 'detailed textures', camera specifications (wide angle, close-up, macro), and artistic references when relevant. Keep it under 40 words for optimal Midjourney processing. Focus on visual elements that translate well to artistic generation.",
        
        "flux1": "Generate a detailed, natural language description optimized for Flux AI model. Describe the image systematically: start with the main subject(s), then setting/environment, followed by visual style, lighting, colors, textures, and mood. Use descriptive adjectives and specific details about poses, expressions, clothing, materials, and spatial relationships. Structure as flowing, coherent sentences that would guide an AI image generator effectively. Focus on photorealistic details and natural compositions.",
        
        "gpt-image": "Create a technical, structured description suitable for GPT-4 vision analysis. Provide systematic coverage: identify all objects with precise spatial relationships, describe materials and textures, specify lighting conditions and color schemes, note perspective and composition rules, detail any text or symbols present. Use technical photography terms and precise measurements when possible. Organize information hierarchically from general scene to specific details.",
        
        "imagen4": "Generate a Google Imagen-optimized description using natural, flowing language. Focus on creating vivid, poetic descriptions that capture the essence and emotional tone of the image. Use rich adjectives, descriptive phrases about atmosphere and mood, sensory details, and contextual elements. Describe scenes as if painting with words, emphasizing artistic and aesthetic qualities that would translate into compelling image generation. Keep language accessible and evocative."
      };

      const langInstruction = languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.english;
      const detailText = detailInstructions[detailLevel as keyof typeof detailInstructions] || "detailed";
      const lengthInstruction = outputLengthInstructions[outputLength as keyof typeof outputLengthInstructions] || outputLengthInstructions.normal;
      const styleInstruction = outputStyleInstructions[outputStyle as keyof typeof outputStyleInstructions] || outputStyleInstructions["basic-ai-image-generator"];

      return `${langInstruction} ${styleInstruction} Provide a ${detailText} analysis following the specified output style guidelines. ${lengthInstruction}`;
    };

    const prompt = createPrompt(finalSettings.language, finalSettings.detailLevel, finalSettings.outputLength, finalSettings.outputStyle);

    console.log("Using model:", finalSettings.model);
    console.log("Generated prompt:", prompt);

    let response: Response;
    let data: any;

    if (finalSettings.model === "openai") {
      // Use OpenAI Vision API
      console.log("Using OpenAI Vision API");

      // Debug API keys (safely)
      if (finalSettings.apiKeys?.openai) {
        debugAPIKey(finalSettings.apiKeys.openai, 'OpenAI', 'user');
      }
      if (process.env.OPENAI_API_KEY) {
        debugAPIKey(process.env.OPENAI_API_KEY, 'OpenAI', 'env');
      }

      const openaiApiKey = getAPIKey(
        finalSettings.apiKeys?.openai,
        process.env.OPENAI_API_KEY,
        'openai'
      );

      if (!openaiApiKey) {
        const validation = validateAPIKeyWithMessage(
          finalSettings.apiKeys?.openai || process.env.OPENAI_API_KEY || '',
          'openai'
        );
        return NextResponse.json(
          { error: validation.message || "Valid OpenAI API key is required" },
          { status: 401 }
        );
      }

      const openaiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
      const openaiMaxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || "8096");
      console.log("Using OpenAI model:", openaiModel);
      console.log("Using OpenAI max tokens:", openaiMaxTokens);

      const requestBody = {
        model: openaiModel,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: openaiMaxTokens,
      };

      console.log("Sending request to OpenAI Vision API");

      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("OpenAI Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI API Error:", errorText);
        return NextResponse.json(
          { error: `OpenAI API failed: ${response.status} - ${errorText}` },
          { status: response.status }
        );
      }

      data = await response.json();
      console.log("OpenAI Response:", data);

      if (
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        return NextResponse.json({
          description: data.choices[0].message.content,
          success: true,
          settings: finalSettings,
        });
      } else {
        console.error("Unexpected OpenAI response format:", data);
        return NextResponse.json(
          { error: "Received unexpected response format from OpenAI" },
          { status: 500 }
        );
      }
    } else if (finalSettings.model === "gemini") {
      // Use Google Gemini API
      const geminiMaxTokens = parseInt(process.env.GEMINI_MAX_TOKENS || "4096");
      console.log("Using Gemini max tokens:", geminiMaxTokens);

      let imageData: string;

      try {
        if (imageUrl.startsWith("data:")) {
          imageData = imageUrl.split(",")[1];
        } else {
          const imageResponse = await fetch(imageUrl);
          if (!imageResponse.ok) {
            throw new Error(`Failed to fetch image: ${imageResponse.status}`);
          }
          const imageBuffer = await imageResponse.arrayBuffer();
          imageData = Buffer.from(imageBuffer).toString("base64");
        }
      } catch (error) {
        console.error("Error processing image for Gemini:", error);
        return NextResponse.json(
          { error: `Failed to process image: ${(error as Error).message}` },
          { status: 500 }
        );
      }

      const requestBody = {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageData,
                },
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: geminiMaxTokens,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      console.log("Sending request to Google Gemini API");

      const geminiApiKey = getAPIKey(
        finalSettings.apiKeys?.gemini,
        process.env.GEMINI_API_KEY,
        'gemini'
      );

      if (!geminiApiKey) {
        const validation = validateAPIKeyWithMessage(
          finalSettings.apiKeys?.gemini || process.env.GEMINI_API_KEY || '',
          'gemini'
        );
        return NextResponse.json(
          { error: validation.message || "Valid Google Gemini API key is required" },
          { status: 401 }
        );
      }

      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${finalSettings.geminiModel}:generateContent?key=${geminiApiKey}`;

      response = await fetch(geminiApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        return NextResponse.json(
          { error: `Gemini API failed: ${response.status} - ${errorText}` },
          { status: response.status }
        );
      }

      data = await response.json();
      console.log("Gemini Response:", JSON.stringify(data, null, 2));

      // Check for error in response
      if (data.error) {
        console.error("Gemini API returned error:", data.error);
        return NextResponse.json(
          { error: `Gemini API error: ${data.error.message || data.error}` },
          { status: 500 }
        );
      }

      // Check for blocked content
      if (data.candidates?.[0]?.finishReason === 'SAFETY') {
        console.error("Content blocked by safety filters");
        return NextResponse.json(
          { error: "Content was blocked by safety filters. Please try a different image." },
          { status: 400 }
        );
      }

      // Check for standard response format
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return NextResponse.json({
          description: data.candidates[0].content.parts[0].text,
          success: true,
          settings: finalSettings,
        });
      }

      // Check for alternative response formats
      if (data.candidates?.[0]?.output) {
        return NextResponse.json({
          description: data.candidates[0].output,
          success: true,
          settings: finalSettings,
        });
      }

      if (data.text) {
        return NextResponse.json({
          description: data.text,
          success: true,
          settings: finalSettings,
        });
      }

      // If we get here, log the full response for debugging
      console.error("Unexpected Gemini response format. Full response:", data);
      return NextResponse.json(
        { 
          error: "Unexpected Gemini response format",
          debug: {
            hasError: !!data.error,
            hasCandidates: !!data.candidates,
            candidatesLength: data.candidates?.length || 0,
            firstCandidateKeys: data.candidates?.[0] ? Object.keys(data.candidates[0]) : [],
            responseKeys: Object.keys(data)
          }
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Nepodporovaný model. Použijte 'openai' nebo 'gemini'." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in analyze-image API:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
