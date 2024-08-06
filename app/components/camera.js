'use client'
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import ImageForm from "./imageForm";
const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [open, setIsOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState(null); // initialize it
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setIsOpen(true)
  }, [webcamRef]);


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}> 
      <Webcam height={300} width={300} ref={webcamRef} screenshotQuality={1} screenshotFormat="image/jpeg"></Webcam>
      <Box sx={{
        mb: 4
      }} >
        <Button variant="contained" onClick={capture}>Take Photo</Button>
      </Box>
      <ImageForm imgSrc={imgSrc} open={open} setIsOpen={setIsOpen}></ImageForm>
    </Box>
  );
};
export default CustomWebcam