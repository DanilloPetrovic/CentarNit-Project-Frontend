import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

interface TaskFilterPropsTypes {
  setFilter: (filter: any) => void;
}

const TaskFilter = ({ setFilter }: TaskFilterPropsTypes) => {
  const [selectedFilter, setSelectedFilter] = useState("newest");

  useEffect(() => {
    const filter = filters.find((filter) => filter.value === selectedFilter);
    if (filter) {
      setFilter(filter.value);
    }
  }, [selectedFilter, setFilter]);

  const filters = [
    { value: "newest", name: "Newest" },
    {
      name: "Low priority",
      value: "lowpriority",
    },
    {
      name: "Medium priority",
      value: "mediumpriority",
    },
    {
      name: "High priority",
      value: "highpriority",
    },
    {
      name: "Closest Due Date",
      value: "closestduedate",
    },
  ];

  return (
    <Box
      sx={{
        padding: "25px 0px 0px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "white", fontWeight: "bold", marginBottom: "10px" }}
      >
        Filters
      </Typography>

      <FormControl
        variant="filled"
        sx={{
          color: "white",
          width: "25%",
          bgcolor: "#393E46",
          margin: 0,
          padding: 0,
        }}
      >
        <InputLabel
          sx={{
            color: "#B0BEC5",
            "&.Mui-focused": {
              color: "#4ECCA3",
            },
          }}
        >
          Filter
        </InputLabel>
        <Select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          sx={{
            color: "white",
            bgcolor: "#393E46",
            borderRadius: "8px",
            padding: 0,
            margin: 0,
            ".MuiSvgIcon-root": {
              color: "#4ECCA3",
            },
          }}
        >
          {filters.map((filter) => (
            <MenuItem
              key={filter.value}
              value={filter.value}
              sx={{
                color: "white",
                bgcolor: "#232931",
                "&.Mui-selected": {
                  backgroundColor: "#4ECCA3 !important",
                  color: "black",
                },
                "&:hover": {
                  backgroundColor: "#387a65",
                },
              }}
            >
              {filter.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaskFilter;
