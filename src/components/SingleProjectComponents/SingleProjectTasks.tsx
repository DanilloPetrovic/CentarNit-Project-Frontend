import { Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "../HomeComponents/TaskCard";
import { getTasks } from "../../pages/SingleProject/SingleProjectFunctions";

interface SingleProjectTasksProps {
  tasks: any[];
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const SingleProjectTasks = ({ tasks, setTasks }: SingleProjectTasksProps) => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getTasks(Number(id), setTasks, token);
    }
  }, [id, token]);

  console.log(tasks);

  return (
    <Box sx={{ padding: "20px" }}>
      <Box width="100%">
        <Typography
          variant="h5"
          sx={{ color: "white", width: "100%", marginTop: "10px" }}
        >
          Project Tasks ({tasks.length}):{" "}
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "0px",
            display: "flex",
            justifyContent: "start",
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCard task={task} key={task.id} />)
          ) : (
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{ color: "white", fontSize: "2rem", textAlign: "center" }}
              >
                There are no tasks
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default SingleProjectTasks;
