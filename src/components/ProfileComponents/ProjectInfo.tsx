import { User } from "../../interfaces/interfaces";
import { Box, Typography } from "@mui/material";

interface ProjectInfoProps {
  user: User;
}

const ProjectInfo = ({ user }: ProjectInfoProps) => {
  return (
    <Box
      sx={{
        width: "50%",
        padding: "20px",
        bgcolor: "#393E46",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        borderTop: "1px solid grey",
      }}
    >
      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Projects:{" "}
        <Typography fontSize="1.8rem">
          {user.projects && user.projects.length}
        </Typography>
      </Typography>

      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        My Projects:{" "}
        <Typography fontSize="1.8rem">
          {user.projects &&
            user.projects.filter((project) => project.createdById === user.id)
              .length}
        </Typography>
      </Typography>

      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Participating Projects:{" "}
        <Typography fontSize="1.8rem">
          {user.projects &&
            user.projects.filter((project) => project.createdById !== user.id)
              .length}
        </Typography>
      </Typography>

      <Typography
        sx={{
          color: "White",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "1.8rem",
        }}
      >
        Completed Projects:{" "}
        <Typography fontSize="1.8rem">
          {user.projects &&
            user.projects.filter((project) => project.isDone === true).length}
        </Typography>
      </Typography>
    </Box>
  );
};

export default ProjectInfo;
