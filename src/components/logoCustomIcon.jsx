import React from "react";

const LogoCustomIcon = () => {
  return (
    <div className="relative w-[6vw] min-w-[12px] max-w-[16px] aspect-square shadow-sm">
      {/* Alt katman */}
      <div
        className="absolute bg-pink-300 rotate-45"
        style={{
          width: "70%",
          height: "70%",
          top: "30%",
          left: "20%",
          borderRadius: "3px",
          zIndex: 1,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginTop: "2%",
        }}
      />
      {/* Orta katman */}
      <div
        className="absolute bg-blue-300 rotate-45"
        style={{
          width: "70%",
          height: "70%",
          top: "10%",
          left: "20%",
          borderRadius: "3px",
          zIndex: 2,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          marginTop: "1%",
        }}
      />
      {/* Üst katman */}
      <div
        className="absolute bg-green-300 rotate-45"
        style={{
          width: "70%",
          height: "70%",
          top: "-10%",
          left: "20%",
          borderRadius: "3px",
          zIndex: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};

export default LogoCustomIcon;
