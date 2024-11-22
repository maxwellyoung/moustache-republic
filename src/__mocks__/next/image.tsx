import React from "react";

const MockNextImage = ({ src, alt, fill, ...props }: any) => {
  const style = fill
    ? { position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }
    : {};
  return <img src={src} alt={alt} style={style} {...props} />;
};

export default MockNextImage;
