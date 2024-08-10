import React, { useEffect, useMemo, useState } from "react";
import { User } from "../../types/user";
import { Rating, Stack, styled, Typography } from "@mui/material";
import { getUserPersonalIps } from "../../features/ip/ipSlice";
import { useAppDispatch } from "../../config/store";
import { IP } from "../../types/ip";
import StickyHeadTable from "../Table/StickyHeadTable";
import { IP_COLUMNS, ROUTES, SEARCH_PARAMS } from "../../config/constants";
import { calculateRating, formatIPRows } from "../../utils";
import { useNavigate } from "react-router-dom";
import { IpStatus } from "../../enums";
import ReviewCard from "./ReviewCard";

interface CardProps {
  user: User;
}

const InnovatorProfileCard: React.FC<CardProps> = ({ user }) => {
  const [publishedIps, setPublishedIps] = useState<IP[]>([]);
  const [patentedIps, setPatentedIps] = useState<IP[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ratingsAsInnovator = useMemo(
    () => calculateRating(user.reviewsAsInnovator!) || 0,
    []
  );
  console.log("ratingsAsInnovator", ratingsAsInnovator);

  const handleRowClick = (row: IP) => {
    navigate(`../${row._id}?${SEARCH_PARAMS.status}=${ROUTES.published}`);
  };

  useEffect(() => {
    (async () => {
      const { payload: ips } = await dispatch(getUserPersonalIps(user._id));
      setPublishedIps(
        (ips as IP[]).filter((ip) => ip.status == IpStatus.Published)
      );
      setPatentedIps(
        (ips as IP[]).filter(
          (ip) =>
            ip.status == IpStatus.Published || ip.status == IpStatus.InActive
        )
      );
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
          Innovator Profile
        </Typography>
        <List>
          <ListItem>
            <Label>Ratings</Label>
            <Rating
              name="ratings"
              precision={0.1}
              value={ratingsAsInnovator}
              readOnly
            />
          </ListItem>
          <ListItem>
            <Label>Total Patented IPs</Label>
            <Value>{patentedIps.length}</Value>
          </ListItem>
          <ListItem>
            <Label>Total Published IPs</Label>
            <Value>{publishedIps.length}</Value>
          </ListItem>
          <ListItem>
            <Label>Published IPs</Label>
            <Value>
              <StickyHeadTable
                columns={IP_COLUMNS}
                rows={formatIPRows(publishedIps)}
                onRowClick={handleRowClick}
              />
            </Value>
          </ListItem>
          <ListItem>
            <Label>Reviews</Label>
            <Value>
              {user.reviewsAsInnovator && user.reviewsAsInnovator.length > 0 ? (
                <Stack
                  direction={"row"}
                  overflow={"auto"}
                  gap={4}
                  width={"100%"}
                >
                  {user.reviewsAsInnovator?.map((review) => (
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

export default InnovatorProfileCard;
