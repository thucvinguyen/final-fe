import React, { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import { animated, useSpring } from "react-spring";
import UserInfo from "../features/user/UserInfo";
import UserChart from "../features/user/UserChart";

function UserProfilePage() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId));
    }
  }, []);

  const infoAnimation = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0)" },
    config: { duration: 500 },
  });

  // const fitnessAnimation = useSpring({
  //   from: { transform: "translateX(100%)" },
  //   to: { transform: "translateX(0)" },
  //   config: { duration: 500 },
  // });

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mt: 4,
              mb: 4,
              fontFamily: "Copperplate, Fantasy",
            }}
          >
            {selectedUser ? `${selectedUser.name}` : "User Profile"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <animated.div style={infoAnimation}>
              {selectedUser && <UserInfo selectedUser={selectedUser} />}
            </animated.div>
          </Box>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            {selectedUser && <UserChart selectedUser={selectedUser} />}
          </Box>
        </>
      )}
    </>
  );
}

export default UserProfilePage;
