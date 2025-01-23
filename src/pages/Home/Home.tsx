import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMyProfile } from "../RegisterLogin/RegisterLoginFunctions";

interface UserResponse {
  id: string;
  username: string;
  email: string;
  token?: string;
}

const Home = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const token = localStorage.getItem("token");

  const getMyProfileFunction = async () => {
    if (token) {
      try {
        const profile = await getMyProfile(token);
        setUser(profile || null);
      } catch (error) {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    getMyProfileFunction();
  }, [token]);

  if (!token) {
    return <Navigate to="/register" replace={true} />;
  }

  if (!user) {
    return <Box>Error: Unable to fetch user data</Box>;
  }

  console.log(user);

  return (
    <Box>
      <Typography>Username: {user?.username}</Typography>
      <Typography>Email: {user?.email}</Typography>
    </Box>
  );
};

export default Home;
