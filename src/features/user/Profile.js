import { Grid, Stack } from "@mui/material";

import useAuth from "../../hooks/useAuth";
import ExerciseForm from "../exercise/ExerciseForm";
import ExerciseLog from "../exercise/ExerciseLog";

function Profile({ profile }) {
  const { user } = useAuth();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>{profile}</Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          {user._id === profile._id && <ExerciseForm />}
          <ExerciseLog userId={profile._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
