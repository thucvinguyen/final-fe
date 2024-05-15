import React, { useEffect } from "react";
import { Typography, Card, CardContent, Grid, Link } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { getCurrentUserFull } from "../features/user/userSlice"; // Adjust the path as necessary
import { useDispatch, useSelector } from "react-redux";

function BodyMassIndex({ user }) {
  // const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  // const { user, isLoading, error } = useSelector((state) => ({
  //   user: state.user.updatedProfile,
  //   isLoading: state.user.isLoading,
  //   error: state.user.error,
  // }));

  // useEffect(() => {
  //   dispatch(getCurrentUserFull());
  // }, [dispatch]);

  // if (isLoading) {
  //   return <Typography>Loading...</Typography>;
  // }

  // if (error) {
  //   return <Typography>Error: {error}</Typography>;
  // }

  // if (!user) {
  //   return null;
  // }

  const { weight, height, gender } = user;

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };
  const bmi = calculateBMI();

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) {
      return "You're currently underweight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "You have a healthy weight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      return "You're currently overweight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    } else {
      return "You're currently obese. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
    }
  };
  const bmiStatus = getBMIStatus(bmi);

  let title;
  if (path === "/me") {
    title = "Profile";
  } else if (path === "/features/calorie-dashboard") {
    title = "Calorie Dashboard";
  }

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 40,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <h3 style={{ textAlign: "center" }}>Height:</h3>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                variant="body1"
              >
                {height} cm
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 40,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <h3 style={{ textAlign: "center" }}>Weight:</h3>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                variant="body1"
              >
                {weight} kg
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 40,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <h3 style={{ textAlign: "center" }}>Gender:</h3>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                variant="body1"
              >
                {gender}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 40,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <h3 style={{ textAlign: "center" }}>BMI:</h3>
              <Typography
                sx={{ display: "flex", justifyContent: "center" }}
                variant="body1"
              >
                {bmi}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        sx={{
          mt: 3,
        }}
      >
        <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            component={RouterLink}
            to="/account"
            sx={{ textDecoration: "underline" }}
          >
            Update your information here to re-calculate BMI
          </Link>
        </Typography>
      </Grid>

      <Grid
        sx={{
          mt: 3,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontStyle: "italic" }}>{bmiStatus}</Typography>
      </Grid>
    </>
  );
}

export default BodyMassIndex;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Typography, Card, CardContent, Grid, Link } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import { getCurrentUserFull } from "../features/user/userSlice";

// function BodyMassIndex() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const path = location.pathname;

//   const { user, isLoading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(getCurrentUserFull());
//   }, [dispatch]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const { weight, height, gender } = user;

//   const calculateBMI = () => {
//     const heightInMeters = height / 100;
//     const bmi = weight / (heightInMeters * heightInMeters);
//     return bmi.toFixed(1);
//   };
//   const bmi = calculateBMI();

//   const getBMIStatus = (bmi) => {
//     if (bmi < 18.5) {
//       return "You're currently underweight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
//     } else if (bmi >= 18.5 && bmi <= 24.9) {
//       return "You have a healthy weight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
//     } else if (bmi >= 25.0 && bmi <= 29.9) {
//       return "You're currently overweight. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
//     } else {
//       return "You're currently obese. Note: BMI can give you an indication as to whether you’re at a healthy weight for your height, it’s far from perfect. BMI calculations and charts don’t adjust for your gender, age, race, ethnicity and other factors, which can impact your body fat and muscle—and therefore skew your BMI higher or lower. ";
//     }
//   };
//   const bmiStatus = getBMIStatus(bmi);

//   let title;
//   if (path === "/me") {
//     title = "Profile";
//   } else if (path === "/features/calorie-dashboard") {
//     title = "Calorie Dashboard";
//   }

//   return (
//     <>
//       <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
//         {title}
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Card
//             variant="outlined"
//             sx={{
//               borderRadius: 40,
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CardContent>
//               <h3 style={{ textAlign: "center" }}>Height:</h3>
//               <Typography
//                 sx={{ display: "flex", justifyContent: "center" }}
//                 variant="body1"
//               >
//                 {height} cm
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Card
//             variant="outlined"
//             sx={{
//               borderRadius: 40,
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CardContent>
//               <h3 style={{ textAlign: "center" }}>Weight:</h3>
//               <Typography
//                 sx={{ display: "flex", justifyContent: "center" }}
//                 variant="body1"
//               >
//                 {weight} kg
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Card
//             variant="outlined"
//             sx={{
//               borderRadius: 40,
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CardContent>
//               <h3 style={{ textAlign: "center" }}>Gender:</h3>
//               <Typography
//                 sx={{ display: "flex", justifyContent: "center" }}
//                 variant="body1"
//               >
//                 {gender}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Card
//             variant="outlined"
//             sx={{
//               borderRadius: 40,
//               boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CardContent>
//               <h3 style={{ textAlign: "center" }}>BMI:</h3>
//               <Typography
//                 sx={{ display: "flex", justifyContent: "center" }}
//                 variant="body1"
//               >
//                 {bmi}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       <Grid
//         sx={{
//           mt: 3,
//         }}
//       >
//         <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Link
//             component={RouterLink}
//             to="/account"
//             sx={{ textDecoration: "underline" }}
//           >
//             Update your information here to re-calculate BMI
//           </Link>
//         </Typography>
//       </Grid>

//       <Grid
//         sx={{
//           mt: 3,
//           textAlign: "center",
//         }}
//       >
//         <Typography sx={{ fontStyle: "italic" }}>{bmiStatus}</Typography>
//       </Grid>
//     </>
//   );
// }

// export default BodyMassIndex;

// import React from "react";

// function BodyMassIndex() {
//   return <div>BodyMassIndex</div>;
// }

// export default BodyMassIndex;
