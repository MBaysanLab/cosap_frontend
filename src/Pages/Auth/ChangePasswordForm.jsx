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
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../apis";

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  async function handleSubmit(values, { setErrors }) {
    {
      changePassword(values)
        .then(() => {
          navigate("/portal");
        })
        .catch((err) => {
          setErrors({ password: "asdfdsa" });
        });
    }
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
            <Typography variant="subtitle1">Change Your Password</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object().shape({
          new_password: Yup.string()
            .notOneOf(
              [Yup.ref("old_password")],
              "Select a different password from your old password"
            )
            .required("New password is required"),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("new_password"), null],
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
            <FormControl
              fullWidth
              error={Boolean(touched.old_password && errors.old_password)}
              sx={{ mb: 1 }}
            >
              <InputLabel color="button">Old Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={values.old_password}
                name="old_password"
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
                label="Old Password"
                inputProps={{}}
              />
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.new_password && errors.new_password)}
              sx={{ mb: 1 }}
            >
              <InputLabel color="button">New Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={values.new_password}
                name="new_password"
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
                label="New Password"
                inputProps={{}}
              />
              {touched.new_password && errors.new_password && (
                <FormHelperText error>{errors.new_password}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(
                touched.passwordConfirmation && errors.passwordConfirmation
              )}
              sx={{ mb: 1 }}
            >
              <InputLabel color="button">New Password Again</InputLabel>
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
            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                color="secondary"
              >
                Change Password
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordForm;
