import { useState } from "react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";
import { Navigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginFn, verifyUser } from "../../lib/auth";

const AuthLogin = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [user, setUser] = React.useState(null);

  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    verifyUser().then((data) => {
      setUser(data);
    });
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit(values, { setErrors }) {
    {
      loginFn(values)
        .then(() => {
          setUser(true);
        })
        .catch((err) => {
          setErrors({ password: "Invalid Username/Password" });
        });
    }
  }

  if (user) {
    return <Navigate replace to="/portal" />;
  }
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ mb: 3 }}
            >
              <InputLabel color="button">Email Address</InputLabel>
              <OutlinedInput
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel color="button">Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="secondary"
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="subtitle2"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                color="secondary"
              >
                Sign in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
