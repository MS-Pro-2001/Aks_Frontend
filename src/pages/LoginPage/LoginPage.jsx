import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/aks_logo.jpeg"
import CustomizedSnackbars from '../../components/CustomSnackBar';
import { MyContext } from '../../ContextAPI';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}

      AKS

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// errorTypes
// error->red color
// warning->orange color
// info->bluecolor
// success-> green color

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {

  const { setLoggedInUserDetails, setLoggedIn } = React.useContext(MyContext)

  const navigate = useNavigate()
  const [flag, setFlag] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [errorType, setErrorType] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)


  // console.log(loggedIn)
  const [loginDetails, setLoginDetails] = React.useState({
    email: "",
    password: ""
  })

  const { email, password } = loginDetails;

  React.useEffect(() => {
    if (localStorage.getItem("userId") !== null) {



      navigate("/home")


    }
  }, [navigate])



  const handleLoginDetails = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {

      await fetch(`https://aks-backend.onrender.com/api/auth/login`, {
        method: 'POST',

        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email, password

        })

      }).then(async (res) => {

        const data = await res.json();
        setMessage(data.msg);
        setErrorType(data.type)
        setFlag(true)
        setIsLoading(false)


        if (data.success) {
          setTimeout(() => {
            setLoggedInUserDetails(data.user)
            localStorage.setItem("userId", JSON.stringify(data.user._id))
            setLoggedIn(true)
            setIsLoading(false)


          }, 1000);

        }

      })

    } catch (error) {
      console.log(error)

      setMessage("Oops!! It seems our servers are facing some issues. Please try again later")
      setErrorType("error")
      setFlag(true)

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
            Sign in

          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleLoginDetails(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => handleLoginDetails(e)}

            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              {isLoading ? <CircularProgress color="inherit" /> : 'Sign In'}


            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <NavLink to='/signup' variant="body2">
                  {"Don't have an account? Register"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}