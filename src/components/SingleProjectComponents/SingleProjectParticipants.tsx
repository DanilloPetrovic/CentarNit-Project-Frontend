import { Box, Typography, Button } from "@mui/material";
import Modal from "../Modal";
import { Project, User } from "../../interfaces/interfaces";
import { useFormik } from "formik";

interface TaskFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  token: string;
  project: Project | null;
}

interface ValuesType {
  title: string;
  description: string;
  priority: string;
  dueDate: string | null;
  userId: number;
  projectId: number | null;
}

const SingleProjectParticipants = ({
  user,
  isOpen,
  onClose,
  project,
}: TaskFormProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      participants: project?.participants || [],
    },

    onSubmit: async (values) => {},
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            bgcolor: "#393E46",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" color="white">
            Change Participants
          </Typography>

          <Box>
            <Typography sx={{ color: "white" }}>Current</Typography>
            {project &&
              project.participants.map((user) => (
                <Box
                  key={user?.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#387a65",
                    marginTop: "5px",
                    color: "white",
                    padding: "0px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "0.2s",
                    ":hover": { bgcolor: "#4ECCA3" },
                  }}
                >
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                    {user?.username}
                  </Typography>
                  <Button sx={{ color: "white" }}>Remove</Button>
                </Box>
              ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: "10px 40px",
              fontSize: "1rem",
              fontWeight: "500",
              bgcolor: "#4ECCA3",
              ":hover": { bgcolor: "#387a65" },
            }}
          >
            Change
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default SingleProjectParticipants;
