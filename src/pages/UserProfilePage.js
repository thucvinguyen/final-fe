import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import { animated, useSpring } from "react-spring";

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

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const infoAnimation = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0)" },
    config: { duration: 500 },
  });

  const fitnessAnimation = useSpring({
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(0)" },
    config: { duration: 500 },
  });

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              mb: 4,
              fontFamily: "Copperplate, Fantasy",
            }}
          >
            {selectedUser ? `${selectedUser.name}'s profile` : "User Profile"}
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
              height: 280,
              position: "relative",
              padding: 2,
            }}
          >
            {selectedUser && (
              <>
                <Grid item xs={12} md={5}>
                  <animated.div style={infoAnimation}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h5"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 1,
                            fontFamily: "Copperplate, Fantasy",
                          }}
                        >
                          Information
                        </Typography>
                        <Grid container spacing={2} alignItems="center">
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            sx={{ textAlign: "center" }}
                          >
                            <Avatar
                              alt={selectedUser.name}
                              src={selectedUser.avatarUrl}
                              sx={{ width: 120, height: 120 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <Typography sx={{ marginBottom: 1 }}>
                              Name: {selectedUser.name}
                            </Typography>
                            <Typography sx={{ marginBottom: 1 }}>
                              Email: {selectedUser.email}
                            </Typography>
                            <Typography sx={{ marginBottom: 1 }}>
                              Gender: {selectedUser.gender}
                            </Typography>
                            <Typography sx={{ marginBottom: 1 }}>
                              BMI:{" "}
                              {calculateBMI(
                                selectedUser.weight,
                                selectedUser.height
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </animated.div>
                </Grid>

                <Grid item xs={12} md={7}>
                  <animated.div style={fitnessAnimation}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h5"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 1,
                            fontFamily: "Copperplate, Fantasy",
                          }}
                        >
                          Fitness Tracker
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: 2,
                              }}
                            >
                              Exercises
                            </Typography>
                            {selectedUser.exercise.length === 0 ? (
                              <Typography sx={{ textAlign: "center" }}>
                                Nothing to show yet
                              </Typography>
                            ) : (
                              selectedUser.exercise.map((exercise, index) => (
                                <div key={index} sx={{ marginBottom: 1 }}>
                                  <Card sx={{ margin: 2 }}>
                                    <Typography sx={{ ml: 2 }}>
                                      Name: {exercise.name}
                                    </Typography>
                                    <Typography sx={{ ml: 2 }}>
                                      Expenditure: {exercise.caloriesBurned}{" "}
                                      calories
                                    </Typography>
                                  </Card>
                                </div>
                              ))
                            )}
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: 2,
                              }}
                            >
                              Meals
                            </Typography>
                            {selectedUser.meal.length === 0 ? (
                              <Typography sx={{ textAlign: "center" }}>
                                Nothing to show yet
                              </Typography>
                            ) : (
                              selectedUser.meal.map((meal, index) => (
                                <div key={index} sx={{ marginBottom: 1 }}>
                                  <Card sx={{ margin: 2 }}>
                                    <Typography sx={{ ml: 2 }}>
                                      Name: {meal.name}
                                    </Typography>
                                    <Typography sx={{ ml: 2 }}>
                                      Intake: {meal.calories} calories
                                    </Typography>
                                  </Card>
                                </div>
                              ))
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </animated.div>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      )}
    </>
  );
}

export default UserProfilePage;
