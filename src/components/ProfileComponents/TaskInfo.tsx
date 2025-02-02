import { Box, Typography } from "@mui/material";
import { User } from "../../interfaces/interfaces";

interface TaskInfoProps {
  user: User;
}

const TaskInfo = ({ user }: TaskInfoProps) => {
  return (
    <Box
      sx={{
        width: "50%",
        padding: "20px",
        bgcolor: "#393E46",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Tasks:{" "}
        <Typography fontSize="1.8rem">
          {user.tasks &&
            user.tasks.filter((task) => task.projectId === null).length}
        </Typography>
      </Typography>
      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Completed Tasks:{" "}
        <Typography fontSize="1.8rem">
          {user.tasks &&
            user.tasks.filter(
              (task) => task.isDone === true && task.projectId === null
            ).length}
        </Typography>
      </Typography>
      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Incompleted Tasks:{" "}
        <Typography fontSize="1.8rem">
          {" "}
          {user.tasks &&
            user.tasks.filter(
              (task) => task.isDone === false && task.projectId === null
            ).length}
        </Typography>
      </Typography>

      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Low Priority Tasks:{" "}
        <Typography fontSize="1.8rem">
          {" "}
          {user.tasks &&
            user.tasks.filter(
              (task) => task.priority === "low" && task.projectId === null
            ).length}
        </Typography>
      </Typography>

      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Medum Priority Tasks:{" "}
        <Typography fontSize="1.8rem">
          {" "}
          {user.tasks &&
            user.tasks.filter(
              (task) => task.priority === "medium" && task.projectId === null
            ).length}
        </Typography>
      </Typography>

      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        High Priority Tasks:{" "}
        <Typography fontSize="1.8rem">
          {" "}
          {user.tasks &&
            user.tasks.filter(
              (task) => task.priority === "high" && task.projectId === null
            ).length}
        </Typography>
      </Typography>
    </Box>
  );
};

export default TaskInfo;
