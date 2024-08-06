import React from "react";
import { UserStatus } from "../../types/user";
import { styled } from "@mui/material";

interface CardProps {
  name: string;
  description: string;
  year: string | number | Date;
  categories?: string[];
  profileImage?: string;
  brokerStatus?: UserStatus;
  userType: string;
  handleApprove: () => void;
  isApproving: boolean;
}

const Card: React.FC<CardProps> = ({
  name,
  description,
  year,
  categories = [],
  profileImage,
  brokerStatus,
  userType,
  handleApprove,
  isApproving,
}) => {
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
        <div className="relative">
          <ProfileImage
            src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
            alt="Profile"
          />
        </div>
        <Title>{name}</Title>
        <Description>{description}</Description>

        <List>
          <ListItem>
            <Label>User Type</Label>
            <Value>{userType}</Value>
          </ListItem>
          <ListItem>
            <Label>Year Joined</Label>
            <Value>{new Date(year).getFullYear()}</Value>
          </ListItem>
          <ListItem>
            <Label>Interests</Label>
            <Value>{categories?.join(", ")}</Value>
          </ListItem>
          {brokerStatus === UserStatus.Pending && (
            <ListItem>
              <ApproveButton onClick={handleApprove} disabled={isApproving}>
                {isApproving ? "Approving..." : "Approve Broker"}
              </ApproveButton>
            </ListItem>
          )}
        </List>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
