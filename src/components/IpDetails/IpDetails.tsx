import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getIPsThunk,
  patentIpThunk,
  updateIPDetailsThunk,
} from "../../features/ip/ipSlice";
import { RootState, AppDispatch } from "../../config/store";
import {
  Grid,
  styled,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { IP } from "../../types/ip";
import { IpStatus } from "../../enums";
import { fireServerNotification } from "../../services/notification";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Document, Page } from "react-pdf";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfContainer = styled("div")({
  width: "100%",
  height: "auto",
  marginTop: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const PdfViewer = styled("div")({
  width: "100%",
  maxWidth: "800px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
  padding: "16px",
  backgroundColor: "#fff",
});

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
  const [editedIp, setEditedIp] = useState(selectedIp);
  const [editableFields, setEditableFields] = useState<Partial<IP>>({
    name: selectedIp?.name,
    description: selectedIp?.description,
    categories: selectedIp?.categories,
    publishedDate: selectedIp?.publishedDate,
    price: selectedIp?.price,
    status: selectedIp?.status,
  });

  const placeholderImage = "https://placehold.co/600x400";
  const pdfFileUrl = selectedIp?.patentDocument;

  const handleSave = async () => {
    if (selectedIp) {
      const updatedIp: IP = {
        ...selectedIp,
        ...editableFields,
        userDetails: selectedIp.userDetails || {},
        _id: selectedIp._id,
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
        updateIPDetailsThunk({ ipId: selectedIp._id, details: updatedDetails })
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
  //   e.preventDefault();
  //   if (!selectedIp) return;

  //   try {
  //     const formData = new FormData();

  //     const payload: IP =
  //       selectedIp.status === IpStatus.AppliedForPatent
  //         ? {
  //             ...selectedIp,
  //             patentNumber: patentDetails.patentNumber,
  //             publishedDate: new Date(patentDetails.publishedDate),
  //             status: IpStatus.InActive,
  //           }
  //         : selectedIp.status === IpStatus.Published
  //         ? { ...selectedIp, status: IpStatus.Pending }
  //         : { ...selectedIp, status: IpStatus.Published };

  //     formData.append("data", JSON.stringify(payload));

  //     const pdfFileInput = document.getElementById(
  //       "patentDocument"
  //     ) as HTMLInputElement;
  //     if (pdfFileInput?.files?.[0]) {
  //       formData.append("patentDocument", pdfFileInput.files[0]);
  //     }

  //     const imageInput = document.getElementById(
  //       "imageUpload"
  //     ) as HTMLInputElement;
  //     if (imageInput?.files?.[0]) {
  //       formData.append("image", imageInput.files[0]);
  //     }

  //     const response = await fetch(`/api/uploadPatent`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log("Patent submission successful", result);
  //       dispatch(getIPsThunk());

  //       await fireServerNotification({
  //         message: `Your IP ${selectedIp.name} has been patented with Patent#${patentDetails.patentNumber}!`,
  //         imageUrl: selectedIp.mainImg!,
  //         userId: selectedIp.userId,
  //       });
  //     } else {
  //       console.error("Error in patent submission:", result);
  //     }
  //   } catch (error) {
  //     console.error("Error during patent submission:", error);
  //   }
  // };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (selectedIp) {
  //     const formData = new FormData();
  //     const payload: IP =
  //       selectedIp.status === IpStatus.AppliedForPatent
  //         ? {
  //             ...selectedIp,
  //             patentNumber: patentDetails.patentNumber,
  //             publishedDate: new Date(patentDetails.publishedDate),
  //             status: IpStatus.InActive,
  //           }
  //         : selectedIp.status === IpStatus.Published
  //         ? { ...selectedIp, status: IpStatus.Pending }
  //         : { ...selectedIp, status: IpStatus.Published };
  //     console.log(payload);
  //     formData.append("data", JSON.stringify(payload));
  //     const {
  //       // @ts-ignore
  //       payload: { status },
  //     } = await dispatch(patentIpThunk(formData));
  //     if (status !== 200) return console.log("error", "Error patenting ip!");
  //     dispatch(getIPsThunk());
  //     await fireServerNotification({
  //       message: `Your IP ${selectedIp.name} has been ${
  //         selectedIp.status === IpStatus.AppliedForPatent
  //           ? `patented with patent#${patentDetails.patentNumber}`
  //           : selectedIp.status === IpStatus.Published
  //           ? "moved to pending state"
  //           : "published"
  //       }!`,
  //       imageUrl: selectedIp.mainImg!,
  //       userId: selectedIp.userId,
  //     });
  //   }
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedIp) return;

    try {
      const payload: Partial<IP> =
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

      const files: { patentDocument?: File; image?: File } = {};

      const pdfFileInput = document.getElementById(
        "patentDocument"
      ) as HTMLInputElement;
      if (pdfFileInput?.files?.[0]) {
        files.patentDocument = pdfFileInput.files[0];
      }

      const imageInput = document.getElementById(
        "imageUpload"
      ) as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        files.image = imageInput.files[0];
      }

      // Dispatch the thunk with IP data and optional files
      const response = await dispatch(
        patentIpThunk({
          ipId: selectedIp._id,
          ipData: payload,
          files,
        })
      );

      if (response?.error) {
        console.error("Error in patenting IP:", response.error.message);
        return;
      }

      console.log("Patent submission successful");
      dispatch(getIPsThunk());

      await fireServerNotification({
        message: `Your IP ${selectedIp.name} has been ${
          selectedIp.status === IpStatus.AppliedForPatent
            ? `patented with patent#${patentDetails.patentNumber}`
            : selectedIp.status === IpStatus.Published
            ? "moved to pending state"
            : "published"
        }!`,
        imageUrl: selectedIp.mainImg!,
        userId: selectedIp.userId,
      });
    } catch (error) {
      console.error("Error during patent submission:", error);
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

  useEffect(() => {
    const updateFields = async () => {
      await setEditedIp(selectedIp);
      await setEditableFields({
        name: selectedIp?.name,
        description: selectedIp?.description,
        categories: selectedIp?.categories,
        publishedDate: selectedIp?.publishedDate,
        price: selectedIp?.price,
        status: selectedIp?.status,
      });
    };
    updateFields();
  }, [selectedIp]);

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
                  src={selectedIp.mainImg!}
                  alt="Main Image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = placeholderImage;
                  }}
                />
              </div>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
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
                  variant="outlined"
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
                      variant="outlined"
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
                  <Label>Published Date</Label>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
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
                    <Value>
                      {editedIp?.publishedDate
                        ? new Date(editedIp?.publishedDate).toLocaleDateString()
                        : "No date available"}
                    </Value>
                  )}
                </ListItem>
                <ListItem>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      variant="outlined"
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
                  <Value>{selectedIp.status}</Value>
                </ListItem>
              </List>

              {selectedIp &&
                selectedIp.status === IpStatus.AppliedForPatent && (
                  <Grid container maxWidth={600} spacing={2}>
                    {selectedIp.patentDocument && (
                      <PdfContainer>
                        <PdfViewer>
                          <Typography
                            variant="h6"
                            style={{ marginBottom: "16px" }}
                          >
                            Patent PDF Preview
                          </Typography>
                          <Document
                            file={pdfFileUrl}
                            onLoadError={(error) =>
                              console.error("Error loading PDF:", error)
                            }
                          >
                            <Page pageNumber={1} />
                          </Document>
                        </PdfViewer>
                      </PdfContainer>
                    )}
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          alignItems: "flex-start",
                        }}
                      >
                        <label
                          htmlFor="patentDocument"
                          style={{
                            fontWeight: "bold",
                            color: "#333",
                            marginBottom: "8px",
                            cursor: "pointer",
                          }}
                        >
                          Upload Patent Document (PDF):
                        </label>
                        <input
                          id="patentDocument"
                          name="patentDocument"
                          type="file"
                          accept="application/pdf"
                          onChange={(event) =>
                            console.log("File selected:", event.target.files)
                          }
                          style={{
                            padding: "8px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </Grid>

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

        <Grid item xs={12}>
          <SectionContainer>
            <CardContent>
              <SectionTitle>User Details</SectionTitle>
              <List>
                <ListItem>
                  <Label>Username</Label>
                  <Value>{selectedIp.userDetails?.name || "N/A"}</Value>
                </ListItem>
                <ListItem>
                  <Label>Email</Label>
                  <Value>{selectedIp.userDetails?.email || "N/A"}</Value>
                </ListItem>
                <ListItem>
                  <Label>Phone</Label>
                  <Value>{selectedIp.userDetails?.phone || "N/A"}</Value>
                </ListItem>
                <ListItem>
                  <Label>Address</Label>
                  <Value>{selectedIp.userDetails?.address || "N/A"}</Value>
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
                {selectedIp.images.map((url) => (
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
