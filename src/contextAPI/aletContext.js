import React, { createContext, useState } from "react";

export const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [snackbarData, setsnackbarData] = useState({
    msg: "",
    status: "",
  });

  function handleClose() {
    setOpen(false);
  }

  return (
    <AlertContext.Provider
      value={{ open, setOpen, snackbarData, setsnackbarData, handleClose }}
    >
      {children}
    </AlertContext.Provider>
  );
}
