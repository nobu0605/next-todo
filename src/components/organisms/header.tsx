import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";

export default function Template() {
  const { authState } = useContext(AuthContext);
  const isSignedIn = authState ? true : false;
  const user = authState.user;

  return (
    <Box sx={{ flexGrow: 1, margin: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo app
          </Typography>
          {isSignedIn ? (
            <Typography variant="h6">{user?.name}</Typography>
          ) : (
            <Link style={{ color: "white", textDecoration: "none" }} href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
