import { Text } from "theme-ui";
const Title = () => {
  return (
    <Text
      sx={{
        color: "white",
        fontFamily: "Times news Roman",
        fontStyle: "normal",
        fontSize: "50px",
        fontWeight: "bold",
      }}
    >
      Display the first n-digits of Pi
    </Text>
  );
};

export default Title;
