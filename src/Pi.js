//Imports from react open source
import React, { useEffect, useState } from "react";
import { Text, Flex, Input } from "theme-ui";
import { useDispatch, useSelector } from "react-redux";

//Import functions
import { getPiDigits } from "./Redux/Slices/PiSlice";

//Import components
import MyButton from "./Components/MyButton";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Title from "./Components/Title";
import RenderDigits from "./Components/RenderDigits";

//================================================================================
const Pi = () => {
  //Number of digits to fetch from the api
  const [numDigits, setNumDigits] = useState(20);
  //Digits to Display
  const [digitsToDisplay, setDigitsToDisplay] = useState("3.");
  //Boolean to verfiy if start button pressed
  const [isStart, setIsStart] = useState(false);
  //Boolean flag pause
  const [pause, setPause] = useState(false);
  const [isRefreshed, setisRefreshed] = useState(true);
  //Use dispatch
  const dispatch = useDispatch();
  //Use selector to get the piDigits from the store
  const { piDigits } = useSelector((state) => state.PiSlice);
  const [errorType, setErrorType] = useState({
    negative: false,
    tooLong: false,
  });
  //--------------------------------------------------------------
  //Use effect to print every second 1 digit
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
    }, 500);
    return () => clearInterval(interval);
  }, [isStart, digitsToDisplay, piDigits, numDigits]);
  //--------------------------------------------------------------
  //Handle minus function, sub 1 from  numDigits
  const handleMinus = () => {
    if (numDigits - 1 < 0 || numDigits === "") setNumDigits(0);
    else setNumDigits(numDigits - 1);
    setIsStart(false);
  };
  //--------------------------------------------------------------
  //Handle plus function, sub 1 from  numDigits
  const handlePlus = () => {
    if (numDigits === "") setNumDigits(1);
    else setNumDigits(numDigits + 1);
    setIsStart(false);
  };
  //--------------------------------------------------------------
  const handlePause = () => {
    setIsStart(!isStart);
    setPause(!pause);
  };
  //--------------------------------------------------------------
  const handleStart = () => {
    setIsStart(true);
    setDigitsToDisplay("3.");
    dispatch(getPiDigits(numDigits));
    setisRefreshed(false);
  };
  //--------------------------------------------------------------
  const handleRefresh = () => {
    setIsStart(false);
    setPause(false);
    setDigitsToDisplay("3.");
    setisRefreshed(true);
    setNumDigits(20);
  };
  //--------------------------------------------------------------
  const changeNumDigit = (value) => {
    handleRefresh();
    const replace = value.replace(/\D/g, "");
    setNumDigits(parseInt(replace) || "");
  };
  //--------------------------------------------------------------
  useEffect(() => {
    if (numDigits < 0)
      setErrorType((prevState) => ({ ...prevState, negative: true }));
    else setErrorType((prevState) => ({ ...prevState, negative: false }));
    if (numDigits > 1000)
      setErrorType((prevState) => ({ ...prevState, tooLong: true }));
    else setErrorType((prevState) => ({ ...prevState, tooLong: false }));
  }, [numDigits]);

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
        minHeight: "100vh",
      }}
    >
      <Header />
      <Flex
        id="Body"
        sx={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          py: "20px",
          my: "auto",
        }}
      >
        <Title />
        <Flex
          id="main box"
          sx={{
            alignItems: "center",
            background: "whitesmoke",
            border: "solid",
            borderRadius: "30px",
            flexDirection: "column",
            height: "280px",
            justifyContent: "space-between",
            marginTop: "50px",
            py: "20px",
            width: "15%",
          }}
        >
          <Text
            sx={{
              fontFamily: "Thaoma",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Number of digits
          </Text>
          <Flex id="plusMinus-container">
            <MyButton backgroundColor="coral" onClick={handleMinus}>
              -
            </MyButton>
            <Input
              sx={{
                marginX: "10px",
                textAlign: "center",
                width: "100px",
                borderRadius: "10px",
                borderWidth: "2px",
                outlineColor:
                  errorType.negative || errorType.tooLong ? "red" : "black",
                borderColor:
                  errorType.negative || errorType.tooLong ? "red" : "black",
                //Remove Arrows from input in  Chrome, Safari, Edge, Opera
                "&input::-webkit-outer-spin-button, &input::-webkit-inner-spin-button":
                  {
                    "-webkit-appearance": "none",
                    margin: 0,
                  },
                //Remove Arrows from input in  Firefox
                "-moz-appearance": "textfield",
              }}
              value={numDigits}
              onChange={(e) => {
                changeNumDigit(e.target.value);
              }}
            />
            <MyButton backgroundColor="DeepSkyBlue" onClick={handlePlus}>
              +
            </MyButton>
          </Flex>

          <Flex
            id="action-container"
            sx={{ width: "100%", justifyContent: "space-around" }}
          >
            <MyButton
              disabled={
                (!piDigits && isRefreshed) ||
                digitsToDisplay.length === numDigits + 2 ||
                !numDigits ||
                errorType.negative ||
                errorType.tooLong
              }
              onClick={handlePause}
              bg="coral"
              sx={{ width: "100px" }}
            >
              {pause ? "unPause" : "pause"}
            </MyButton>
            <MyButton
              disabled={isStart || !numDigits}
              onClick={handleStart}
              bg="DeepSkyBlue"
              sx={{ width: "100px" }}
            >
              Start
            </MyButton>
          </Flex>
          <MyButton bg="lightgreen" onClick={handleRefresh}>
            Refresh
          </MyButton>
        </Flex>
        <RenderDigits
          digitsToDisplay={digitsToDisplay}
          errorType={errorType}
          showSpinner={
            isStart &&
            digitsToDisplay !== null &&
            digitsToDisplay.length !== numDigits + 2
          }
        />
      </Flex>
      <Footer />
    </Flex>
  );
};
//================================================================================
//Export Pi component
export default Pi;
