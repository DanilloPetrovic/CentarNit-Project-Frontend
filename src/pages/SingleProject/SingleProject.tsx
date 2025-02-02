import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Box } from "@mui/material";
import { useState } from "react";
import { getMyProfile } from "../RegisterLogin/RegisterLoginFunctions";
import { useParams } from "react-router-dom";
import { getProject } from "./SingleProjectFunctions";
import Sidebar from "../../components/Sidebar";
import SingleProjectHeader from "../../components/SingleProjectComponents/SingleProjectHeader";
import SingleProjectButtons from "../../components/SingleProjectComponents/SingleProjectButtons";
import SingleProjectTasks from "../../components/SingleProjectComponents/SingleProjectTasks";

const SingleProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [project, setProject] = useState<any>(null);
  const user = useSelector((state: RootState) => state.user);

  console.log(project);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };

      fetchProfile();
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchProject = async () => {
      if (token && id) {
        const projectData = await getProject(Number(id), token);
        setProject(projectData);
      }
    };

    fetchProject();
  }, [id, token]);

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
            getProject={getProject}
            setProject={setProject}
          />
        ) : null}

        {project ? <SingleProjectTasks tasks={project.tasks} /> : null}
      </Box>
    </Box>
  );
};

export default SingleProject;
