import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../config/store";
import { getUsersThunk } from "../../features/user/userSlice";
import { AppDispatch } from "../../config/store";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { User } from "../../types/user";
import GeneralProfileCard from "../Card/GeneralProfileCard";
import { Stack } from "@mui/material";
import InnovatorProfileCard from "../Card/InnovatorProfileCard";
import InvestorProfileCard from "../Card/InvestorProfileCard";
import BrokerProfileCard from "../Card/BrokerProfileCard";

export default function UserDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useParams<{ id: string }>();

  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  const user = useMemo(
    () => users.find((user: User) => user._id === userId),
    [users, userId]
  );

  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch, userId]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>No user found.</Typography>;
  }

  return (
    <Stack padding={3} bgcolor="background.default" gap={2}>
      <Typography variant="h4" align="center" gutterBottom>
        User Profile
      </Typography>
      <GeneralProfileCard user={user} />
      <InnovatorProfileCard user={user} />
      <InvestorProfileCard user={user} />
      <BrokerProfileCard user={user} />
    </Stack>
  );
}
