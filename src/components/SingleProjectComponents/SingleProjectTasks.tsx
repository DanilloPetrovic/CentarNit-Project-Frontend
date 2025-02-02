import { Grid, Box, Typography } from "@mui/material";
import TaskCard from "../HomeComponents/TaskCard";

interface SingleProjectTasksProps {
  tasks: any[];
}

const SingleProjectTasks = ({ tasks }: SingleProjectTasksProps) => {
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
