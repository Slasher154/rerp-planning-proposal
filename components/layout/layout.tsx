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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            <Button color="inherit">Login</Button>
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