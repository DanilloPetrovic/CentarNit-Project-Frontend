import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TaskModal from "../../components/HomeComponents/TaskForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ListTasks from "../../components/HomeComponents/ListTasks";
import TaskFilter from "../../components/HomeComponents/TaskFilter";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../RegisterLogin/RegisterLoginFunctions";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem("token");
  const [filter, setFilter] = useState<string>("newest");
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };

      fetchProfile();
    }
  }, [dispatch]);

  if (!token) {
    return <Navigate to="/register" replace={true} />;
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
          Tasks
        </Typography>

        <Box>
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
            onClick={() => setIsTaskFormModalOpen(true)}
          >
            Add Task
          </Button>

          <TaskFilter setFilter={setFilter} />

          <TaskModal
            user={user}
            isOpen={isTaskFormModalOpen}
            onClose={() => setIsTaskFormModalOpen(false)}
            token={token}
          />

          <Box>
            <ListTasks user={user} filter={filter} token={token} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
