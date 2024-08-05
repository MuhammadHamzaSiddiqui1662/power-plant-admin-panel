// import { Box, Button, Typography } from "@mui/material";
// import { MuiOtpInput } from "mui-one-time-password-input";
// import { FormEvent, useState } from "react";
// import { useAppDispatch } from "../../config/store";
// import { verifyOtpThunk } from "../../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../config/constants";

// export default function VerifyOtp() {
//   const [otp, setOtp] = useState("");
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleChange = (newValue: string) => {
//     setOtp(newValue);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await dispatch(verifyOtpThunk(otp));
//     navigate(`../${ROUTES.dashboard}`);
//   };

//   return (
//     <Box
//       height={"100%"}
//       width={"100%"}
//       display={"flex"}
//       justifyContent={"center"}
//       alignItems={"center"}
//       className="bg-pattern"
//       component={"form"}
//       onSubmit={handleSubmit}
//     >
//       <Box
//         width={"100%"}
//         maxWidth={"26rem"}
//         borderRadius={"0.5rem"}
//         bgcolor={"#fff"}
//         boxShadow={
//           "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
//         }
//         display={"flex"}
//         flexDirection={"column"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         gap={2}
//         p={4}
//       >
//         <img src="/logo.png" alt="" width={80} />
//         <Box width={"100%"}>
//           <Typography mx={"auto"} textAlign={"center"}>
//             Verify it's you!
//           </Typography>
//           <Typography
//             mx={"auto"}
//             textAlign={"center"}
//             color={"rgba(0, 0, 0, 0.54)"}
//           >
//             Enter the OTP sent on your email
//           </Typography>
//         </Box>
//         <MuiOtpInput
//           length={6}
//           value={otp}
//           onChange={handleChange}
//           sx={{
//             gap: 1.5,
//           }}
//           TextFieldsProps={{
//             sx: {
//               "& input": {
//                 padding: 1.5,
//               },
//             },
//           }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{
//             borderRadius: 4,
//           }}
//         >
//           Verify
//         </Button>
//       </Box>
//     </Box>
//   );
// }
