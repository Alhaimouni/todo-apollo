import React from "react";
import "./LoadingSpinner.css";
function LoadingSpinner() {
  return (
    <>
      <div className="lds-dual-ring"></div>
      <p>Loading...</p>
    </>
  );
}

export default LoadingSpinner;
