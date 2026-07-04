import React from "react";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./DietPlanResult.css";

// Maps a meal type string to an icon + accent color, so each meal
// feels visually distinct instead of a plain text list.
const getMealStyle = (mealType = "") => {
  const type = mealType.toLowerCase();
  if (type.includes("breakfast")) {
    return { icon: <FreeBreakfastIcon fontSize="small" />, color: "#F59E0B" };
  }
  if (type.includes("lunch")) {
    return { icon: <LunchDiningIcon fontSize="small" />, color: "#16A34A" };
  }
  if (type.includes("dinner")) {
    return { icon: <DinnerDiningIcon fontSize="small" />, color: "#7C3AED" };
  }
  return { icon: <IcecreamIcon fontSize="small" />, color: "#0EA5E9" }; // snacks
};

const DietPlanResult = ({ data, disclaimer }) => {
  if (!data) return null;

  const { summary, days = [] } = data;

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header card */}
      <Paper style={{backgroundColor:"greenyellow"}} elevation={0} className="diet-header">
        <Typography variant="overline" className="diet-header-label">
          Your Personalized Plan
        </Typography>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          7-Day Diet Plan
        </Typography>
        {summary && (
          <Typography variant="body2" className="diet-header-summary">
            {summary}
          </Typography>
        )}
      </Paper>

      {/* One accordion per day */}
      {days.map((day, idx) => (
        <Accordion
          key={idx}
          defaultExpanded={idx === 0}
          disableGutters
          className="diet-accordion"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="diet-accordion-summary"
          >
            <Box className="diet-day-row">
              <Box className="diet-day-badge">{idx + 1}</Box>
              <Typography className="diet-day-title">{day.day}</Typography>
              {day.totalCalories && (
                <Chip
                  icon={<LocalFireDepartmentIcon />}
                  label={`${day.totalCalories} kcal`}
                  size="small"
                  className="diet-calorie-chip"
                />
              )}
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 2.5, py: 2 }}>
            {(day.meals || []).map((meal, mIdx) => {
              const { icon, color } = getMealStyle(meal.type);
              return (
                <Box key={mIdx} className="diet-meal">
                  <Box className="diet-meal-header">
                    <Box className="diet-meal-icon" style={{ "--meal-color": color }}>
                      {icon}
                    </Box>
                    <Typography variant="subtitle2" className="diet-meal-title">
                      {meal.type}
                    </Typography>
                    {meal.calories && (
                      <Chip
                        label={`${meal.calories} kcal`}
                        size="small"
                        variant="outlined"
                        className="diet-meal-chip"
                        style={{ "--meal-color": color }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="diet-meal-desc"
                  >
                    {meal.items}
                  </Typography>
                  {mIdx < day.meals.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}

      <Alert
        icon={<WarningAmberIcon fontSize="inherit" />}
        severity="warning"
        className="diet-disclaimer"
      >
        {disclaimer}
      </Alert>
    </Box>
  );
};

export default DietPlanResult;