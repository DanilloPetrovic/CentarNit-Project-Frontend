import { User } from "../../interfaces/interfaces";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import { formatDate } from "../../pages/Home/HomeFunctions";

interface PropsTypes {
  user: User | null;
}

const ListTasks = ({ user }: PropsTypes) => {
  if (!user) {
    return <Typography>No user data available.</Typography>;
  }

  const completeTasks =
    user.tasks?.filter((task) => task.isDone === true) || [];

  const incompleteTasks =
    user.tasks?.filter((task) => task.isDone === false) || [];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Box sx={{ width: "50%" }}>
        <Typography variant="h4" sx={{ color: "white", marginTop: "50px" }}>
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
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <Grid item xs={12} key={task.id}>
                <Card sx={{ width: "100%", bgcolor: "#393E46" }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ color: "white", fontWeight: "bold", margin: 0 }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgb(220, 220, 220)", fontSize: "20px" }}
                    >
                      {task.description}
                    </Typography>

                    <Typography sx={{ color: "white", marginTop: "10px" }}>
                      Created: {formatDate(task.createdAt)}
                    </Typography>
                    {task.dueDate ? (
                      <Typography sx={{ color: "white " }}>
                        Due Date: {formatDate(task.dueDate)}
                      </Typography>
                    ) : null}
                  </CardContent>
                  <CardActions>
                    <Button size="large" sx={{ color: "#4ECCA3" }}>
                      Completed
                    </Button>
                    <Button size="large" sx={{ color: "#4ECCA3" }}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ textAlign: "center", width: "100%", color: "white" }}>
              <Typography variant="h5" sx={{ color: "White" }}>
                No complete tasks found.
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>

      <Box sx={{ width: "50%" }}>
        <Typography variant="h4" sx={{ color: "white", marginTop: "50px" }}>
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
          {completeTasks.length > 0 ? (
            completeTasks.map((task) => (
              <Grid item xs={12} key={task.id}>
                <Card sx={{ width: "100%", bgcolor: "#393E46" }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      component="div"
                      sx={{ color: "white", fontWeight: "bold", margin: 0 }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgb(220, 220, 220)", fontSize: "20px" }}
                    >
                      {task.description}
                    </Typography>

                    <Typography sx={{ color: "white", marginTop: "10px" }}>
                      Created: {formatDate(task.createdAt)}
                    </Typography>
                    {task.dueDate ? (
                      <Typography sx={{ color: "white " }}>
                        Due Date: {formatDate(task.dueDate)}
                      </Typography>
                    ) : null}
                  </CardContent>
                  <CardActions>
                    <Button size="large" sx={{ color: "#4ECCA3" }}>
                      Incompleted
                    </Button>
                    <Button size="large" sx={{ color: "#4ECCA3" }}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography variant="h5" sx={{ color: "White" }}>
                No complete tasks found.
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListTasks;
