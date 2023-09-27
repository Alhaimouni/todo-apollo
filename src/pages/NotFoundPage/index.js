import React from "react";
import Typography from "@mui/material/Typography";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="h2">404 - Page Not Found</Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </div>
  );
}

export default NotFound;
