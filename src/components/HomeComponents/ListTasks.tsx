import { User } from "../../interfaces/interfaces";
import { Box, Typography, Grid } from "@mui/material";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import {
  getNewestTasks,
  getTasksByPriority,
  getTasksByClosestDueDate,
  getCompletedTasks,
  getIncompletedTasks,
  getAllTasks,
} from "../../pages/Home/HomeFunctions";

interface PropsTypes {
  user: User | null;
  filter: string;
  token: string;
}

const ListTasks = ({ user, filter, token }: PropsTypes) => {
  const [arrToList, setArrToList] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;

      try {
        let tasks;

        switch (filter) {
          case "all":
            tasks = await getAllTasks(token, user.id);
            break;
          case "newest":
            tasks = await getNewestTasks(token, user.id);
            break;
          case "lowpriority":
            tasks = await getTasksByPriority("low", token, user.id);
            break;
          case "mediumpriority":
            tasks = await getTasksByPriority("medium", token, user.id);
            break;
          case "highpriority":
            tasks = await getTasksByPriority("high", token, user.id);
            break;
          case "closestduedate":
            tasks = await getTasksByClosestDueDate(token, user.id);
            break;
          case "completed":
            tasks = await getCompletedTasks(token, user.id);
            break;
          case "incompleted":
            tasks = await getIncompletedTasks(token, user.id);
            break;
          default:
            tasks = user.tasks || [];
        }

        setArrToList(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [filter, user]);

  if (!user) {
    return <Typography>No user data available.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "start",
          }}
        >
          {arrToList !== null
            ? arrToList.map((task) => <TaskCard task={task} key={task.id} />)
            : null}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListTasks;
