import { Task } from "../../interfaces/interfaces";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { getMyProfile } from "../../pages/RegisterLogin/RegisterLoginFunctions";
import {
  taskCompleteOrIncomplete,
  deleteTask,
  formatDate,
} from "../../pages/Home/HomeFunctions";
import { useDispatch } from "react-redux";

interface propsTypes {
  task: Task | null;
}

const TaskCard = ({ task }: propsTypes) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  if (!task) {
    return null;
  }

  return (
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

          <Typography sx={{ color: "white", fontWeight: "500" }}>
            Priority: {task.priority}
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
          {task.isDone === false ? (
            <Button
              size="large"
              sx={{ color: "#4ECCA3" }}
              onClick={() => {
                taskCompleteOrIncomplete("taskcomplete", task.id, token);
                getMyProfile(dispatch, token);
              }}
            >
              Completed
            </Button>
          ) : (
            <Button
              size="large"
              sx={{ color: "#4ECCA3" }}
              onClick={() => {
                taskCompleteOrIncomplete("taskincomplete", task.id, token);
                getMyProfile(dispatch, token);
              }}
            >
              Incompleted
            </Button>
          )}
          <Button
            size="large"
            sx={{ color: "#4ECCA3" }}
            onClick={() => {
              if (window.confirm("You want to delete this task?")) {
                deleteTask(task.id, token);
                getMyProfile(dispatch, token);
              }
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TaskCard;
