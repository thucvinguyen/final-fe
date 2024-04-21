// import React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { Box, Typography, Button } from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { FTextField } from "../../components/form";
// import { useDispatch } from "react-redux";
// import { createMeal } from "./mealSlice";

// const mealSchema = yup.object().shape({
//   name: yup.string().required("Meal name is required"),
//   calories: yup.number().required("Calories is required").positive().integer(),
// });

// const defaultValues = {
//   name: "",
//   calories: "",
// };

// function MealForm({ onMealCreated }) {
//   const dispatch = useDispatch();
//   const mealFormMethods = useForm({
//     resolver: yupResolver(mealSchema),
//     defaultValues,
//   });
//   const onSubmit = (data) => {
//     const mealData = {
//       ...data,
//     };
//     dispatch(createMeal(data));
//     onMealCreated(mealData);
//   };

//   return (
//     <FormProvider {...mealFormMethods}>
//       <form onSubmit={mealFormMethods.handleSubmit(onSubmit)}>
//         <Box>
//           <Typography variant="h6" textAlign="center">
//             Log Meal
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               mt: 2,
//             }}
//           >
//             <FTextField
//               name="name"
//               label="Meal Name"
//               sx={{ width: "60%", mt: 2 }}
//             />
//             <FTextField
//               name="calories"
//               label="Calories"
//               type="number"
//               sx={{ width: "60%", mt: 2 }}
//             />
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//             <Button type="submit" variant="contained" color="primary">
//               Add Meal
//             </Button>
//           </Box>
//         </Box>
//       </form>
//     </FormProvider>
//   );
// }

// export default MealForm;

import React from "react";

function MealForm() {
  return <div>MealForm</div>;
}

export default MealForm;
