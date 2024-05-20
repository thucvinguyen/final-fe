import { LoadingButton } from "@mui/lab";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginGoogle() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogle = () => {
    loginWithGoogle(navigate);
  };
  return (
    <LoadingButton
      fullWidth
      size="large"
      type="button"
      variant="contained"
      endIcon={
        <img
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png"
          alt="Google Icon"
          style={{ width: 24, height: 24 }}
        />
      }
      sx={{
        mt: 3,
        textTransform: "none",
        "& .MuiButton-label": { textTransform: "lowercase" },
      }}
      onClick={handleGoogle}
    >
      Login with Google
    </LoadingButton>
  );
}

export default LoginGoogle;
