import React, { useEffect, useMemo, useState } from "react";
import { User } from "../../types/user";
import { Rating, Stack, styled, Typography } from "@mui/material";
import { useAppDispatch } from "../../config/store";
import { IP } from "../../types/ip";
import StickyHeadTable from "../Table/StickyHeadTable";
import { HIRINGS_COLUMNS, ROUTES, SEARCH_PARAMS } from "../../config/constants";
import { calculateRating, formatHiringRows } from "../../utils";
import { useNavigate } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { getUserHiringsThunk } from "../../features/user/userSlice";
import { Hiring } from "../../types/hiring";

interface CardProps {
  user: User;
}

const InvestorProfileCard: React.FC<CardProps> = ({ user }) => {
  const [hirings, setHirings] = useState<Hiring[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ratingsAsInvestor = useMemo(
    () => calculateRating(user.reviewsAsInvestor!) || 0,
    []
  );

  const handleRowClick = (row: IP) => {
    navigate(`../${row._id}?${SEARCH_PARAMS.status}=${ROUTES.published}`);
  };

  useEffect(() => {
    (async () => {
      const { payload: hirings } = await dispatch(
        getUserHiringsThunk(user._id)
      );
      console.log("hirings", hirings);
      setHirings(hirings as Hiring[]);
    })();
  }, [dispatch]);

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

  return (
    <CardContainer>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Investor Profile
        </Typography>
        <List>
          <ListItem>
            <Label>Ratings</Label>
            <Rating
              name="ratings"
              precision={0.1}
              value={ratingsAsInvestor}
              readOnly
            />
          </ListItem>
          <ListItem>
            <Label>Total Hired Brokers</Label>
            <Value>{user.totalBrokersHired || 0}</Value>
          </ListItem>
          <ListItem>
            <Label>Current Hired Brokers</Label>
            <Value>{hirings.length || 0}</Value>
          </ListItem>
          <ListItem>
            <Label>Brokers</Label>
            <Value>
              {hirings && hirings.length > 0 ? (
                <StickyHeadTable
                  columns={HIRINGS_COLUMNS}
                  rows={formatHiringRows(hirings)}
                  onRowClick={handleRowClick}
                />
              ) : (
                "No Brokers Hired"
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
        </List>
      </CardContent>
    </CardContainer>
  );
};

export default InvestorProfileCard;
