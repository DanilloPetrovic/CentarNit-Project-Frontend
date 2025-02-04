import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getMyProfile } from "../RegisterLogin/RegisterLoginFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Sidebar from "../../components/Sidebar";
import TaskInfo from "../../components/ProfileComponents/TaskInfo";
import ProjectInfo from "../../components/ProfileComponents/ProjectInfo";
import ProjectButtons from "../../components/ProfileComponents/ProjectButtons";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };

      fetchProfile();
    }
  }, [dispatch]);

  return (
    <Box style={{ display: "flex", maxHeight: "100vh" }}>
      <Box style={{ width: "20%" }}>
        <Sidebar />
      </Box>

      <Box
        style={{
          padding: "50px",
          width: "80%",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h3" style={{ color: "white", fontWeight: "bold" }}>
          Profile
        </Typography>

        {user ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {user.username}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "lightgrey",
                marginTop: "10px",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              {user.email}
            </Typography>

            <TaskInfo user={user} />
            <ProjectInfo user={user} />
            <ProjectButtons />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Profile;
