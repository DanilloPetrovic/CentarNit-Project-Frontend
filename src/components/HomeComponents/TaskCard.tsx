import { Project, Task } from "../../interfaces/interfaces";
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
import { getProject } from "../../pages/SingleProject/SingleProjectFunctions";
import Comments from "../Comments";
import { useState } from "react";

interface propsTypes {
  task: Task | null;
  project?: Project;
}

const TaskCard = ({ task }: propsTypes) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  if (!task) {
    return null;
  }

  return (
    <Grid item xs={6} key={task.id}>
      <Card
        sx={{ width: "100%", bgcolor: task.isDone ? "#32353d" : "#393E46" }}
      >
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
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
            }}
          >
            Is Done: {task.isDone === true ? "Completed" : "Incompleted"}
          </Typography>
        </CardContent>
        {task.projectId ? (
          <CardActions>
            {task.isDone === false ? (
              <Button
                size="large"
                sx={{ color: "#4ECCA3" }}
                onClick={() => {
                  taskCompleteOrIncomplete("taskcomplete", task.id, token);
                  getProject(task.projectId, token, dispatch);
                }}
              >
                Complete
              </Button>
            ) : (
              <Button
                size="large"
                sx={{ color: "#4ECCA3" }}
                onClick={() => {
                  taskCompleteOrIncomplete("taskincomplete", task.id, token);
                  getProject(task.projectId, token, dispatch);
                }}
              >
                Incomplete
              </Button>
            )}

            <Button
              sx={{ color: "#4ecca3" }}
              onClick={() => setIsCommentsOpen((prev) => !prev)}
            >
              Comments
            </Button>

            <Button
              size="large"
              sx={{ color: "#4ECCA3" }}
              onClick={() => {
                if (window.confirm("You want to delete this task?")) {
                  deleteTask(task.id, token);
                  getProject(task.projectId, token, dispatch);
                }
              }}
            >
              Delete
            </Button>
          </CardActions>
        ) : (
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
                Complete
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
                Incomplete
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
        )}
        <Comments isOpen={isCommentsOpen} task={task} />
      </Card>
    </Grid>
  );
};

export default TaskCard;
