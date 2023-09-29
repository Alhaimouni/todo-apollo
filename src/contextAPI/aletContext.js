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

  function afterFinishAlert(msg, status) {
    setsnackbarData({
      msg,
      status
    });
    setOpen(true);
  }

  return (
    <AlertContext.Provider
      value={{ open, setOpen, snackbarData, setsnackbarData, handleClose ,afterFinishAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
}
