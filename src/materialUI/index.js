import wallPaper from "../assets/wp.avif";

export const Body_mui = {
  paper: {
    minHeight: "calc(100vh - (63.992px + 52px))",
    padding: "26px",
    backgroundImage: `url(${wallPaper})`,
  },
  box: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export const CreateTodoForm_mui = {
  form: {
    width: "35%",
    margin: "0px auto",
    border: "1px solid rgb(94,190,224)",
    borderRadius: "6px",
    padding: "15px 65px",
    boxShadow: "1px 1px 2px rgb(94,190,224)",
    backgroundColor: "white",
  },
  control: {
    margin: "5px 0px 5px 0px",
  },
};


export const TodoItem_mui = {
    padding: "15px",
    display: "flex",
    alignItems: "center",
    
}