/* eslint-disable prefer-const */
import * as React from "react";
import { Outlet } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import storage from "./storage";
import { verifyUser } from "../lib/auth";
import DemoLogin from "../Pages/Auth/DemoLogin";

function PrivateRoutes() {
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const handleModalClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const authToken = storage.getToken();
    if (authToken) {
      setOpen(false);
      setUser(verifyUser());
    }
  }, []);

  return user ? (
    <Outlet />
  ) : (
    <>
      <Outlet />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)",
        }}
        open={open}
      >
        <DemoLogin handleModalClose={handleModalClose} />
      </Backdrop>
    </>
  );
}

export default PrivateRoutes;
