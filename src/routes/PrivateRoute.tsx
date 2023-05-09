import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }: any) {
  return localStorage.getItem("erpToken") ? (
    <>
      <Component />
    </>
  ) : (
    <Navigate to="/" />
  );
}
export default PrivateRoute;
