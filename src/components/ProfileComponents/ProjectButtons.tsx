import { Box, Button } from "@mui/material";
import { logOut } from "../../pages/RegisterLogin/RegisterLoginFunctions";
import { useNavigate } from "react-router-dom";

const ProjectButtons = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        type="button"
        variant="contained"
        sx={{
          padding: "5px 30px",
          fontSize: "1rem",
          fontWeight: "500",
          bgcolor: "#4ECCA3",
          marginTop: "50px",
          ":hover": { bgcolor: "#387a65" },
        }}
        onClick={() => logOut(navigate)}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default ProjectButtons;
