import React from "react";

interface StatusMapperProps {
  statusCode: number;
}

const StatusMapper: React.FC<StatusMapperProps> = ({ statusCode }) => {
  const statusCodes: { [key: number]: string } = {
    1: "Планиране",
    3: "Готов за започване",
    7: "Завършен",
  };
  const colorCodes: { [key: number]: string } = {
    1: "#6E5282",
    3: "#D66221",
    7: "#397514",
  };

  return (
    <div
      style={{
        backgroundColor: colorCodes[Math.floor(statusCode)] || "black",
        padding: 3,
        color: "white",
        borderRadius: 15,
      }}
    >
      {statusCodes[Math.floor(statusCode)] || "Invalid code"}
    </div>
  );
};

export default StatusMapper;
