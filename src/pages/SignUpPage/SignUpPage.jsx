import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../../images/aks_logo.jpeg"
import { useState } from 'react';
import CustomizedSnackbars from '../../components/CustomSnackBar';
import { MyContext } from '../../ContextAPI';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/home">
        AKS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



const defaultTheme = createTheme();

export default function SignUpPage() {

  const wards = [
    "Bopal",
    "Bapunagar",
    "Ghatlodiya",
    "Krishnanagar",
    "Maninagar",
    "Naroda",
    "Nirnaynagar",
    "Noblenagar",
    "Odhav",
    "Sabarmati",
    "Thaltej",
    "Vastrapur",
    "Vejalpur",
  ]
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone_no: '',
    ward: '',
    address: '',
    dob: ''


  })

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = (e) => {
    setAnchorEl(null);
    const { myValue } = e.currentTarget.dataset;
    setDetails({ ...details, ward: myValue })
  };


  const navigate = useNavigate()
  const { setLoggedInUserDetails, setLoggedIn } = React.useContext(MyContext)
  const [flag, setFlag] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [errorType, setErrorType] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)




  const { firstName, lastName, email, password, phone_no, ward, address, dob } = details

  const handleDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
    // console.log(details)

  }


  React.useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      navigate("/home")
    }
  }, [navigate])




  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)

    try {

      await fetch(`https://aks-backend.onrender.com/api/auth/register`, {
        method: 'POST',

        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName, lastName, email, password, phone_no, ward, address, dob

        })

      }).then(async (res) => {

        const data = await res.json();
        setMessage(data.msg);
        setErrorType(data.type)
        setFlag(true)
        setIsLoading(false)

        if (data.success) {




          setTimeout(() => {
            setLoggedIn(true)
            localStorage.setItem("userId", JSON.stringify(data.user._id))
            setLoggedInUserDetails(data.user)
            setIsLoading(false)

          }, 1000);

        }


      }).catch(err =>
        console.log(err)
      )


    } catch (error) {
      throw error

    }






  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <CustomizedSnackbars flag={flag} setFlag={setFlag} msg={message} errorType={errorType} />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <img src={logo} alt="" width={100} height={100} />
          </div>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus

                  value={details?.firstName}
                  onChange={(e) => handleDetails(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={details?.lastName}
                  onChange={(e) => handleDetails(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={details?.email}
                  onChange={(e) => handleDetails(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputProps={{ minLength: 6 }}
                  value={details?.password}
                  onChange={(e) => handleDetails(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone_no"
                  label="Phone Number"
                  type="phone_no"
                  id="phone_no"
                  inputProps={{ minLength: 10, maxLength: 10 }}
                  autoComplete="new-phone_no"
                  value={details?.phone_no}
                  onChange={(e) => handleDetails(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"

                  autoComplete="new-address"
                  value={details?.address}
                  onChange={(e) => handleDetails(e)}
                />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker onChange={(e) => setDetails({ ...details, dob: `${e.$D}/${e.$M + 1}/${e.$y}` })} format="DD/MM/YYYY" label="Date of birth" />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} >

                <Button
                  style={{ width: "100%", backgroundColor: 'white', border: '1px solid grey', color: 'grey' }}
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={(e) => handleClick(e)}
                  endIcon={<KeyboardArrowDownIcon />}
                >

                  {details?.ward ? details?.ward : "Select ward"}
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}

                >
                  {
                    wards?.map((item) =>

                      <MenuItem required key={item} data-my-value={item} onClick={(e) => handleClose(e)} disableRipple>

                        {item}
                      </MenuItem>


                    )
                  }

                </StyledMenu>

              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <CircularProgress color="inherit" /> : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to='/' variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

      </Container>
    </ThemeProvider >
  );
}