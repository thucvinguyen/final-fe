import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function UserCard({ users }) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <List sx={{ width: "100%", maxWidth: 400 }}>
        {users.map((user) => (
          <ListItem
            key={user._id}
            button
            component={RouterLink}
            to={`/user/${user._id}`}
            alignItems="flex-start"
            sx={{ borderRadius: 2, boxShadow: 2, my: 1 }}
          >
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatarUrl} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={`🎯: ${user.goal}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default UserCard;
