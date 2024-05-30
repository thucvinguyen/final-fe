import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Divider, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Homepage
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/me"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontFamily: "Copperplate, Fantasy",
            }}
          >
            GymSpace
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="h7" sx={{ mr: 3 }}>
            <Link
              component={RouterLink}
              to="/features/exercise-library"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "inherit",
                "&:hover": {
                  color: "#ffbd59",
                },
              }}
            >
              Exercise Library
            </Link>
          </Typography>
          <Typography variant="h7" sx={{ mr: 3 }}>
            <Link
              component={RouterLink}
              to="/features/fitness-tracker"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "inherit",
                "&:hover": {
                  color: "#ffbd59",
                },
              }}
            >
              Fitness Tracker
            </Link>
          </Typography>
          <Typography variant="h7" sx={{ mr: 3 }}>
            <Link
              component={RouterLink}
              to="/features/calorie-dashboard"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "inherit",
                "&:hover": {
                  color: "#ffbd59",
                },
              }}
            >
              Calorie Dashboard
            </Link>
          </Typography>

          <Avatar
            onClick={handleProfileMenuOpen}
            src={user.avatarUrl}
            alt={user.name}
            sx={{ width: 32, height: 32, marginRight: 2, cursor: "pointer" }}
          />
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
