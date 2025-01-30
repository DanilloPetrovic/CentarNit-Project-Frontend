import { Box, Typography, Button } from "@mui/material";
import { User } from "../../interfaces/interfaces";
import { FormikProps } from "formik";
import { initialValuesTypes } from "./CreateProjectModal";

interface props {
  user: User | null;
  formik: FormikProps<initialValuesTypes>;
}

const UserList = ({ user, formik }: props) => {
  return (
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
        onClick={() => {
          if (!user?.id) return;

          const updatedParticipants = formik.values.participants.includes(
            user?.id
          )
            ? formik.values.participants.filter((id) => id !== user.id)
            : [...formik.values.participants, user.id];

          formik.setFieldValue("participants", updatedParticipants);
        }}
        sx={{ color: "white" }}
      >
        {formik.values.participants.includes(user?.id ?? 0) ? "Remove" : "Add"}
      </Button>
    </Box>
  );
};

export default UserList;
