import { User } from "../../interfaces/interfaces";
import { Box, Typography, Grid } from "@mui/material";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import {
  getNewestTasks,
  getTasksByPriority,
  getTasksByClosestDueDate,
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
      <Box sx={{ width: "50%" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", marginTop: "10px", textAlign: "center" }}
        >
          Incompleted
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {arrToList !== null
            ? arrToList
                .filter((task) => task.isDone === false)
                .map((task) => <TaskCard task={task} key={task.id} />)
            : null}
        </Grid>
      </Box>

      <Box sx={{ width: "50%" }}>
        <Typography
          variant="h4"
          sx={{ color: "white", marginTop: "10px", textAlign: "center" }}
        >
          Completed
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {arrToList !== null
            ? arrToList
                .filter((task) => task.isDone === true)
                .map((task) => <TaskCard task={task} key={task.id} />)
            : null}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListTasks;
