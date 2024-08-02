import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ROUTES, SEARCH_PARAMS } from "../../../config/constants";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import PlotDetails from "../../../components/PlotDetails/PlotDetails";
import ChallanDetails from "../../../components/ChallanDetails/ChallanDetails";
// import VerifiedIcon from "@mui/icons-material/Verified";
import { useAppDispatch, useAppSelector } from "../../../config/store";
import dayjs from "dayjs";
import { SaleDeedStatus } from "../../../enums";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventIcon from "@mui/icons-material/Event";
import {
  approveSaleDeedThunk,
  getSaleDeedsThunk,
  scheduleMeetingThunk,
} from "../../../features/saleDeed/saleDeedSlice";

export default function SaleDeed() {
  const { saleDeedId } = useParams();
  const saleDeed = useAppSelector((state) =>
    state.saleDeed.saleDeeds.find(
      (saleDeed) => saleDeed.saleDeedId.toString() === saleDeedId
    )
  );
  const isLoading = useAppSelector((state) => state.saleDeed.isLoading);
  const dispatch = useAppDispatch();
  let [, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setSearchParams({
      [SEARCH_PARAMS.status]:
        saleDeed?.saleDeedStatus === SaleDeedStatus.WaitingRegistrarApproval
          ? ROUTES.pending
          : saleDeed?.saleDeedStatus === SaleDeedStatus.MeetingSchedule
          ? ROUTES.inProgress
          : "",
    });
  }, [saleDeed]);

  const submitMeetingSchedule = async (date: string) => {
    await dispatch(
      scheduleMeetingThunk({
        saleDeedId: saleDeed?.saleDeedId!,
        meetingDate: date,
      })
    );
    await dispatch(getSaleDeedsThunk());
  };

  const approveSaleDeed = async () => {
    await dispatch(approveSaleDeedThunk(saleDeed?.saleDeedId!));
    await dispatch(getSaleDeedsThunk());
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Box p={4} display={"flex"} flexDirection={"column"} gap={3}>
      <Typography variant="h4">Sale Deed Details</Typography>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr"} gap={1}>
        <Box display={"flex"} gap={1}>
          <Typography>Sale deed no:</Typography>
          <Typography fontWeight={600}>{saleDeed?.saleDeedId}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Stamp Value:</Typography>
          <Typography fontWeight={600}>
            {saleDeed?.saleDeedChalan.saleDeedChalanValue.toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "PKR",
              }
            )}
          </Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Made on:</Typography>
          <Typography fontWeight={600}>
            {dayjs(saleDeed?.saleDeedChalan?.saleDeedChalanDate).format(
              "MMM DD, YYYY"
            )}
          </Typography>
        </Box>
        {/* <Box display={"flex"} gap={1}>
          <Typography>Advance Paid:</Typography>
          <Typography fontWeight={600}>
            {(0).toLocaleString("en-US", {
              style: "currency",
              currency: "PKR",
            })}
          </Typography>
        </Box> */}
        <Box display={"flex"} gap={1}>
          <Typography>Owner CNIC:</Typography>
          <Typography fontWeight={600}>{saleDeed?.ownerCnic}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Buyer CNIC:</Typography>
          <Typography fontWeight={600}>{saleDeed?.buyerCnic}</Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography>Total Amount:</Typography>
          <Typography fontWeight={600}>
            {saleDeed?.saleDeedTotalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "PKR",
            })}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <ChallanDetails chalan={saleDeed?.saleDeedChalan!} />
      <Divider />
      <PlotDetails plot={saleDeed?.plot!} />
      {/* <Divider />
      <Box display={"flex"} flexDirection={"column"} gap={3}>
        <Typography variant="h5">Vandor Details</Typography>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="h6">Vandor 1</Typography>
            {false && <VerifiedIcon color="primary" fontSize="small" />}
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={1}>
            <Box display={"flex"} gap={1}>
              <Typography>Name:</Typography>
              <Typography fontWeight={600}>Muhammad Hamza Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Father Name:</Typography>
              <Typography fontWeight={600}>Muhammad Aslam Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>CNIC:</Typography>
              <Typography fontWeight={600}>9307687676778</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Share (%):</Typography>
              <Typography fontWeight={600}>10%</Typography>
            </Box>
            <Box>
              <Button variant="outlined">Verify Biometric</Button>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="h6">Vandor 2</Typography>
            {true && <VerifiedIcon color="primary" fontSize="small" />}
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={1}>
            <Box display={"flex"} gap={1}>
              <Typography>Name:</Typography>
              <Typography fontWeight={600}>Muhammad Hamza Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Father Name:</Typography>
              <Typography fontWeight={600}>Muhammad Aslam Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>CNIC:</Typography>
              <Typography fontWeight={600}>9307687676778</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Share (%):</Typography>
              <Typography fontWeight={600}>10%</Typography>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="h6">Vandor 3</Typography>
            {true && <VerifiedIcon color="primary" fontSize="small" />}
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={1}>
            <Box display={"flex"} gap={1}>
              <Typography>Name:</Typography>
              <Typography fontWeight={600}>Muhammad Hamza Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Father Name:</Typography>
              <Typography fontWeight={600}>Muhammad Aslam Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>CNIC:</Typography>
              <Typography fontWeight={600}>9307687676778</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Share (%):</Typography>
              <Typography fontWeight={600}>10%</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Typography variant="h5">Vandee Details</Typography>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="h6">Vandee 1</Typography>
            {true && <VerifiedIcon color="primary" fontSize="small" />}
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={1}>
            <Box display={"flex"} gap={1}>
              <Typography>Name:</Typography>
              <Typography fontWeight={600}>Muhammad Hamza Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Father Name:</Typography>
              <Typography fontWeight={600}>Muhammad Aslam Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>CNIC:</Typography>
              <Typography fontWeight={600}>9307687676778</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Share (%):</Typography>
              <Typography fontWeight={600}>10%</Typography>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="h6">Vandee 2</Typography>
            {true && <VerifiedIcon color="primary" fontSize="small" />}
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={1}>
            <Box display={"flex"} gap={1}>
              <Typography>Name:</Typography>
              <Typography fontWeight={600}>Muhammad Hamza Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Father Name:</Typography>
              <Typography fontWeight={600}>Muhammad Aslam Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>CNIC:</Typography>
              <Typography fontWeight={600}>9307687676778</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Share (%):</Typography>
              <Typography fontWeight={600}>10%</Typography>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <Typography variant="h6">Vandee 3</Typography>
            {true && <VerifiedIcon color="primary" fontSize="small" />}
          </Box>
          <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={1}>
            <Box display={"flex"} gap={1}>
              <Typography>Name:</Typography>
              <Typography fontWeight={600}>Muhammad Hamza Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Father Name:</Typography>
              <Typography fontWeight={600}>Muhammad Aslam Siddiqui</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>CNIC:</Typography>
              <Typography fontWeight={600}>9307687676778</Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography>Share (%):</Typography>
              <Typography fontWeight={600}>10%</Typography>
            </Box>
          </Box>
        </Box>
      </Box> */}
      {saleDeed?.saleDeedStatus === SaleDeedStatus.WaitingRegistrarApproval && (
        <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
          <Button variant="contained" color="error" startIcon={<CloseIcon />}>
            Reject
          </Button>
          <Button
            variant="contained"
            startIcon={<EventIcon />}
            onClick={() => setOpenModal(true)}
            sx={{ position: "relative" }}
          >
            Schedule
          </Button>
        </Box>
      )}
      {openModal && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgcolor={"#00000033"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={dayjs()}
              onClose={() => setOpenModal(false)}
              onAccept={(date) => submitMeetingSchedule(date?.toISOString()!)}
            />
          </LocalizationProvider>
        </Box>
      )}
      {saleDeed?.saleDeedStatus === SaleDeedStatus.MeetingSchedule && (
        <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
          <Button variant="contained" color="error" startIcon={<CloseIcon />}>
            Reject
          </Button>
          <Button
            variant="contained"
            startIcon={<DoneIcon />}
            onClick={approveSaleDeed}
          >
            Proceed
          </Button>
        </Box>
      )}
    </Box>
  );
}
