import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Modal from "../Modal";
import { Project, User } from "../../interfaces/interfaces";
import { useFormik } from "formik";
import { changeParticipants } from "../../pages/Project/ProjectFunctionts";

interface TaskFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  token: string;
  project: Project | null;
  allUsers: User[];
}

const SingleProjectParticipants = ({
  user,
  isOpen,
  onClose,
  token,
  project,
  allUsers,
}: TaskFormProps) => {
  const [search, setSearch] = useState<string>("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      participants: project?.participants || [],
    },

    onSubmit: async () => {
      if (project && token) {
        if (formik.values.participants.length < 6) {
          const ids = project?.participants.map((user) => user.id) || [];
          const added = formik.values.participants.filter(
            (user) => !ids.includes(user.id)
          );
          const removed = ids.filter(
            (id) => !formik.values.participants.some((user) => user.id === id)
          );
          const addedIds = added.map((added) => added.id);

          await changeParticipants(addedIds, removed, token, project.id);

          onClose();
          formik.resetForm;
        } else {
          alert("Max 5 participants");
        }
      }
    },
  });

  const handleAddParticipant = (user: User) => {
    formik.setFieldValue("participants", [...formik.values.participants, user]);
  };

  const handleRemoveParticipant = (userId: number | null) => {
    formik.setFieldValue(
      "participants",
      formik.values.participants.filter((user) => user.id !== userId)
    );
  };

  const participants = formik.values.participants;
  const nonParticipants = allUsers.filter(
    (user) => !participants.some((p) => p.id === user.id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
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
            <Typography sx={{ color: "white" }}>
              Current Participants ({formik.values.participants.length})
            </Typography>
            {participants
              .filter((username) => username.id !== user?.id)
              .map((user) => (
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
                  <Button
                    sx={{ color: "white" }}
                    onClick={() => handleRemoveParticipant(user.id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
          </Box>

          <Box sx={{ width: "100%" }}>
            <TextField
              label="Search for users"
              type="text"
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                input: { color: "white" },
                label: { color: "#B0BEC5" },
                width: "100%",
                ".MuiFilledInput-root": {
                  backgroundColor: "#232931",
                },
              }}
            />
            {nonParticipants
              .filter((user) => user.username?.includes(search))
              .filter((username) => username.id !== user?.id)
              .slice(0, 3)
              .map((user) => (
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
                  <Button
                    sx={{ color: "white" }}
                    onClick={() => handleAddParticipant(user)}
                  >
                    Add
                  </Button>
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
