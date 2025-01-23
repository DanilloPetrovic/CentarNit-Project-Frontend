import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./RegisterLoginFunctions";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik<User>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("not valid mail").required("required"),
      password: Yup.string()
        .min(6, "password muse have 6 characters")
        .max(20, "password must have less then 20 charachter"),
    }),

    onSubmit: async (values) => {
      const user = await loginUser(values);

      if (user) {
        navigate("/");
      } else {
        alert("Register failed");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: "50%",
        }}
      >
        <Typography
          variant="h2"
          fontSize={{ md: "52px", sm: "48px", xs: "38px" }}
          sx={{
            color: "white",
            fontWeight: "500",
          }}
        >
          Log In
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
          width: { lg: "50%", md: "75%", sm: "90%", xs: "90%" },
        }}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="filled"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            ".MuiFilledInput-root": {
              backgroundColor: "#1e1e1e",
            },
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="filled"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            ".MuiFilledInput-root": {
              backgroundColor: "#1e1e1e",
            },
          }}
        />

        <Typography
          onClick={() => navigate("/register")}
          sx={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "500",
            cursor: "pointer",
            color: "primary.contrastText",
            ":hover": { textDecoration: "underline" },
          }}
        >
          You already have an account?
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              padding: "10px 40px",
              fontSize: "1rem",
              fontWidth: "500",
            }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
