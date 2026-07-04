const axios = require("axios");
// Docs: https://ai.google.dev/api/interactions-api
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";

/**
 * Builds the prompt sent to Gemini.
 */
const buildPrompt = ({ age, weight, height, goal, dietType }) => {
  return `
You are a certified nutrition assistant. Create a 7-day diet plan for a person with:
- Age: ${age} years
- Weight: ${weight} kg
- Height: ${height} cm
- Goal: ${goal} (one of: weight_loss, weight_gain, muscle_gain, maintain)
- Diet preference: ${dietType} (veg or non-veg)

Rules:
1. Only suggest common, easily available Indian/international food items.
2. Respect the veg/non-veg preference strictly. If veg, do NOT include any egg, meat, or fish.
3. Give approximate calories for each meal and a daily total.
4. Keep meals realistic: Breakfast, Mid-morning snack, Lunch, Evening snack, Dinner.
5. Provide all 7 days.
`;
};

// JSON schema the model's output must conform to (enforced by Gemini itself,
// so we don't have to strip markdown fences or hope it behaves).
const dietPlanSchema = {
  type: "object",
  properties: {
    summary: { type: "string" },
    days: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "string" },
          totalCalories: { type: "number" },
          meals: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string" },
                items: { type: "string" },
                calories: { type: "number" },
              },
              required: ["type", "items", "calories"],
            },
          },
        },
        required: ["day", "meals", "totalCalories"],
      },
    },
  },
  required: ["summary", "days"],
};

/**
 * Calls the Gemini Interactions API and returns a parsed JS object (the diet plan).
 */
const generateDietPlan = async (userInput) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const prompt = buildPrompt(userInput);

  const response = await axios.post(
    GEMINI_URL,
    {
      model: GEMINI_MODEL,
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: dietPlanSchema,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
    }
  );

  // Interactions API returns { steps: [ { type: "model_output", content: [ { type: "text", text: "..." } ] } ] }
  const modelOutputStep = response?.data?.steps?.find(
    (step) => step.type === "model_output"
  );
  const rawText = modelOutputStep?.content?.find((c) => c.type === "text")?.text || "";

  let parsedPlan;
  try {
    parsedPlan = JSON.parse(rawText);
  } catch (err) {
    throw new Error("Failed to parse AI response as JSON: " + err.message);
  }

  return parsedPlan;
};

module.exports = { generateDietPlan };