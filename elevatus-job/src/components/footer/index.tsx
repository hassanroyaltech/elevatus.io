import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { secondaryColor } from '../../constant'
import { TypePredicateKind } from 'typescript'

function Footer() {
  return (
    <Box  display={"flex"}sx={{ minHeight: "15rem", bgcolor: secondaryColor }} mt={2} className='footer-rights-wrapper'>
      <Typography color={"#fff"}>      Powered By:
      </Typography>
     <a target="_blank" href="https://www.elevatus.io" rel="noreferrer">
     <div className="footer-company-logo"></div></a>
    </Box>
  )
}

export default Footer