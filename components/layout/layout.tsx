import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {Fragment, PropsWithChildren} from 'react'
import Container from '@mui/material/Container'
import {MenuItem, Stack} from '@mui/material'
import Link from 'next/link'

export default function Layout({ children }: PropsWithChildren<any>) {
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1}}>
              <Stack direction="row" spacing={2}>
              <Typography variant="h6" component="div">
                <Link href="/" color="inherit">Home</Link>
              </Typography>
                <Typography variant="h6" component="div">
                  <Link href="/projects/add" color="inherit">เพิ่มโครงการ</Link>
                </Typography>
                {/*<Typography variant="h6" component="div">*/}
                {/*  <Link href="/projects/summary" color="inherit">โครงการทั้งหมด</Link>*/}
                {/*</Typography>*/}
              </Stack>

            </Box>


          </Toolbar>
        </AppBar>
      </Box>
      {/* Add empty tool bar to prevent content hidden beneath under toolbar https://mui.com/material-ui/react-app-bar/#elevate-app-bar*/}
      <Toolbar />
      <Container maxWidth="xl">
        {children}
      </Container>
    </Fragment>

  );
}