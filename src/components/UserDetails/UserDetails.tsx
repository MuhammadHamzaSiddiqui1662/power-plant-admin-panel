import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../config/store";
import {
  getUsersThunk,
  approveBrokerThunk,
} from "../../features/user/userSlice";
import { AppDispatch } from "../../config/store";
import Card from "../Card/card";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { User, UserStatus } from "../../types/user";

export default function UserDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useParams<{ id: string }>();
  const [userType, setUserType] = useState<string>("");
  const typeFromState = useSelector((state: RootState) => state.auth.userType);

  const { users, isLoading, error, approvingId } = useSelector(
    (state: RootState) => state.user
  );

  const user = users.find((user: User) => user._id === userId);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeFromParams = params.get("userType");
    setUserType(typeFromParams || typeFromState);
  }, [typeFromState]);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  const handleApprove = () => {
    if (user) {
      dispatch(approveBrokerThunk({ id: user._id, status: UserStatus.Active }));
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>No user found.</Typography>;
  }

  const userProfileType = (() => {
    switch (userType) {
      case "0":
        return "Innovator";
      case "1":
        return "Investor";
      case "2":
        return "Broker";
      default:
        return "User";
    }
  })();

  return (
    <Box padding={3} bgcolor="background.default">
      <Typography variant="h4" align="center" gutterBottom>
        {userProfileType} Profile
      </Typography>
      <Card
        name={user.name}
        description={user.about || "No details available"}
        year={user.createdAt || new Date()}
        categories={user.interests}
        profileImage={user.imageUrl}
        brokerStatus={user.brokerStatus}
        userType={userProfileType}
        handleApprove={handleApprove}
        isApproving={approvingId === user._id}
      />
    </Box>
  );
}
