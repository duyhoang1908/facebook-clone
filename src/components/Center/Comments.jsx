import { Avatar } from "@mui/material";
import React from "react";

const Comments = ({ data }) => {
  return (
    <>
      {data && (
        <div key={data.id}>
          <div style={{ display: "flex", padding: "5px 10px" }}>
            <Avatar src={data.img} style={{ marginRight: "10px" }} />
            <div
              style={{
                backgroundColor: "RGB(240, 242, 245))",
                color: "#000",
                padding: "8px 12px",
                borderRadius: "20px",
                minWidth: "200px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: "bold" }}>
                {data.name}
              </h3>
              <p style={{ fontSize: "14px" }}>{data.comment}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
