import { Box, Button } from "@mui/material";
import { Project, User } from "../../interfaces/interfaces";
import { useState } from "react";
import TaskForm from "../HomeComponents/TaskForm";

interface propType {
  user: User;
  project: Project;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const SingleProjectButtons = ({ user, project, setTasks }: propType) => {
  const token = localStorage.getItem("token");
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);

  return (
    <Box>
      {user?.id === project?.createdById ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: " start",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            type="button"
            variant="contained"
            sx={{
              padding: "5px 30px",
              fontSize: "1rem",
              fontWeight: "500",
              bgcolor: "#4ECCA3",
              marginTop: "20px",
              ":hover": { bgcolor: "#387a65" },
            }}
            onClick={() => setIsCreateTaskOpen(true)}
          >
            Create Task
          </Button>

          {token ? (
            <TaskForm
              user={user}
              isOpen={isCreateTaskOpen}
              onClose={() => setIsCreateTaskOpen(false)}
              projectId={project.id}
              token={token}
              setTasks={setTasks}
            />
          ) : null}

          <Button
            type="button"
            variant="contained"
            sx={{
              padding: "5px 30px",
              fontSize: "1rem",
              fontWeight: "500",
              bgcolor: "#4ECCA3",
              marginTop: "20px",
              ":hover": { bgcolor: "#387a65" },
            }}
          >
            Add participant
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default SingleProjectButtons;
