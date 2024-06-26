import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
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
  }, [userId, dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              mb: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Copperplate, Fantasy",
                flexShrink: 0,
              }}
            >
              {selectedUser ? `${selectedUser.name}` : "User Profile"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {selectedUser && (
              <Box sx={{ width: "100%", maxWidth: 600 }}>
                <UserInfo selectedUser={selectedUser} />
              </Box>
            )}
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
