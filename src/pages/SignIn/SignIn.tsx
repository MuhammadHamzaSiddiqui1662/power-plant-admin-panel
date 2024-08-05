import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../config/store";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../features/auth/authSlice";
import { ROUTES } from "../../config/constants";

interface SignInFromData {
  email: string;
  password: string;
}

const initialData: SignInFromData = {
  email: "",
  password: "",
};

export default function SignIn() {
  const [formData, setFormData] = useState(initialData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.password || !formData.email)
      return console.log("All feilds are required");
    const payload = formData;
    await dispatch(loginThunk(payload));
    navigate(`/${ROUTES.dashboard}`);
  };

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      className="bg-pattern"
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Box
        width={"100%"}
        maxWidth={"20rem"}
        borderRadius={"0.5rem"}
        bgcolor={"#fff"}
        boxShadow={
          "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        }
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        p={4}
      >
        <img src="/logo.png" alt="" width={80} />
        <Box width={"100%"}>
          <Typography mx={"auto"} textAlign={"center"}>
            Welcome back
          </Typography>
          <Typography
            mx={"auto"}
            textAlign={"center"}
            color={"rgba(0, 0, 0, 0.54)"}
          >
            Sign in with your credentials below.
          </Typography>
        </Box>
        <TextField
          label="Email"
          name="email"
          variant="filled"
          size="small"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          variant="filled"
          size="small"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            borderRadius: 4,
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}
