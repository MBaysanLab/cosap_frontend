import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { ReactComponent as BannerSVG } from "../../assets/images/banner.svg";
import { NavLink } from "react-router-dom";
import { demoLogin, verifyUser } from "../../lib/auth";

export function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}

function DemoLogin(props) {
  const isMounted = useIsMounted();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    verifyUser().then((data) => {
      if (isMounted.current) {
        setUser(data);
      }
    });
  }, []);

  async function handleAnonymousLogin() {
    {
      demoLogin()
        .then(() => {
          setUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (user) {
    props.handleModalClose();
  }

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: { xs: "100vw", md: "40vw" },
      }}
    >
      <CardContent sx={{ m: { xs: 1, sm: 2 } }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item sx={{ mb: 3 }}>
            <Box sx={{ width: "30px", height: "30px" }}>
              <BannerSVG />
            </Box>
          </Grid>
          <Grid item sx={{ mb: 3 }}>
            <Typography
              variant="body"
              component="div"
              textAlign="center"
              sx={{ display: { md: "flex" } }}
            >
              You can continue to use COSAP Platform without logging in.
              However, it is recommended that you log in to enjoy the full
              experience. Please note that the resources are even more limited
              for unauthenticated users.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mb: 3 }}
            display="flex"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAnonymousLogin}
            >
              Continue as Guest
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ mb: 3 }}
            display="flex"
            justifyContent="center"
          >
            <Button
              component={NavLink}
              variant="contained"
              color="primary"
              to="/login"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default DemoLogin;
