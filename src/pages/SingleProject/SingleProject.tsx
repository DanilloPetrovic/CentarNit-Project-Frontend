import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Box } from "@mui/material";
import { useState } from "react";
import { Project } from "../../interfaces/interfaces";
import { getMyProfile } from "../RegisterLogin/RegisterLoginFunctions";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };

      fetchProfile();
    }
  }, [dispatch]);

  const getProject = async (userId: number | null, token: string | null) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/project/getproject/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProject(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProject(Number(id), token);
  }, [user, token]);

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
      ></Box>
    </Box>
  );
};

export default SingleProject;
