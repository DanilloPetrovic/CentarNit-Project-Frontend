import { User } from "../../interfaces/interfaces";
import { Box, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import {
  getAllMyProjects,
  getAllProjects,
  getProjectsThatCreatedByMe,
} from "../../pages/Project/ProjectFunctionts";
import ProjectCard from "./ProjectCard";

interface PropsTypes {
  user: User | null;
  filter: string;
  token: string;
}

const ListProjects = ({ user, filter, token }: PropsTypes) => {
  const [arrToList, setArrToList] = useState<any[]>([]);

  useEffect(() => {
    const fetchproject = async () => {
      if (!user) return;

      try {
        let project;

        switch (filter) {
          case "all":
            project = await getAllProjects(user.id, token);
            break;
          case "participatingprojects":
            project = await getProjectsThatCreatedByMe(user.id, token);
            break;
          case "myprojects":
            project = await getAllMyProjects(user.id, token);
            break;
          default:
            project = user.projects || [];
        }

        setArrToList(project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchproject();
  }, [filter, user]);

  if (!user) {
    return <Typography>No user data available.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "start",
          }}
        >
          {arrToList !== undefined ? (
            arrToList.map((project) => (
              <ProjectCard user={user} project={project} key={project.id} />
            ))
          ) : (
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{ color: "white", fontSize: "2rem", textAlign: "center" }}
              >
                There is not projects
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListProjects;
