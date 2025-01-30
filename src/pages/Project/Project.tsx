import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import CreateProjectModal from "../../components/ProjectComponents/CreateProjectModal";
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetAllUsers } from "./ProjectFunctionts";

const Project = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("token");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetAllUsers(user?.id && token ? user.id : null, token);

  useEffect(() => {
    if (users) {
      setAllUsers(users);
    }
  }, [users]);

  if (!user?.id || !token) {
    return <Typography color="white">Loading...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", maxHeight: "100vh" }}>
      <Box sx={{ width: "20%" }}>
        <Sidebar />
      </Box>

      <Box
        sx={{
          padding: "50px",
          width: "80%",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Projects
        </Typography>

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
          onClick={() => setIsProjectModalOpen(true)}
        >
          Create project
        </Button>

        <CreateProjectModal
          user={user}
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          token={token}
          allUsers={allUsers}
        />
      </Box>
    </Box>
  );
};

export default Project;
