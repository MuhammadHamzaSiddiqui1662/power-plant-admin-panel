import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUserThunk } from "../../features/user/userSlice";
import { AppDispatch } from "../../config/store";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { User } from "../../types/user";
import GeneralProfileCard from "../../components/Card/GeneralProfileCard";
import { Stack } from "@mui/material";
import InnovatorProfileCard from "../../components/Card/InnovatorProfileCard";
import InvestorProfileCard from "../../components/Card/InvestorProfileCard";
import BrokerProfileCard from "../../components/Card/BrokerProfileCard";
import { useGetUserQuery } from "../../services/user";

export default function UserDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useGetUserQuery(userId);

  const handleUpdateUser = (id: string, data: Partial<User>) => {
    dispatch(updateUserThunk({ id, data }));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    // @ts-ignore
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!user) {
    return <Typography>No user found.</Typography>;
  }

  return (
    <Stack padding={3} bgcolor="background.default" gap={2}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <GeneralProfileCard
        user={user}
        onSave={(updatedUser) => handleUpdateUser(user._id, updatedUser)}
      />
      <InnovatorProfileCard user={user} />
      <InvestorProfileCard user={user} />
      <BrokerProfileCard user={user} />
    </Stack>
  );
}
