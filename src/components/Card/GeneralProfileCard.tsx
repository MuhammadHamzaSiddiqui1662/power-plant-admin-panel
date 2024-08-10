import React from "react";
import { Chip, Stack, styled, Typography } from "@mui/material";
import { User } from "../../types/user";

interface CardProps {
  user: User;
}

const GeneralProfileCard: React.FC<CardProps> = ({ user }) => {
  const ProfileImage = styled("img")({
    width: "20%",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
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

  const Title = styled("span")({
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#333",
    display: "block",
    marginBottom: "8px",
  });

  const Description = styled("p")({
    fontSize: "0.875rem",
    color: "#555",
    lineHeight: "1.5",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
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
          General Bio
        </Typography>
        <div className="relative">
          <ProfileImage
            src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
            alt="Profile"
          />
        </div>
        <Title>{user.name}</Title>
        <Description>{user.about || "No about info added."}</Description>

        <List>
          <ListItem>
            <Label>Year Joined</Label>
            <Value>{new Date(user.createdAt!).getFullYear()}</Value>
          </ListItem>
          <ListItem>
            <Label>Interests</Label>
            <Value>
              {user.interests && user.interests.length > 0 ? (
                <Stack
                  direction={"row"}
                  overflow={"auto"}
                  gap={1}
                  width={"100%"}
                >
                  {user.interests?.map((interest) => (
                    <Chip key={interest} label={interest} />
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

export default GeneralProfileCard;
