import { Project, User } from "../../interfaces/interfaces";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../../pages/Home/HomeFunctions";
import { useNavigate } from "react-router-dom";

interface propsTypes {
  user: User | null;
  project: Project | null;
}

const ProjectCard = ({ user, project }: propsTypes) => {
  const navigate = useNavigate();

  if (!project) {
    return null;
  }

  return (
    <Grid item xs={4} key={project.id}>
      <Card
        sx={{
          width: "100%",
          bgcolor: project.createdById !== user?.id ? "#32353d" : "#393E46",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/project/${project.id}`)}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ color: "white", fontWeight: "bold", margin: 0 }}
          >
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgb(220, 220, 220)", fontSize: "20px" }}
          >
            {project.description}
          </Typography>

          <Typography sx={{ color: "white", marginTop: "10px" }}>
            Created By: {project.createdBy.username}
          </Typography>

          <Typography sx={{ color: "white" }}>
            Participants: {project.participants.length}
          </Typography>

          <Typography sx={{ color: "white", marginTop: "10px" }}>
            Created: {formatDate(project.createdAt)}
          </Typography>
          {project.deadline ? (
            <Typography sx={{ color: "white " }}>
              Due Date: {formatDate(project.deadline)}
            </Typography>
          ) : null}
          <Typography
            sx={{
              color: "white",
              fontSize: "1.1rem",
              marginTop: "10px",
            }}
          >
            Is Done: {project.isDone === true ? "Completed" : "Incompleted"}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
