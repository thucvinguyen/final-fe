import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityUsers } from "./userSlice";
import {
  Card,
  Grid,
  TablePagination,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchInput from "../../components/SearchInput";
import UserCard from "./UserCard";
import LoadingScreen from "../../components/LoadingScreen";

function UserList() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { currentPageUsers, usersById, totalUsers, isLoading, error } =
    useSelector((state) => state.user);

  const users = currentPageUsers.map((userId) => usersById[userId]);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  useEffect(() => {
    dispatch(
      getCommunityUsers({ filterName, page: page + 1, limit: rowsPerPage })
    );
  }, [filterName, page, rowsPerPage, dispatch]);

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <SearchInput handleSubmit={handleSubmit} />
            <Typography
              variant="subtitle"
              sx={{
                color: "text.secondary",
                ml: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {totalUsers > 1
                ? `${totalUsers} users found`
                : totalUsers === 1
                ? `${totalUsers} user found`
                : "No user found"}
            </Typography>

            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <LoadingScreen />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <Typography variant="h6" color="error">
                  {error.message ||
                    "Something went wrong. Please try again later."}
                </Typography>
              </Box>
            ) : (
              <UserCard users={users} />
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default UserList;
