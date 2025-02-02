import Modal from "../Modal";
import { Box, TextField, Typography, Button } from "@mui/material";
import { User } from "../../interfaces/interfaces";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import UserList from "./UserList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../../pages/RegisterLogin/RegisterLoginFunctions";

interface PropsTypes {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  allUsers: any[];
}

export interface InitialValuesTypes {
  title: string;
  description: string;
  createdById: number;
  participants: number[];
  deadline: string | null;
}

const CreateProjectModal = ({
  user,
  isOpen,
  onClose,
  token,
  allUsers,
}: PropsTypes) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();

  const formik = useFormik<InitialValuesTypes>({
    initialValues: {
      title: "",
      description: "",
      createdById: user?.id ?? 0,
      participants: [user?.id ?? 0],
      deadline: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("required").max(20, "max 20 characters"),
      description: Yup.string().max(100, "max 100 characters"),
    }),

    onSubmit: async (values: InitialValuesTypes) => {
      const data: InitialValuesTypes = {
        title: values.title,
        description: values.description,
        createdById: values.createdById,
        participants: values.participants,
        deadline: values.deadline === "" ? null : values.deadline,
      };

      if (values.participants.length > 1) {
        try {
          const response = await axios.post(
            "http://localhost:3000/project/createproject",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          await getMyProfile(dispatch, token);
          onClose();
          formik.resetForm();
          return response.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Project must have 1 participant");
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
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
            Create Project
          </Typography>

          <TextField
            id="title"
            name="title"
            label="Title"
            type="text"
            variant="filled"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{
              input: { color: "white" },
              label: { color: "#B0BEC5" },
              ".MuiFilledInput-root": {
                backgroundColor: "#232931",
              },
            }}
          />

          <TextField
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="filled"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            sx={{
              input: { color: "white" },
              label: { color: "#B0BEC5" },
              ".MuiFilledInput-root": {
                backgroundColor: "#232931",
              },
            }}
          />

          <TextField
            id="deadline"
            name="deadline"
            label="Due Date"
            type="date"
            variant="filled"
            value={formik.values.deadline}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.deadline && Boolean(formik.errors.deadline)}
            helperText={formik.touched.deadline && formik.errors.deadline}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toLocaleDateString("en-CA"),
            }}
            sx={{
              input: { color: "white" },
              label: { color: "#B0BEC5" },
              ".MuiFilledInput-root": {
                backgroundColor: "#232931",
              },
            }}
          />

          <Box>
            <TextField
              label="Search"
              type="text"
              variant="filled"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                width: "100%",
                input: { color: "white" },
                label: { color: "#B0BEC5" },
                ".MuiFilledInput-root": {
                  backgroundColor: "#232931",
                },
              }}
            />

            {(allUsers !== null || allUsers !== undefined) && searchValue === ""
              ? allUsers
                  .slice(0, 3)
                  .map((user) => (
                    <UserList user={user} formik={formik} key={user.id} />
                  ))
              : searchValue.length > 0
              ? allUsers
                  .filter((user) => user.username.includes(searchValue))
                  .map((user) => (
                    <UserList user={user} formik={formik} key={user.id} />
                  ))
              : null}
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
            Create
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
