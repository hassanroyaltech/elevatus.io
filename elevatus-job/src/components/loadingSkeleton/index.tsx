import { Box, Button, Card, CardContent, CardHeader, Skeleton, Typography } from '@mui/material';
import React from 'react';

function LoaderSkeleton() {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: ".625rem",
        p: "6px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: "none",
        cursor: "pointer",
        boxShadow: "none",
      }}
    >
      <CardHeader
        title={
          <Box display={"flex"}>
            {/* Skeleton loader for the card title */}
            <Skeleton variant="text" width={150} height={20} />
          </Box>
        }
        sx={{ fontSize: '14px !important' }}
      />

      <CardContent>
        {/* Skeleton loader for the location */}
        <Typography variant='body1' borderBottom={".0625rem solid #e9ecef"} pb={1} mb={1}>
          <Skeleton variant="text" width={100} height={20} />
        </Typography>
        {/* Skeleton loader for the career level */}
        <Typography fontSize={16}>
          <Skeleton variant="text" width={50} height={20} />
        </Typography>
      </CardContent>
      <Box height={"78px"} alignItems={"center"} display={"flex"} justifyContent={"center"}>
        {/* Skeleton loader for the button */}
        <Button variant="outlined" color="primary" disabled>
          <Skeleton variant="text" width={50} height={20} />
        </Button>
      </Box>
    </Card>
  );
}

export default LoaderSkeleton;
