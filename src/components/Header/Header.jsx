import React from "react";
import { useAuth } from "hooks/useAuth";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  AppBar,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Header = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className="Header" position="static">
      <Box className="content">
        <Typography variant="h3">TODO App</Typography>
        {user && (
          <>
            <Button
              onClick={handleClick}
              className="menu-button"
              endIcon={<ArrowDropDownIcon />}
            >
              {user.displayName}
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              getContentAnchorEl={null}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("/logout");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </AppBar>
  );
};

export default Header;
