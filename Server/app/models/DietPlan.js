const mongoose = require("mongoose");

const dietPlanSchema = new mongoose.Schema(
  {
    age: { type: Number, required: true },
    weight: { type: Number, required: true }, // in kg
    height: { type: Number, required: true }, // in cm
    goal: {
      type: String,
      enum: ["weight_loss", "weight_gain", "muscle_gain", "maintain"],
      required: true,
    },
    dietType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
    plan: { type: Object, required: true }, // 7-day plan (structured JSON from Gemini)
    disclaimer: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DietPlan", dietPlanSchema);