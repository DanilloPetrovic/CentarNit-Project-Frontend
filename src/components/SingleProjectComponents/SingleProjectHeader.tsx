import { Box, Typography } from "@mui/material";
import { Project } from "../../interfaces/interfaces";
import { formatDate } from "../../pages/Home/HomeFunctions";

interface propType {
  project: Project;
}

const SingleProjectHeader = ({ project }: propType) => {
  return (
    <Box>
      <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
        {project?.title}
      </Typography>

      <Typography sx={{ color: "darkgrey", fontSize: "23px", width: "50%" }}>
        {project?.description}
      </Typography>

      <Typography sx={{ color: "white", fontSize: "18px" }}>
        Participants ({project?.participants.length}):{" "}
        {project?.participants.map((participant) =>
          project?.participants.length !==
          project?.participants.indexOf(participant) + 1
            ? participant.username + ", "
            : participant.username
        )}
      </Typography>

      {project?.deadline ? (
        <Typography sx={{ color: "white", fontSize: "20px" }}>
          Due Date: {formatDate(project?.deadline)}
        </Typography>
      ) : null}

      <Typography
        sx={{
          color: "white",
          fontSize: "25px",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        {project?.isDone ? "Completed" : "Incompleted"}
      </Typography>
    </Box>
  );
};

export default SingleProjectHeader;
