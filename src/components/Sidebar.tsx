import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const upper = [
    {
      icon: HomeIcon,
      name: "Home",
      path: "/",
    },
    {
      icon: WorkIcon,
      name: "Projects",
      path: "/projects",
    },
    {
      icon: AccountBoxIcon,
      name: "Profile",
      path: "/profile",
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#393E46",
      }}
    >
      <Box sx={{ height: "100%", width: "100%", bgcolor: "#393E46" }}>
        <List>
          {upper.map((listitem) => (
            <ListItem disablePadding key={listitem.name}>
              <ListItemButton onClick={() => navigate(listitem.path)}>
                <ListItemIcon>
                  <listitem.icon
                    fontSize="large"
                    sx={{ color: "primary.contrastText", fontSize: "2.5rem" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={listitem.name}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    color: "primary.contrastText",
                    fontWeight: "light",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/register");
          }}
        >
          Log out
        </Button>
      </Box>
      <Box sx={{ height: "50%" }}></Box>
    </Box>
  );
};

export default Sidebar;
