import * as React from 'react';
import { useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './NavBar';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import imgSrc from '../../assets/RediWatch_logo.png';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://github.com/oslabs-beta/RediWatch/tree/main"
      >
        RediWatch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// Set theme to dark mode always
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C63124',
    }
  },
});

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  //connection string and nickname state management
  const [string, setString] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  //updates the nickname state to user input
    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNickname(e.target.value);

     
  };
 //updates the connectin string state to user input
  const handleConnectionStringInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setString(e.target.value);
};

//handlesubmit function once form is submitted
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   //grabs connectin string and nickname from state
   const data = {
    connectionnickname: nickname,
    connectionstring: string,
    //hardcoding the user_id, will eventually need to pull this from the user somehow :-)
    user_id: 1,
};
//post request to "add connection"
fetch('/api/add-connection', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    alert("Connection Added Successfully");
})
.catch((error) => {
    console.error('Error:', error);
    alert("Failed to add connection");
});
}

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
            component="img"
            src={imgSrc}
            alt="RediWatch logo"
            sx={{
               position: 'relative',
               maxWidth: '200px',
               marginLeft: '18px',
            }}
          />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Home
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box alignItems="center" justifyContent="center">
              Create a New Connection
              <br></br>
           <form onSubmit={handleSubmit}>
              <FormGroup>
                <TextField
                  id="nick-name"
               
                  onInput={handleNicknameInput}
                  label="Nickname"
                  variant="outlined"
                  //margin="normal"
                  helperText="Create a nickname for this connection"
                  style={{ width: 400 }}
                />
                <br></br>
                <TextField
                  id="database-string"
                 onInput={handleConnectionStringInput}
                  label="Connection String"
                  variant="outlined"
                  // margin="normal"
                  helperText="Enter Your Redis Connection String."
                  style={{ width: 400 }}
                />
                <br></br>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Save Connection"
                />
                <br></br>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: 400 }}
                >
                  Submit
                </Button>
              </FormGroup>
              </form>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
