import React from "react";

const createReturnScriptForArrowed = (firstText, secondText, title) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: "14px", color: "#999999" }}>{title}</span>
      <span style={{ marginTop: "1px" }}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333333",
            backgroundColor: "#dddddd",
          }}
        >
          {firstText}
        </span>{" "}
        <span style={{ color: "red", fontWeight: "bold", fontSize: "24px" }}>
          &rarr;
        </span>{" "}
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333333",
            backgroundColor: "#dddddd",
          }}
        >
          {secondText}
        </span>
      </span>
    </div>
  );
};

const createReturnScriptForNotArrowed = (firstText, title) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: "14px", color: "#999999" }}>{title}</span>
      <span style={{ marginTop: "1px" }}>
        <span
          style={{ fontSize: "16px", fontWeight: "bold", color: "#333333" }}
        >
          {firstText}
        </span>
      </span>
    </div>
  );
};

const TextBoxForGraph = ({
  isArrowed = false,
  firstText = "",
  secondText = "",
  title = "",
}) => {
  if (isArrowed) {
    return createReturnScriptForArrowed(firstText, secondText, title);
  } else {
    return createReturnScriptForNotArrowed(firstText, title);
  }
};

export default TextBoxForGraph;
