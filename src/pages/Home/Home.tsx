import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TaskModal from "../../components/HomeComponents/TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ListTasks from "../../components/HomeComponents/ListTasks";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("token");

  const [isTaskFormModalOpen, setIsTaskFormModalOpen] =
    useState<boolean>(false);

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: "20%" }}>
        <Sidebar />
      </Box>

      <Box sx={{ padding: "50px", width: "80%" }}>
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Tasks
        </Typography>

        <Box>
          <Button
            type="button"
            variant="contained"
            sx={{
              padding: "5px 30px",
              fontSize: "1rem",
              fontWidth: "500",
              bgcolor: "#4ECCA3",
              marginTop: "20px",
              ":hover": { bgcolor: "#387a65" },
            }}
            onClick={() => setIsTaskFormModalOpen(true)} // Dodato otvaranje modala
          >
            Add Task
          </Button>

          <TaskModal
            user={user}
            isOpen={isTaskFormModalOpen}
            onClose={() => setIsTaskFormModalOpen(false)}
            token={token}
          />
          <Box>
            <ListTasks user={user} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
