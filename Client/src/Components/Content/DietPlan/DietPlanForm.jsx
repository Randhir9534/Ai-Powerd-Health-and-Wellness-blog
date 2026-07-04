import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { end_points } from "../../../Api/api";
import axiosInstance from "../../../Api/axiosInstance";
import DietPlanResult from "./DietPlanResult/DietPlanResult";
import "./DietPlanForm.css";

let api = end_points.generateDietPlan;

const goalOptions = [
  { value: "weight_loss", label: "Weight Loss" },
  { value: "weight_gain", label: "Weight Gain" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "maintain", label: "Maintain Weight" },
];

const dietTypeOptions = [
  { value: "veg", label: "Vegetarian" },
  { value: "non-veg", label: "Non-Vegetarian" },
];

const DietPlanForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: "",
      weight: "",
      height: "",
      goal: "",
      dietType: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null); // { data, disclaimer }

  const onSubmit = (formValues) => {
    setLoading(true);
    setErrorMsg("");
    setResult(null);

    const payload = {
      age: Number(formValues.age),
      weight: Number(formValues.weight),
      height: Number(formValues.height),
      goal: formValues.goal,
      dietType: formValues.dietType,
    };

    axiosInstance
      .post(api, payload)
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setResult({ data: response.data, disclaimer: response.disclaimer });
        } else {
          setErrorMsg(response.message || "Something went wrong.");
        }
      })
      .catch((err) => {
        setErrorMsg(
          err?.response?.data?.message ||
            "Failed to generate diet plan. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box className="diet-form-wrapper">
      <Paper elevation={0} className="diet-form-paper">
        <Typography variant="h5" className="diet-form-title" gutterBottom>
          AI Diet Plan Generator
        </Typography>
        <Typography variant="body2" className="diet-form-subtitle">
          Fill in your details and get a personalized 7-day diet plan.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="age"
                control={control}
                rules={{
                  required: "Age is required",
                  min: { value: 10, message: "Age must be at least 10" },
                  max: { value: 100, message: "Age must be below 100" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Age (years)"
                    type="number"
                    fullWidth
                    className="diet-form-field"
                    error={!!errors.age}
                    helperText={errors.age?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="weight"
                control={control}
                rules={{
                  required: "Weight is required",
                  min: { value: 20, message: "Enter a valid weight" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Weight (kg)"
                    type="number"
                    fullWidth
                    className="diet-form-field"
                    error={!!errors.weight}
                    helperText={errors.weight?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="height"
                control={control}
                rules={{
                  required: "Height is required",
                  min: { value: 100, message: "Enter a valid height" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Height (cm)"
                    type="number"
                    fullWidth
                    className="diet-form-field"
                    error={!!errors.height}
                    helperText={errors.height?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="dietType"
                control={control}
                rules={{ required: "Please select diet preference" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Diet Preference"
                    fullWidth
                    className="diet-form-field"
                    error={!!errors.dietType}
                    helperText={errors.dietType?.message}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem value="" disabled>
                      Select diet preference
                    </MenuItem>
                    {dietTypeOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name="goal"
                control={control}
                rules={{ required: "Please select your goal" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Goal"
                    fullWidth
                    className="diet-form-field"
                    error={!!errors.goal}
                    helperText={errors.goal?.message}
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ displayEmpty: true }}
                  >
                    <MenuItem value="" disabled>
                      Select your goal
                    </MenuItem>
                    {goalOptions.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <br />

            <Grid item xs={12}>
              <Button
                style={{marginTop:8}}
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                className="diet-submit-btn"
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Generate 7-Day Plan"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        {errorMsg && (
          <Alert severity="error" className="diet-form-error">
            {errorMsg}
          </Alert>
        )}
      </Paper>

      {result && <DietPlanResult data={result.data} disclaimer={result.disclaimer} />}
    </Box>
  );
};

export default DietPlanForm;