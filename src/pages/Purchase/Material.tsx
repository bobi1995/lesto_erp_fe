import Main from "./Material/Main";
import FetchDataBtn from "../../components/FetchDataBtn";
const Material = () => {
  return (
    <div style={{ width: "100%" }}>
      <FetchDataBtn department={"purchase"} />
      <Main />
    </div>
  );
};

export default Material;
