/* eslint-disable prefer-const */
import * as React from "react";
import { Outlet } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import storage from "./storage";
import { verifyUser } from "../lib/auth";
import DemoLogin from "../Pages/Auth/DemoLogin";
import postResendVerification from "../apis/postResendVerification";
import Alert from "@mui/material/Alert";

function PrivateRoutes() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [emailVerified, setEmailVerified] = React.useState(true);
  const [emailSent, setEmailSent] = React.useState(false);
  const [emailError, setEmailError] = React.useState(null);

  const handleModalClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const authToken = storage.getToken();
    if (authToken) {
      try {
        verifyUser().then((data) => {
          setUser(data);
          setEmailVerified(data.is_email_verified);
        });
      } catch (error) {
        setUser(null);
        setEmailVerified(false);
      }
    } else {
      setUser(null);
      setEmailVerified(false);
    }
  }, []);

  React.useEffect(() => {
    if (!emailVerified) {
      setOpen(true);
    } else {
      setOpen(false);
      console.log(emailVerified);
    }
  }, [emailVerified]);

  // Function to resend verification email
  const handleResendVerification = () => {
    const email = user.email; // Get the user's email from the user object
    setEmailSent(false);
    setEmailError(null);

    postResendVerification(email)
      .then((response) => {
        console.log("Verification email resent successfully:", response);
        setEmailSent(true);
      })
      .catch((error) => {
        console.error("Error resending verification email:", error);
        setEmailError("Failed to send verification email. Please try again.");
      });
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  return user ? (
    <>
      <Outlet />
      {!emailVerified && (
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backdropFilter: "blur(5px)",
          }}
          open={open}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              maxWidth: 500,
              textAlign: "center",
              color: "#1F2937", // Explicitly set the text color for the Box
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ color: "#1F2937" }} // Explicitly set the color
            >
              Email Verification Required
            </Typography>

            {emailSent && (
              <Alert severity="success" sx={{ mb: 3, textAlign: "left" }}>
                Verification email sent successfully! Please check your inbox
                and click the verification link.
              </Alert>
            )}

            {emailError && (
              <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
                {emailError}
              </Alert>
            )}

            <Typography
              variant="body1"
              sx={{ mb: 3, color: "#4B5563" }} // Explicitly set the color
            >
              Your email address has not been verified yet. Please check your
              inbox for a verification link or request a new one.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={handleResendVerification}
                sx={{ color: "#FFFFFF" }} // Ensure button text is white for contrast
                disabled={emailSent}
              >
                {emailSent ? "Email Sent" : "Resend Verification"}
              </Button>

              {emailSent && (
                <Button
                  variant="outlined"
                  onClick={handleRefreshPage}
                  sx={{ color: "#2563EB" }}
                >
                  Refresh Page
                </Button>
              )}
            </Box>
          </Box>
        </Backdrop>
      )}
    </>
  ) : (
    <>
      <Outlet />
      <Backdrop
        sx={{
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
