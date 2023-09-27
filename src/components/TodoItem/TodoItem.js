import React, { useState } from "react";
import { Paper, Checkbox, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function TodoItem({ title, completed }) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function completeToggle() {}

  function titleEdit() {}

  return (
    <Paper
      elevation={1}
      style={{
        padding: "15px",
        display: "flex",
        alignItems: "center",
        borderLeft: `4px solid ${completed ? "green" : "red"}`,
      }}
    >
      <Checkbox
        color="primary"
        checked={completed}
        onChange={completeToggle}
        disabled={isEditing}
      />
      <Typography variant="h6" flex={1}>
        {isEditing ? (
          <input type="text" value={title} onChange={(e) => title} />
        ) : (
          title
        )}
      </Typography>
      <IconButton onClick={toggleEdit}>
        <Edit color="primary" />
      </IconButton>
      <IconButton onClick={toggleEdit}>
        <Delete style={{ color: "rgb(205,51,0)" }} />
      </IconButton>
    </Paper>
  );
}

export default TodoItem;
