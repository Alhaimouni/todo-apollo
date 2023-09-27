import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div">
          Todo-Apollo
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
