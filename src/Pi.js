//Imports
import React, { useEffect, useState } from "react";
import { Text, Box, Image, Flex, Button, Input, Spinner } from "theme-ui";
import MyButton from "./MyButton";
import pi_header from "./util/pi_header3.png";

//================================================================================
const Pi = () => {
  const url = "https://api.pi.delivery/v1/pi?start=1&numberOfDigits=";
  //Number of digits to display
  const [numDigits, setNumDigits] = useState(20);
  //The digits of PI
  const [piDigits, setPiDigits] = useState([]);
  //Digits to Display
  const [digitsToDisplay, setDigitsToDisplay] = useState("3.");
  //Boolean to verfiy if start button pressed
  const [isStart, setIsStart] = useState(false);
  //--------------------------------------------------------------
  const fetchData = (numDigits) => {
    fetch(url + numDigits)
      .then((response) => response.json())
      .then((piDigits) => setPiDigits(piDigits.content));
  };
  //--------------------------------------------------------------
  useEffect(() => {
    const printDigits = () => {
      if (
        piDigits &&
        isStart &&
        digitsToDisplay !== null &&
        digitsToDisplay.length !== numDigits + 2
      )
        setDigitsToDisplay(
          digitsToDisplay + piDigits.charAt(digitsToDisplay.length - 2)
        );
    };
    const interval = setInterval(() => {
      printDigits();
    }, 100);
    return () => clearInterval(interval);
  }, [isStart, digitsToDisplay, piDigits, numDigits]);
  //--------------------------------------------------------------
  const handleMinus = () => {
    if (numDigits - 1 < 0) setNumDigits(0);
    else setNumDigits(numDigits - 1);
    setIsStart(false);
  };
  //--------------------------------------------------------------
  const handlePlus = () => {
    if (numDigits + 1 > 79) {
      setNumDigits(79);
    } else {
      setNumDigits(numDigits + 1);
    }
    setIsStart(false);
  };
  //--------------------------------------------------------------
  return (
    <Flex
      id="main_flex"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        background: "#292A32   ",
        width: "100%",
        height: "100%",
        margin: " 0 !important",
      }}
    >
      <Flex
        id="Pi_Flex"
        sx={{
          backgroundColor: "#61DBFB",
          justifyContent: "center",
          border: "solid",
          width: "100%",
          height: "100%",
        }}
      >
        <Image src={pi_header}></Image>
      </Flex>
      <Flex
        id="Body"
        sx={{
          marginTop: "20px",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "40vh",
          justifyContent: "Space-Around",
          py: "100px",
        }}
      >
        <Text
          sx={{
            fontFamily: "Times news Roman",
            fontStyle: "normal",
            fontSize: "50px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Display the first n-digits of Pi
        </Text>
        <Flex
          sx={{
            marginTop: "50px",
            background: "white",
            border: "solid",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            py: "20px",
            borderRadius: "30px",
            width: "15%",
            height: "250px",
          }}
        >
          <Text
            sx={{
              fontFamily: "Thaoma",
              fontWeight: "bold",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Number of digits
          </Text>
          <Flex>
            <MyButton sign="-" onClick={handleMinus}>
              -
            </MyButton>
            <Input
              sx={{ textAlign: "center", width: "50px", margin: "10px" }}
              value={numDigits}
            />
            <MyButton sign="+" onClick={handlePlus}>
              +
            </MyButton>
          </Flex>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <Flex sx={{ width: "100%", justifyContent: "space-between" }}>
              <Button
                sx={{
                  height: "25px",
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#e0876a",
                  color: "black",
                  ":hover": {
                    border: " solid black",
                  },
                }}
                onClick={() => {
                  setIsStart(!isStart);
                }}
              >
                Stop
              </Button>
              <Button
                sx={{
                  height: "25px",
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "#61DBFB",
                  color: "black",
                  ":hover": {
                    border: " solid black",
                  },
                }}
                onClick={(e) => {
                  console.log(isStart);
                  if (!isStart) {
                    setIsStart(true);
                    setDigitsToDisplay("3.");
                    fetchData(numDigits);
                  }
                }}
              >
                Start
              </Button>
            </Flex>
            <Flex sx={{ width: "100%" }}>
              <Button
                sx={{
                  width: "100%",
                  my: "10px",
                  height: "25px",
                  justifyContent: "center",
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "lightGreen",
                  color: "black",
                  ":hover": {
                    border: " solid black",
                  },
                }}
                onClick={(e) => {
                  setIsStart(false);
                  setDigitsToDisplay("3.");
                }}
              >
                Refresh
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          sx={{
            marginTop: "50px",
            background: "white",
            border: "solid",
            flexDirection: "flex-start",
            padding: "20px",
            width: "50%",
            borderRadius: "30px",
          }}
        >
          <Text style={{ fontSize: "30px" }}>
            {digitsToDisplay}
            {isStart &&
              digitsToDisplay !== null &&
              digitsToDisplay.length !== numDigits + 2 && (
                <Spinner size={"25px"} color={"blue"}></Spinner>
              )}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex
          id="Footer"
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#61DBFB",
            border: "solid",
            width: "100%",
            height: "128px",
          }}
        >
          <Text
            sx={{
              fontSize: "75px",
              fontFamily: "Thaoma",
              fontWeight: "bold",
            }}
          >
            @Tuval Zitelbach
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
//================================================================================
//Export Pi component
export default Pi;
