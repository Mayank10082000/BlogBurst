import React from "react";

const Background = ({ children, isGradient = false }) => {
  const gradientStyle = {
    background: "linear-gradient(to bottom, #e0f7ff, #87CEEB, #1e3c72)",
    minHeight: "100vh",
    width: "100%",
  };

  const defaultStyle = {
    background: "#ffffff",
    minHeight: "100vh",
    width: "100%",
  };

  return (
    <div style={isGradient ? gradientStyle : defaultStyle}>{children}</div>
  );
};

export default Background;
