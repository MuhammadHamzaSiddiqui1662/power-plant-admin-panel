import React, { useState, useEffect, useCallback } from "react";
import {
  Chip,
  Stack,
  styled,
  Typography,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { User } from "../../types/user";

interface CardProps {
  user: User;
  onSave: (updatedUser: User) => void; // Callback to handle save action
}

const GeneralProfileCard: React.FC<CardProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [editableFields, setEditableFields] = useState<Partial<User>>({
    name: user.name,
    about: user.about,
    interests: user.interests,
    phone: user.phone,
    email: user.email,
  });

  const placeholderImage = "https://placehold.co/600x400";

  const ProfileImage = styled("img")({
    width: 148,
    height: 148,
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    marginBottom: "14px",
  });

  const Title = styled("span")({
    fontSize: "1.50rem",
    fontWeight: "600",
    color: "#333",
    display: "block",
    marginBottom: "8px",
  });

  const Label = styled("span")({
    fontSize: "1.10rem",
    fontWeight: "600",
    color: "#333",
    display: "block",
    marginTop: "8px",
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditableFields({ ...editedUser });
  };

  const handleSave = async () => {
    const updatedUser = await { ...editedUser, ...editableFields };
    await setEditedUser(updatedUser);
    await setEditableFields({ ...updatedUser });
    await onSave(updatedUser);
    await setIsEditing(false);
  };

  const handleInputChange = useCallback((field: keyof User, value: any) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    const updateFields = async () => {
      await setEditedUser(user);
      await setEditableFields({
        name: user.name,
        about: user.about,
        interests: user.interests,
        phone: user.phone,
        email: user.email,
      });
    };
    updateFields();
  }, [user]);

  return (
    <Box
      sx={{
        borderRadius: "16px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        padding: "24px",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>
          General Bio
        </Typography>
        <IconButton onClick={isEditing ? handleSave : handleEditToggle}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>
      <div className="relative">
        <ProfileImage
          src={user.imageUrl}
          alt="Profile"
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
        <Title>{editedUser.name}</Title>
      )}
      {isEditing ? (
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          value={editableFields.email ?? ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      ) : (
        <>
          <Label>Email</Label>
          <Description>{editedUser.email || "N/A"}</Description>
        </>
      )}
      {isEditing ? (
        <TextField
          fullWidth
          variant="outlined"
          label="Phone"
          value={editableFields.phone ?? ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          sx={{ marginBottom: 2 }}
        />
      ) : (
        <>
          <Label>Phone</Label>
          <Description>{editedUser.phone || "N/A"}</Description>
        </>
      )}

      {isEditing ? (
        <TextField
          fullWidth
          variant="outlined"
          label="About"
          value={editableFields.about ?? ""}
          onChange={(e) => handleInputChange("about", e.target.value)}
          multiline
          rows={3}
          sx={{ marginBottom: 2 }}
        />
      ) : (
        <>
          <Label>About</Label>
          <Description>
            {editedUser.about || "No about info added."}
          </Description>
        </>
      )}

      <Stack spacing={1} mt={2}>
        <Label>Interests</Label>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {editableFields.interests?.map((interest, index) => (
            <Chip key={index} label={interest} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default GeneralProfileCard;
