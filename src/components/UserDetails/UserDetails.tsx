import { useEffect, useState } from "react";
import {
  Chip,
  Grid,
  CircularProgress,
  Typography,
  Box,
  Button,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../config/store";
import {
  getUsersThunk,
  approveBrokerThunk,
} from "../../features/user/userSlice";
import { AppDispatch } from "../../config/store";
import { UserStatus } from "../../types/user";

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const ProfileImage = styled("img")({
  width: "100%",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

const UserName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "2rem",
  fontWeight: "500",
}));

const UserInterests = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const CustomChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const ApproveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

export default function UserDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id: userId } = useParams<{ id: string }>();
  const [userType, setUserType] = useState<string>("");
  const typeFromState = useSelector((state: RootState) => state.auth.userType);

  const { users, isLoading, error, approvingId } = useSelector(
    (state: RootState) => state.user
  );

  const user = users.find((user) => user._id === userId);

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
      dispatch(approveBrokerThunk({ id: user._id, status: "Active" }));
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
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        {userProfileType} Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileImage
            src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
            alt="Profile"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="h1">
            <UserName>{user.name}</UserName>
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.interests && user.interests.length > 0
              ? user.interests[0]
              : "No Interests"}
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {user.about || "No details available"}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Interests
          </Typography>
          <UserInterests>
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((element, i) => (
                <CustomChip key={i} label={element} />
              ))
            ) : (
              <Typography>No Interests</Typography>
            )}
          </UserInterests>
          {user.brokerStatus === UserStatus.Pending && (
            <ApproveButton
              variant="contained"
              onClick={handleApprove}
              disabled={approvingId === user._id}
            >
              Approve
            </ApproveButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
