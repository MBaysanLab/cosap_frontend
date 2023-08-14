import React from "react";

const TagList = ({ tags }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {tags.map((tag, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#f2f2f2",
            padding: "4px 8px",
            borderRadius: "4px",
            margin: "4px",
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagList;
