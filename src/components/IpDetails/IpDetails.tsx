import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIPsThunk, patentIpThunk } from "../../features/ip/ipSlice";
import { RootState, AppDispatch } from "../../config/store";
import { Grid, styled, Typography, Box, TextField } from "@mui/material";
import { IP } from "../../types/ip";
import { IpStatus } from "../../enums";

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
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { ips, isLoading, error } = useSelector((state: RootState) => state.ip);
  const selectedIp = useMemo(() => ips.find((ip) => ip._id === id), [ips, id]);
  const [patentDetails, setPatentDetails] = useState({
    patentNumber: "",
    publishedDate: ((date: Date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`)(
      new Date()
    ),
  });
  console.log("patentDetails", patentDetails);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedIp) {
      const formData = new FormData();
      const payload: IP =
        selectedIp.status === IpStatus.AppliedForPatent
          ? {
              ...selectedIp,
              patentNumber: patentDetails.patentNumber,
              publishedDate: new Date(patentDetails.publishedDate),
              status: IpStatus.InActive,
            }
          : selectedIp.status === IpStatus.Published
          ? { ...selectedIp, status: IpStatus.Pending }
          : { ...selectedIp, status: IpStatus.Published };
      console.log(payload);
      formData.append("data", JSON.stringify(payload));
      const {
        // @ts-ignore
        payload: { status },
      } = await dispatch(patentIpThunk(formData));
      if (status !== 200) return console.log("error", "Error patenting ip!");
      dispatch(getIPsThunk());
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPatentDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(typeof e.target.value, e.target.value);
  };

  useEffect(() => {
    dispatch(getIPsThunk());
  }, [dispatch]);

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
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">IP Details</Typography>
        </Grid>
        <Grid item xs={12} component={"form"} onSubmit={handleSubmit}>
          <CardContainer>
            <CardContent>
              <div className="relative" style={{ marginBottom: 16 }}>
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
                  <Label>Status</Label>
                  <Value>{selectedIp.status}</Value>
                </ListItem>
              </List>
              {selectedIp &&
                selectedIp.status === IpStatus.AppliedForPatent && (
                  <Grid container maxWidth={600} spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Patent Number"
                        name="patentNumber"
                        variant="filled"
                        size="small"
                        fullWidth
                        value={patentDetails.patentNumber}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Published date"
                        name="publishedDate"
                        variant="filled"
                        size="small"
                        type="date"
                        fullWidth
                        value={patentDetails.publishedDate}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ApproveButton type="submit">Patent</ApproveButton>
                    </Grid>
                  </Grid>
                )}
              {selectedIp.status === IpStatus.InActive && (
                <ApproveButton type="submit">Publish</ApproveButton>
              )}
              {selectedIp.status === IpStatus.Pending && (
                <ApproveButton type="submit">Approve</ApproveButton>
              )}
              {selectedIp.status === IpStatus.Published && (
                <ApproveButton type="submit">Suspend</ApproveButton>
              )}
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
    </Box>
  );
};

export default IpDetailsPage;
