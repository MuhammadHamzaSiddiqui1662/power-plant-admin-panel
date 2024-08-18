import React, { useEffect, useMemo, useState } from "react";
import { User, UserStatus } from "../../types/user";
import { Rating, Stack, styled, Typography } from "@mui/material";
import { useAppDispatch } from "../../config/store";
import { calculateRating } from "../../utils";
import ReviewCard from "./ReviewCard";
import {
  updateBrokerThunk,
  getUserHiringsThunk,
} from "../../features/user/userSlice";
import { Hiring } from "../../types/hiring";
import { toast } from "react-toastify";

interface CardProps {
  user: User;
}

const BrokerProfileCard: React.FC<CardProps> = ({ user }) => {
  const [hirings, setHirings] = useState<Hiring[]>([]);
  const dispatch = useAppDispatch();
  const ratingsAsBroker = useMemo(
    () => calculateRating(user.reviewsAsBorker!) || 0,
    []
  );

  const handleApprove = async () => {
    if (user) {
      try {
        await dispatch(
          updateBrokerThunk({
            id: user._id,
            status:
              user.brokerStatus === UserStatus.Active
                ? UserStatus.Suspended
                : UserStatus.Active,
          })
        ).unwrap();
        toast.success("Broker approved successfully!");
      } catch (error) {
        toast.error("Failed to approve broker. Please try again.");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { payload: hirings } = await dispatch(
        getUserHiringsThunk(user._id)
      );
      setHirings(hirings as Hiring[]);
    })();
  }, [dispatch, user._id]);

  const Certificate = styled("img")({
    width: 160,
    height: 160,
    borderRadius: 4,
  });

  const CardContainer = styled("div")({
    borderRadius: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    },
  });

  const CardContent = styled("div")({
    padding: "24px",
    backgroundColor: "#f9f9f9",
  });

  const List = styled("ul")({
    paddingTop: "16px",
    listStyle: "none",
  });

  const ListItem = styled("li")({
    marginBottom: "12px",
  });

  const Label = styled("span")({
    fontSize: "0.75rem",
    color: "#888",
    display: "block",
    marginBottom: "4px",
  });

  const Value = styled("p")({
    fontSize: "1rem",
    fontWeight: "500",
    color: "#444",
  });

  const ApproveButton = styled("button")({
    backgroundColor: "#34D399",
    color: "#fff",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#059669",
    },
    "&:disabled": {
      backgroundColor: "#D1D5DB",
      cursor: "not-allowed",
    },
  });

  return (
    <CardContainer>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Broker Profile
        </Typography>
        <List>
          <ListItem>
            <Label>Ratings</Label>
            <Rating
              name="ratings"
              precision={0.1}
              value={ratingsAsBroker}
              readOnly
            />
          </ListItem>
          <ListItem>
            <Label>Successful Projects</Label>
            <Value>{user.successfulDeals || 0}</Value>
          </ListItem>
          <ListItem>
            <Label>Projects In Progress</Label>
            <Value>{hirings.length || 0}</Value>
          </ListItem>
          <ListItem>
            <Label>Brokers</Label>
            <Value>
              {user.certificates && user.certificates.length > 0 ? (
                <Stack
                  direction={"row"}
                  overflow={"auto"}
                  gap={4}
                  width={"100%"}
                >
                  {user.certificates?.map((certificate, i) => (
                    <Certificate
                      key={i}
                      src={certificate.imageUrl}
                      alt={certificate.category}
                    />
                  ))}
                </Stack>
              ) : (
                "No Certifications"
              )}
            </Value>
          </ListItem>
          <ListItem>
            <Label>Reviews</Label>
            <Value>
              {user.reviewsAsInvestor && user.reviewsAsInvestor.length > 0 ? (
                <Stack
                  direction={"row"}
                  overflow={"auto"}
                  gap={4}
                  width={"100%"}
                >
                  {user.reviewsAsInvestor?.map((review) => (
                    <ReviewCard review={review} />
                  ))}
                </Stack>
              ) : (
                "No Reviews"
              )}
            </Value>
          </ListItem>
          <ListItem>
            <ApproveButton onClick={handleApprove}>
              {user.brokerStatus === UserStatus.Active
                ? "Suspend Broker"
                : "Approve Broker"}
            </ApproveButton>
          </ListItem>
        </List>
      </CardContent>
    </CardContainer>
  );
};

export default BrokerProfileCard;
