import { useEffect } from "react";
import { Typography } from "@mui/material";
import { getMyProfile } from "../RegisterLogin/RegisterLoginFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const fetchProfile = async () => {
        await getMyProfile(dispatch, token);
      };

      fetchProfile();
    }
  }, [dispatch]);

  console.log(user);

  return (
    <div style={{ display: "flex", maxHeight: "100vh" }}>
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>

      <div
        style={{
          padding: "50px",
          width: "80%",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h3" style={{ color: "white", fontWeight: "bold" }}>
          Profile
        </Typography>
      </div>
    </div>
  );
};

export default Profile;
