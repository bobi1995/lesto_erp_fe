import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "../components/Sidebar";
import Login from "../pages/Login";
import TurnOver from "../pages/Finance/TurnOver";
import Clients from "../pages/Finance/Clients";
import Material from "../pages/Purchase/Material";
import Items from "../pages/Purchase/Items";


const MainRoute = () => {
  return (
    <Router  >
      <SideBar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/purchase/material" element={<Material />} />
          <Route path="/purchase/items" element={<Items />} />
          <Route path="/finance/clients" element={<Clients />} />
          <Route path="/finance/turnover" element={<TurnOver />} />

        </Routes>
      </SideBar>

    </Router>
  );
};

export default MainRoute;   