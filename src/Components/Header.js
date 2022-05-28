import { Image, Flex } from "theme-ui";
import pi_header from "../util/pi_header.png";
const Header = () => {
  return (
    <Flex
      id="Pi_Flex"
      sx={{
        backgroundColor: "DeepSkyBlue ",
        justifyContent: "center",
        width: "100%",
        height: "141px",
      }}
    >
      <Image src={pi_header} sx={{ width: "15%" }}></Image>
    </Flex>
  );
};

export default Header;
