import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../types/user";
import dayjs from "dayjs";
import { Gender, MaritalStatus, RoleType } from "../../enums";
import { registerThunk } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../config/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/constants";

interface SignUpFromData extends User {
  confirmPassword: string;
}

const initialData: SignUpFromData = {
  city: "Karachi",
  cnicExpiry: dayjs().add(1, "day"),
  cnicFather: "",
  cnicHusband: "",
  cnicNumber: "",
  currentAddress: "",
  dateOfBirth: dayjs(),
  email: "",
  gender: Gender.Male,
  imageSrc: "",
  isAlive: true,
  maritalStatus: MaritalStatus.Single,
  name: "",
  organizationCode: RoleType.DCO,
  password: "",
  permanentAddress: "",
  phoneNumber: "",
  postalCode: "",
  workEmail: "",
  state: "",
  workPassword: "",
  confirmPassword: "",
};

export default function SignUp() {
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
    if (formData.password !== formData.confirmPassword)
      return console.log("Password and confirm password should be same.");
    const payload = formData as User;
    await dispatch(registerThunk(payload));
    navigate(`../${ROUTES.signIn}`);
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
        maxWidth={"50rem"}
        borderRadius={"0.5rem"}
        bgcolor={"#fff"}
        boxShadow={
          "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
        }
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        gap={2}
        p={4}
      >
        <img
          src="/logo.png"
          alt=""
          width={80}
          style={{ gridColumn: "span 2", margin: "0px auto" }}
        />
        <Box width={"100%"} gridColumn={"span 2"}>
          <Typography mx={"auto"} textAlign={"center"}>
            Welcome to PakZameen
          </Typography>
          <Typography
            mx={"auto"}
            textAlign={"center"}
            color={"rgba(0, 0, 0, 0.54)"}
          >
            Register yourself below to use our services.
          </Typography>
        </Box>
        <TextField
          label="Name"
          name="name"
          variant="filled"
          size="small"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="CNIC"
          name="cnicNumber"
          variant="filled"
          size="small"
          fullWidth
          value={formData.cnicNumber}
          onChange={handleChange}
        />
        <TextField
          label="E-Mail"
          name="email"
          variant="filled"
          size="small"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone No"
          name="phoneNumber"
          placeholder="03XXXXXXXXX"
          variant="filled"
          size="small"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          variant="filled"
          size="small"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          variant="filled"
          size="small"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            borderRadius: 4,
            gridColumn: "span 2",
            maxWidth: "30rem",
            mx: "auto",
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
