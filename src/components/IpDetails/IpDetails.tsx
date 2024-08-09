import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIPsThunk } from "../../features/ip/ipSlice";
import { RootState, AppDispatch } from "../../config/store";
import { Container, Grid, styled, Rating, Typography } from "@mui/material";
import { IP } from "../../types/ip";

const ProfileImage = styled("img")({
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  objectFit: "cover",
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

const SectionTitle = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#333",
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

const ImageContainer = styled(CardContainer)({
  marginTop: "24px",
});

const SectionContainer = styled(CardContainer)({
  marginTop: "24px",
});

const IpDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedIp, setSelectedIp] = useState<IP | null>(null);

  useEffect(() => {
    dispatch(getIPsThunk());
  }, [dispatch]);

  const { ips, isLoading, error } = useSelector((state: RootState) => state.ip);

  useEffect(() => {
    const ip = ips.find((ip) => ip._id === id);
    setSelectedIp(ip || null);
  }, [ips, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedIp) {
    return <div>IP not found</div>;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CardContainer>
            <CardContent>
              <div className="relative">
                <ProfileImage
                  src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                  alt="Profile"
                />
                {/* <ProfileImage src={selectedIp.mainImg} alt="Profile" /> */}
              </div>
              <Title>{selectedIp.name}</Title>
              <Description>{selectedIp.description}</Description>

              <List>
                <ListItem>
                  <Label>Categories</Label>
                  <Value>{selectedIp.categories.join(", ")}</Value>
                </ListItem>
                <ListItem>
                  <Label>Published Year</Label>
                  <Value>
                    {new Date(selectedIp.publishedDate).getFullYear()}
                  </Value>
                </ListItem>
                <ListItem>
                  <Label>Price</Label>
                  <Value>${selectedIp.price}</Value>
                </ListItem>
                <ListItem>
                  <Label>Rating</Label>
                  <Rating value={4.5} precision={0.5} readOnly />
                </ListItem>
              </List>
              <ApproveButton>Patent</ApproveButton>
            </CardContent>
          </CardContainer>
        </Grid>

        {/* Images Section */}
        <Grid item xs={12}>
          <ImageContainer>
            <CardContent>
              <Title>Images</Title>
              <Grid container spacing={2}>
                {selectedIp.images.map((image, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <img
                      src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                      //   src={image.url}
                      alt={`Image ${index}`}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                    {image.description && (
                      <Typography variant="body2">
                        {image.description}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </ImageContainer>
        </Grid>

        {/* Sections Section */}
        <Grid item xs={12}>
          <SectionContainer>
            <CardContent>
              <SectionTitle>Sections</SectionTitle>
              {selectedIp.sections.map((section, index) => (
                <div key={index}>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: "10px",
                      marginTop: "10px",
                      color: "#34D399",
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography>{section.content}</Typography>
                </div>
              ))}
            </CardContent>
          </SectionContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IpDetailsPage;
