import { Button } from "theme-ui";
const MyButton = ({ children, sign, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: "20px",
        color: "#292A32",
        backgroundColor: sign === "+" ? "#61DBFB" : "#e0876a",
        textAlign: "center",
        margin: "auto",
        width: "50px",
        ":hover": {
          border: " solid black",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};
export default MyButton;
