import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, Link as RouterLink } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { FormProvider, FSelect, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  goal: Yup.string()
    .oneOf(["Lose fat", "Gain muscle", "Maintain health"])
    .required("Goal is required"),
  gender: Yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  weight: Yup.number().required("Weight is required"),
  height: Yup.number().required("Height is required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  goal: "Lose fat",
  gender: "Male",
  height: "",
  weight: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password, goal, gender, height, weight } = data;
    try {
      await auth.register(
        { name, email, password, goal, gender, height, weight },
        () => {
          navigate("/", { replace: true });
        }
      );
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Sign in
            </Link>
          </Alert>

          <FTextField name="name" label="Full name" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FSelect name="gender" label="Gender">
            {[{ label: "Male" }, { label: "Female" }].map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FSelect name="goal" label="Goal">
            {[
              { label: "Lose fat" },
              { label: "Gain muscle" },
              { label: "Maintain health" },
            ].map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FTextField name="height" label="Height" />
          <FTextField name="weight" label="Weight" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              textTransform: "none",
              "& .MuiButton-label": { textTransform: "lowercase" },
            }}
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
