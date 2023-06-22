import React from "react";

interface StatusMapperSFCProps {
  statusCode: number;
}

const StatusMapperSFC: React.FC<StatusMapperSFCProps> = ({ statusCode }) => {
  const statusCodes: { [key: number]: string } = {
    20: "Създадена",
    60: "Пуснат",
    70: "Активен",
    90: "Приключено",
    100: "Закрити",
  };
  const colorCodes: { [key: number]: string } = {
    20: "#CBEBF4",
    60: "#E4C672",
    70: "#D5F6C0",
    90: "#AFDC91",
    100: "#8DC9E6",
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

export default StatusMapperSFC;
