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
import SingleProjectHeader from "../../components/SingleProjectComponents/SingleProjectHeader";
import SingleProjectButtons from "../../components/SingleProjectComponents/SingleProjectButtons";
import SingleProjectTasks from "../../components/SingleProjectComponents/SingleProjectTasks";

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };

      fetchProfile();
    }
  }, [dispatch]);

  const getProject = async (projectId: number | null, token: string | null) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/project/getproject/${projectId}`,
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
    if (token) {
      getProject(Number(id), token);
    }
  }, [id, token]);

  console.log(project);

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
        {project ? <SingleProjectHeader project={project} /> : null}

        {project ? (
          <SingleProjectButtons
            user={user}
            project={project}
            setTasks={setTasks}
          />
        ) : null}

        {project ? (
          <SingleProjectTasks tasks={tasks} setTasks={setTasks} />
        ) : null}
      </Box>
    </Box>
  );
};

export default SingleProject;
