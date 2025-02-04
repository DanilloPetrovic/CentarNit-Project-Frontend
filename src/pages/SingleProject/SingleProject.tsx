import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useGetAllUsers } from "../Project/ProjectFunctionts";
import { User } from "../../interfaces/interfaces";

const SingleProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.user);
  const project = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };
      fetchProfile();
    }
  }, [dispatch, token]);

  useEffect(() => {
    const fetchProject = async () => {
      if (token && id) {
        await getProject(Number(id), token, dispatch);
      }
    };
    fetchProject();
  }, [id, token, dispatch]);

  const { data: users } = useGetAllUsers(
    user?.id && token ? user.id : null,
    token
  );

  useEffect(() => {
    if (users) {
      setAllUsers(users);
    }
  }, [users]);

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
        {project && (
          <>
            <SingleProjectHeader project={project} />
            <SingleProjectButtons
              user={user}
              project={project}
              allUsers={allUsers}
            />
            <SingleProjectTasks tasks={project.tasks} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default SingleProject;
