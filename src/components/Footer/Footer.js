import AppBar from "@mui/material/AppBar";

function Footer() {
  return (
    <AppBar
      position="static"
      style={{
        height: "50px",
        textAlign: "center",
        backgroundColor: "rgb(25,118,210)",
        boxShadow: "none",
        color: "white",
      }}
    >
      <p>All rights Reserved 2023</p>
    </AppBar>
  );
}

export default Footer;
