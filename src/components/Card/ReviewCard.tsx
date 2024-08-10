import React from "react";
import { Review } from "../../types/user";
import { Rating, Stack, styled } from "@mui/material";
import { useAppSelector } from "../../config/store";

interface CardProps {
  review: Review;
}

const ReviewCard: React.FC<CardProps> = ({ review }) => {
  const reviewer = useAppSelector(
    (state) => state.user.users.filter((user) => user._id == review.userId)[0]
  );
  const rating =
    (review.behaviour +
      review.communication +
      review.priceNegotiation +
      review.responsiveness +
      review.technicalSkills) /
    5;
  const ProfileImage = styled("img")({
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  });

  const CardContainer = styled("div")({
    width: 300,
    minWidth: 300,
    height: "fit-content",
    borderRadius: "16px",
    backgroundColor: "#fff",
    border: "1px solid #8F98A5",
    overflow: "hidden",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
  });

  const CardContent = styled("div")({
    padding: 16,
  });

  const Title = styled("span")({
    fontSize: "1rem",
    fontWeight: "600",
    display: "block",
  });

  const Email = styled("span")({
    fontSize: 14,
    fontWeight: 400,
    color: "#64748B",
    display: "block",
    marginBottom: "8px",
  });

  const Description = styled("p")({
    marginTop: "8px",
    marginBottom: "8px",
    fontWeight: 400,
    lineHeight: 1.2,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 5,
    overflow: "hidden",
    textOverflow: "ellipsis",
  });

  const Dated = styled("span")({
    fontSize: 12,
    fontWeight: 400,
    color: "#64748B",
    display: "block",
  });

  const List = styled("ul")({
    listStyle: "none",
  });

  const ListItem = styled("li")({
    marginBottom: "12px",
    ":last-of-type": {
      marginBottom: 0,
    },
  });

  return (
    <CardContainer>
      <CardContent>
        <List>
          <ListItem>
            <Stack direction={"row"} gap={2}>
              <ProfileImage
                src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                alt="Profile"
              />
              <Stack>
                <Title>{reviewer.name}</Title>
                <Email>{reviewer.email}</Email>
                <Rating
                  name="ratings"
                  precision={0.1}
                  value={rating}
                  size="small"
                  readOnly
                />
              </Stack>
            </Stack>
          </ListItem>
          <ListItem>
            <Description>{review.comments}</Description>
          </ListItem>
          <ListItem>
            <Dated>{new Date(review.createdAt!).toDateString()}</Dated>
          </ListItem>
        </List>
      </CardContent>
    </CardContainer>
  );
};

export default ReviewCard;
