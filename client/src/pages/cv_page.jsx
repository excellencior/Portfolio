import React from "react";
import { Box, Button, Typography } from "@mui/material";

const cv = () => {
  const pdfUrl = "/cv.pdf";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        py: 4,
        backgroundColor: "#f8f8f8",
		borderRadius: 3
      }}
    >

      <Box
        component="iframe"
        src={pdfUrl}
        sx={{
          width: { xs: "95%", sm: "80%", md: "90%" },
          height: "80vh",
          border: "1px solid #ccc",
          borderRadius: 2,
        }}
        title="CV Viewer"
      />

      <Button
	  	className="link-hover"
        variant="outlined"
        href={pdfUrl}
        download
		size="small"
        sx={{border: "2px solid black", color:"black", py:0, mt:3}}
      >
        Download CV
      </Button>
    </Box>
  );
};

export default cv;
