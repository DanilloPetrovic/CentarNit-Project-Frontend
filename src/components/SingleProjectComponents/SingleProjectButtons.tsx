import { Box, Button } from "@mui/material";
import { Project, User } from "../../interfaces/interfaces";
import { useState } from "react";
import SingleProjectModal from "./SingleProjectModal";
import {
  deleteProject,
  projectCompleted,
} from "../../pages/SingleProject/SingleProjectFunctions";
import { useNavigate } from "react-router-dom";
import SingleProjectParticipants from "./SingleProjectParticipants";

interface propType {
  user: User;
  project: Project | null;
  allUsers: User[];
}

const SingleProjectButtons = ({ user, project, allUsers }: propType) => {
  const token = localStorage.getItem("token");
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
            <SingleProjectModal
              user={user}
              isOpen={isCreateTaskOpen}
              onClose={() => setIsCreateTaskOpen(false)}
              token={token}
              projectId={project.id}
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
            onClick={() => setIsModalOpen(true)}
          >
            Add participant
          </Button>

          {token ? (
            <SingleProjectParticipants
              user={user}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              token={token}
              project={project}
              allUsers={allUsers}
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
            onClick={() => {
              if (token) {
                if (
                  window.confirm(
                    "Once a project is marked as completed, you cannot revert it back"
                  )
                ) {
                  projectCompleted(project.id, token);
                  navigate("/projects");
                }
              }
            }}
          >
            Complete Project
          </Button>

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
            onClick={() => {
              if (token) {
                if (window.confirm("Sure?")) {
                  deleteProject(project.id, token);
                  navigate("/projects");
                }
              }
            }}
          >
            Delete Project
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default SingleProjectButtons;
