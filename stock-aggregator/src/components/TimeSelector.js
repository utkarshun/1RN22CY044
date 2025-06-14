import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function TimeSelector({ minutes, setMinutes }) {
  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id="time-interval-label">Time Interval</InputLabel>
      <Select
        labelId="time-interval-label"
        value={minutes}
        label="Time Interval"
        onChange={(e) => setMinutes(Number(e.target.value))}
      >
        {[10, 30, 50, 60].map((val) => (
          <MenuItem key={val} value={val}>
            {val} minutes
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
