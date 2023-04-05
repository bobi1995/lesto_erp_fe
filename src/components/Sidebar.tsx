import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MenuIcon from "@mui/icons-material/Menu";

const StyledSubMenu = ({ children, label }: any) => {
  return (
    <SubMenu
      label={label}
      style={{
        backgroundColor: "#2F2F32",
        color: "white",
      }}
    >
      {children}
    </SubMenu>
  );
};

const StyledMenuItem = ({ children, component }: any) => {
  return (
    <MenuItem
      style={{
        backgroundColor: "#2F2F32",
        color: "white",
        height: 30,
      }}
      component={component}
    >
      <div
        style={{
          marginLeft: 15,
        }}
      >
        <LaunchIcon
          style={{
            fontSize: 14,
            verticalAlign: "middle",
            display: "inline-block",
          }}
        />{" "}
        <Typography
          style={{
            fontSize: 14,
            verticalAlign: "middle",
            display: "inline-block",
          }}
        >
          {children}
        </Typography>
      </div>
    </MenuItem>
  );
};

const SideBar = ({ children }: any) => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "black",
      }}
    >
      <Sidebar
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <div className="css-dip3t8" style={{ backgroundColor: "#2F2F32" }}>
          <div
            style={{
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <img
              src={require("../pictures/infor.png")}
              height={35}
              width={"30%"}
              style={{ padding: 3 }}
            />
            <img
              src={require("../pictures/lesto.png")}
              height={35}
              width={"100%"}
              style={{ padding: 3 }}
            />
          </div>
          <main
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MenuIcon
              onClick={() => collapseSidebar()}
              style={{ color: "white" }}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
            <Typography
              sx={{
                color: "white",
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => collapseSidebar()}
            >
              Меню
            </Typography>
          </main>
          <Menu>
            <StyledSubMenu
              label={
                <div>
                  <PaymentsIcon
                    style={{
                      fontSize: 17,
                      verticalAlign: "middle",
                      display: "inline-block",
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: 17,
                      verticalAlign: "middle",
                      display: "inline-block",
                      marginLeft: 10,
                    }}
                  >
                    Финанси
                  </Typography>
                </div>
              }
            >
              <StyledMenuItem component={<Link to="/finance/turnover" />}>
                {" "}
                Оборот{" "}
              </StyledMenuItem>
              <StyledMenuItem component={<Link to="/finance/clients" />}>
                {" "}
                Клиенти{" "}
              </StyledMenuItem>
            </StyledSubMenu>
            <StyledSubMenu
              label={
                <div>
                  <CreditCardIcon
                    style={{
                      fontSize: 17,
                      verticalAlign: "middle",
                      display: "inline-block",
                    }}
                  />
                  <Typography
                    style={{
                      fontSize: 17,
                      verticalAlign: "middle",
                      display: "inline-block",
                      marginLeft: 10,
                    }}
                  >
                    Доставки
                  </Typography>
                </div>
              }
            >
              <StyledMenuItem component={<Link to="/purchase/material" />}>
                {" "}
                Материали{" "}
              </StyledMenuItem>
              <StyledMenuItem component={<Link to="/purchase/items" />}>
                {" "}
                Артикули{" "}
              </StyledMenuItem>
            </StyledSubMenu>
          </Menu>
        </div>
      </Sidebar>
      <div style={{ backgroundColor: "white", width: "100%" }}>{children}</div>
    </div>
  );
};

export default SideBar;
