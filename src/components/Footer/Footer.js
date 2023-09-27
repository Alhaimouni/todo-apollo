import AppBar from "@mui/material/AppBar";

function Footer() {
  return (
    <AppBar
      position="static"
      style={{
        height: "50px",
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.497)",
        boxShadow: "none",
        color: "black",
      }}
    >
      <p>All rights Reserved 2023</p>
    </AppBar>
  );
}

export default Footer;
