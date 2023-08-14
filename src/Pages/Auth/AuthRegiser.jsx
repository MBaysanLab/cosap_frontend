import { useState } from "react";
import * as React from "react";
import {
  Box,
  Button,
  FormControl,
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
import { registerFn, verifyUser } from "../../lib/auth";

const AuthRegister = () => {
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
      await registerFn(values)
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          setErrors({ submit: err.response.data[0] });
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
          <Box sx={{ mb: 1 }}>
            <Typography variant="subtitle1">
              Register with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          affiliation: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().max(255).required("First name is required"),
          last_name: Yup.string().max(255).required("Last name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
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
            <Stack direction="row" spacing={1}>
              <FormControl
                error={Boolean(touched.first_name && errors.first_name)}
                sx={{ mb: 1 }}
              >
                <InputLabel color="button">First Name</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.first_name}
                  name="first_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="First Name"
                />
                {touched.first_name && errors.first_name && (
                  <FormHelperText error>{errors.first_name}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                error={Boolean(touched.last_name && errors.last_name)}
                sx={{ mb: 1 }}
              >
                <InputLabel color="button">Last Name</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.last_name}
                  name="last_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Last Name"
                />
                {touched.last_name && errors.last_name && (
                  <FormHelperText error>{errors.last_name}</FormHelperText>
                )}
              </FormControl>
            </Stack>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ mb: 1, mt: 1 }}
            >
              <InputLabel color="button">Email Address</InputLabel>
              <OutlinedInput
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
              />
              {touched.email && errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ mb: 1 }}
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
            <FormControl
              fullWidth
              error={Boolean(
                touched.passwordConfirmation && errors.passwordConfirmation
              )}
              sx={{ mb: 1 }}
            >
              <InputLabel color="button">Password Again</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={values.passwordConfirmation}
                name="passwordConfirmation"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password Again"
                inputProps={{}}
              />
              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <FormHelperText error>
                  {errors.passwordConfirmation}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ mb: 1 }}
            >
              <InputLabel color="button">Affiliation</InputLabel>
              <OutlinedInput
                type="affiliation"
                value={values.affiliation}
                name="affiliation"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Affiliation"
                inputProps={{}}
              />
              {touched.affiliation && errors.affiliation && (
                <FormHelperText error>{errors.affiliation}</FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 2 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 1 }}>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                color="secondary"
              >
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
