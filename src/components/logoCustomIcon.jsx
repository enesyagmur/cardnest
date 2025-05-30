import React from "react";

const LogoCustomIcon = () => {
  return (
    <div className="relative w-[10vw] min-w-[15px] max-w-[25px] aspect-square shadow-sm mb-2">
      {/* Katman 1 - En alttaki */}
      <div
        className="absolute bg-pink-400 rotate-45"
        style={{
          width: "100%",
          height: "100%",
          top: "30%",
          left: "0%",
          borderRadius: "6px",
          zIndex: 1,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        }}
      />

      {/* Katman 2 */}
      <div
        className="absolute bg-purple-400 rotate-45"
        style={{
          width: "90%",
          height: "90%",
          top: "20%",
          left: "5%",
          borderRadius: "6px",
          zIndex: 2,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        }}
      />

      {/* Katman 3 */}
      <div
        className="absolute bg-blue-400 rotate-45"
        style={{
          width: "80%",
          height: "80%",
          top: "10%",
          left: "10%",
          borderRadius: "6px",
          zIndex: 3,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        }}
      />

      {/* Katman 4 - En üstteki */}
      <div
        className="absolute bg-green-400 rotate-45"
        style={{
          width: "70%",
          height: "70%",
          top: "0%",
          left: "15%",
          borderRadius: "6px",
          zIndex: 4,
          boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
};

export default LogoCustomIcon;
