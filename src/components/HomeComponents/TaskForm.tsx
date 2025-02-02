import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Modal from "../Modal";
import { User } from "../../interfaces/interfaces";
import { createTask } from "../../pages/Home/HomeFunctions";
import { getMyProfile } from "../../pages/RegisterLogin/RegisterLoginFunctions";
import { useDispatch } from "react-redux";
import { getTasks } from "../../pages/SingleProject/SingleProjectFunctions";

interface TaskFormProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  token: string;
  projectId: number | null;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

interface ValuesType {
  title: string;
  description: string;
  priority: string;
  dueDate: string | null;
  userId: number;
  projectId: number | null;
}

const TaskModal = ({
  user,
  isOpen,
  onClose,
  token,
  projectId,
  setTasks,
}: TaskFormProps) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "medium",
      projectId: projectId,
      dueDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(20, "Max 20 characters"),
      description: Yup.string().max(
        100,
        "Description must be less than 100 characters"
      ),
      priority: Yup.string().required("Priority is required"),
    }),
    onSubmit: async (values) => {
      const data: ValuesType = {
        title: values.title,
        description: values.description,
        priority: values.priority,
        dueDate: values.dueDate === "" ? null : values.dueDate,
        userId: Number(user?.id),
        projectId: values.projectId,
      };

      await createTask(data, token);
      await getMyProfile(dispatch, token);

      await getTasks(Number(values.projectId), setTasks, token);

      console.log(data);

      onClose();
      formik.resetForm();
    },
  });

  const priorityArr = [
    { name: "Low", value: "low" },
    { name: "Medium", value: "medium" },
    { name: "High", value: "high" },
  ];

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
            Add Task
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

          <FormControl variant="filled" sx={{ color: "white" }}>
            <InputLabel
              sx={{
                color: "#B0BEC5",
                "&.Mui-focused": {
                  color: "#B0BEC5",
                },
              }}
            >
              Priority
            </InputLabel>
            <Select
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{
                color: "white",
                bgcolor: "#232931",
                ".MuiSvgIcon-root": {
                  color: "white",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#232931",
                  },
                },
              }}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              {priorityArr.map((priority) => (
                <MenuItem
                  key={priority.value}
                  value={priority.value}
                  sx={{
                    color: "white",
                    bgcolor: "#232931",
                    "&.Mui-selected": {
                      backgroundColor: "#232931 !important",
                    },
                    "&:hover": {
                      backgroundColor: "#387a65",
                    },
                  }}
                >
                  {priority.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="date"
            variant="filled"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
            helperText={formik.touched.dueDate && formik.errors.dueDate}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toLocaleDateString("en-CA"), // Ensures yyyy-mm-dd format
            }}
            sx={{
              input: { color: "white" },
              label: { color: "#B0BEC5" },
              ".MuiFilledInput-root": {
                backgroundColor: "#232931",
              },
            }}
          />

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

export default TaskModal;
