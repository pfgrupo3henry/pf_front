import React from "react";
import { Card, Button, Input } from "antd";
import "./RatingWeb.css";

const RatingWeb = () => {
  return (
    <div className="rateForm">
      <Rate
        onChange={handleRatingChange}
        className="rateAux"
        allowHalf
        defaultValue={1}
        value={value}
      />
      <div className="inputButton">
        <Input
          className="form"
          placeholder={placeholder}
          bordered={false}
          onChange={(e) => handleChangeInput(e)}
          value={comment}
          type="text"
        />

        <Button
          className="buttonAux"
          style={{ backgroundColor: "rgba(9, 22, 29, 0.712)" }}
          type="primary"
          onClick={(e) => onClick(e)}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default RatingWeb;
