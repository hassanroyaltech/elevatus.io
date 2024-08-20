import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { primaryColor } from '../../../constant';
import { Job } from '../../../types/job.types';

interface IJobCard {
  job: Job; // Job object to be displayed
  showBtn?: boolean; // Optional prop to show/hide the 'View' button
  isShadow?: boolean; // Optional prop to apply shadow to the card
  uri?: string; // Optional prop to highlight the card if its uri matches the provided uri
}

const JobCard = ({ job, showBtn, isShadow, uri }: IJobCard) => (
  <Grid item xs={12} sm={100} md={3.8} lg={2.2} xl={2.2} key={job.uuid} sx={{ flexGrow: 1 }}>
    {/* Link to the detailed job listing page */}
    <Link to={`/job-listing/${job.uri}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          height: "100%", // Full height of the container
          borderRadius: ".625rem", // Rounded corners
          p: "6px", // Padding inside the card
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Space between header and content
          border: uri === job.uri ? `1px solid ${primaryColor} !important` : "none", // Highlight border if uri matches
          cursor: "pointer", // Pointer cursor on hover
          boxShadow: isShadow ? "0 15px 35px #32325d1a,0 5px 15px #00000012" : 'none', // Conditional shadow effect
          '&:hover': {
            border: `1px solid ${primaryColor} !important`, // Border on hover
          },
        }}
      >
        {/* Card header with job title and optional star icon */}
        <CardHeader
          title={
            <Box display={"flex"}>
              <Typography variant='body1' mb={1.7} fontWeight={"bold"}>{job.title}</Typography>
              {job.is_top && <Typography> <StarIcon sx={{ color: "#f9e780" }} /></Typography>} {/* Star icon if job is top */}
            </Box>
          }
          sx={{ fontSize: '14px !important' }}
        />

        {/* Card content displaying job location and career level */}
        <CardContent>
          <Typography variant='body1' borderBottom={".0625rem solid #e9ecef"} pb={1} mb={1}>
            {job.location.city}
          </Typography>
          <Typography fontSize={16}>
            {job.career_level[0]}
          </Typography>
        </CardContent>

        {/* Optional 'View' button */}
        {showBtn && (
          <Box height={"78px"} alignItems={"center"} display={"flex"} justifyContent={"center"}>
            <Button variant="outlined" color="primary">View</Button>
          </Box>
        )}
      </Card>
    </Link>
  </Grid>
);

export default JobCard;
