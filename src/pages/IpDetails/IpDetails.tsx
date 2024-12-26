import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getIPsThunk,
  patentIpThunk,
  updateIPDetailsThunk,
} from "../../features/ip/ipSlice";
import { AppDispatch } from "../../config/store";
import {
  Grid,
  styled,
  Typography,
  Box,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import { IP, IPSection } from "../../types/ip";
import { IpStatus } from "../../enums";
import { fireServerNotification } from "../../services/notification";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDropzone } from "react-dropzone";
import UploadIcon from "../../assets/images/upload.png";
import PdfIcon from "../../assets/images/pdfLogo.png";
import { toast } from "react-toastify";
import { api } from "../../config/axios";
import { useGetIpQuery } from "../../services/ip";

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
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: ip, isLoading, error } = useGetIpQuery(id);
  const [patentDetails, setPatentDetails] = useState({
    patentNumber: "",
    publishedDate: ((date: Date) =>
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`)(
      new Date()
    ),
  });
  const [editedIp, setEditedIp] = useState(ip);
  const [editableFields, setEditableFields] = useState<Partial<IP>>({
    name: ip?.name,
    description: ip?.description,
    categories: ip?.categories,
    publishedDate: ip?.publishedDate,
    price: ip?.price,
    status: ip?.status,
  });
  const [patentDoc, setPatentDoc] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      setPatentDoc((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const placeholderImage = "https://placehold.co/600x400";

  const handleSave = async () => {
    if (ip) {
      const updatedIp: IP = {
        ...ip,
        ...editableFields,
        userDetails: ip.userDetails || {},
        _id: ip._id,
      };

      const updatedDetails: Partial<IP> = {
        name: editableFields.name,
        description: editableFields.description,
        categories: editableFields.categories,
        publishedDate: editableFields.publishedDate,
        price: editableFields.price,
        status: editableFields.status,
      };
      await dispatch(
        updateIPDetailsThunk({ ipId: ip._id, details: updatedDetails })
      );

      setIsEditing(false);

      await setEditedIp(updatedIp);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditableFields({ ...editedIp });
  };

  const handleInputChange = useCallback((field: keyof IP, value: any) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ip) {
      if (ip.status === IpStatus.AppliedForPatent) {
        if (!patentDetails.patentNumber || !patentDetails.publishedDate) {
          toast.error("Please fill in all fields!");
          return console.log("error", "Please fill in all fields!");
        }
        if (patentDoc.length === 0) {
          toast.error("Please upload patent document!");
          return console.log("error", "Please upload patent document!");
        }
      }

      const formData = new FormData();
      const payload: IP =
        ip.status === IpStatus.AppliedForPatent
          ? {
              ...ip,
              patentNumber: patentDetails.patentNumber,
              publishedDate: new Date(patentDetails.publishedDate),
              status: IpStatus.InActive,
            }
          : ip.status === IpStatus.Published
          ? { ...ip, status: IpStatus.Pending }
          : { ...ip, status: IpStatus.Published };
      console.log(payload);
      formData.append("data", JSON.stringify(payload));
      const {
        // @ts-ignore
        payload: { status },
      } = await dispatch(patentIpThunk(formData));
      if (status !== 200) return console.log("error", "Error patenting ip!");
      if (ip.status === IpStatus.AppliedForPatent) {
        const fileData = new FormData();
        for (const file of patentDoc) {
          fileData.append("files", file);
        }
        const { status: fileStatus } = await api.post(
          `/email/patent-docs/${ip._id}`,
          fileData
        );
        if (fileStatus !== 200)
          return console.log("error", "Error sending patent docs!");
      }
      dispatch(getIPsThunk());
      await fireServerNotification({
        message: `Your IP ${ip.name} has been ${
          ip.status === IpStatus.AppliedForPatent
            ? `patented with patent#${patentDetails.patentNumber}. Find your patent documents in your email!`
            : ip.status === IpStatus.Published
            ? "moved to pending state"
            : "published"
        }!`,
        imageUrl: ip.mainImg!,
        userId: ip.userId,
      });
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
    const updateFields = async () => {
      await setEditedIp(ip);
      await setEditableFields({
        name: ip?.name,
        description: ip?.description,
        categories: ip?.categories,
        publishedDate: ip?.publishedDate,
        price: ip?.price,
        status: ip?.status,
      });
    };
    updateFields();
  }, [ip]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ip) {
    return <div>IP not found</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4">IP Details</Typography>
            <IconButton onClick={isEditing ? handleSave : handleEditToggle}>
              {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} component={"form"} onSubmit={handleSubmit}>
          <CardContainer>
            <CardContent>
              <div className="relative" style={{ marginBottom: 16 }}>
                <ProfileImage
                  src={ip.mainImg!}
                  alt="Main Image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderImage;
                  }}
                />
              </div>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="filled"
                  size="small"
                  label="Name"
                  value={editableFields.name ?? ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              ) : (
                <Title>{editedIp?.name}</Title>
              )}

              {isEditing ? (
                <TextField
                  fullWidth
                  variant="filled"
                  size="small"
                  label="Description"
                  value={editableFields.description ?? ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  sx={{ marginBottom: 2 }}
                />
              ) : (
                <>
                  <Label>Description</Label>
                  <Description>{editedIp?.description}</Description>
                </>
              )}

              <List>
                <ListItem>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="filled"
                      size="small"
                      label="Categories"
                      value={editableFields.categories?.join(", ") ?? ""}
                      onChange={(e) =>
                        handleInputChange(
                          "categories",
                          e.target.value.split(",").map((cat) => cat.trim())
                        )
                      }
                      sx={{ marginBottom: 2 }}
                    />
                  ) : (
                    <>
                      <Label>Categories</Label>
                      <Value>{editedIp?.categories.join(", ")}</Value>
                    </>
                  )}
                </ListItem>
                <ListItem>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      type="date"
                      variant="filled"
                      size="small"
                      label="Published Date"
                      value={
                        editableFields.publishedDate
                          ? new Date(editableFields.publishedDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          "publishedDate",
                          new Date(e.target.value)
                        )
                      }
                      sx={{ marginBottom: 2 }}
                    />
                  ) : (
                    <>
                      <Label>Published Date</Label>
                      <Value>
                        {editedIp?.publishedDate
                          ? new Date(
                              editedIp?.publishedDate
                            ).toLocaleDateString()
                          : "No date available"}
                      </Value>
                    </>
                  )}
                </ListItem>
                <ListItem>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="filled"
                      size="small"
                      label="Price"
                      type="number"
                      value={editedIp?.price ?? ""}
                      onChange={(e) =>
                        handleInputChange("price", parseFloat(e.target.value))
                      }
                      sx={{ marginBottom: 2 }}
                    />
                  ) : (
                    <>
                      <Label>Price</Label>
                      <Value>${editedIp?.price}</Value>
                    </>
                  )}
                </ListItem>
                <ListItem>
                  <Label>Status</Label>
                  <Value>{ip.status}</Value>
                </ListItem>
              </List>

              {ip && ip.status === IpStatus.AppliedForPatent && (
                <Grid
                  container
                  maxWidth={isEditing ? undefined : 600}
                  spacing={2}
                >
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
                    <Stack direction="row" spacing={2}>
                      {patentDoc.map((file) => (
                        <Box
                          key={file.name}
                          sx={{
                            border: "2px solid #c00",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            height: 100,
                            width: 100,
                          }}
                        >
                          <img src={PdfIcon} width="30%" height="30%" />
                          <p style={{ fontSize: "0.75rem", color: "#c00" }}>
                            {file.name}
                          </p>
                        </Box>
                      ))}

                      <Box
                        {...getRootProps()}
                        sx={{
                          border: "2px solid #ccc",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          height: 100,
                          width: 100,
                        }}
                      >
                        <input {...getInputProps()} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img src={UploadIcon} width="30%" height="30%" />

                          <p style={{ fontSize: "0.75rem", color: "#888" }}>
                            Upload PDF
                          </p>
                        </Box>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <ApproveButton type="submit">Proceed</ApproveButton>
                  </Grid>
                </Grid>
              )}
              {ip.status === IpStatus.InActive && (
                <ApproveButton type="submit">Publish</ApproveButton>
              )}
              {ip.status === IpStatus.Pending && (
                <ApproveButton type="submit">Approve</ApproveButton>
              )}
              {ip.status === IpStatus.Published && (
                <ApproveButton type="submit">Suspend</ApproveButton>
              )}
            </CardContent>
          </CardContainer>
        </Grid>

        <Grid item xs={12}>
          <SectionContainer>
            <CardContent>
              <SectionTitle>User Details</SectionTitle>
              <List>
                <ListItem>
                  <Label>Username</Label>
                  <Value>{ip.user?.name || "N/A"}</Value>
                </ListItem>
                <ListItem>
                  <Label>Email</Label>
                  <Value>{ip.user?.email || "N/A"}</Value>
                </ListItem>
                <ListItem>
                  <Label>Phone</Label>
                  <Value>{ip.user?.phone || "N/A"}</Value>
                </ListItem>
                <ListItem>
                  <Label>Address</Label>
                  <Value>{ip.user?.address || "N/A"}</Value>
                </ListItem>
              </List>
            </CardContent>
          </SectionContainer>
        </Grid>

        {/* Images Section */}
        <Grid item xs={12}>
          <ImageContainer>
            <CardContent>
              <Title>Images</Title>
              <Grid container spacing={2}>
                {ip.images.map((url: string) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={url}
                    height={200}
                    // bgcolor={"#000"}
                  >
                    <img
                      src={url}
                      alt={url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "8px",
                        backgroundColor: "#000",
                      }}
                    />
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
              {ip.sections.map((section: IPSection, index: number) => (
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
