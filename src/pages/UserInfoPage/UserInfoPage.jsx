import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import CustomizedSnackbars from '../../components/CustomSnackBar';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';


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

export default function Userinfopage() {

    const navigate = useNavigate()
    const [flag, setFlag] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [errorType, setErrorType] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)



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


    const [details, setDetails] = useState({

        firstName: '',
        lastName: '',
        email: '',
        phone_no: '',
        ward: '',
        address: '',
        dob: ''


    })


    React.useEffect(() => {

        (async () => {

            try {

                await fetch(`https://aks-backend.onrender.com/api/user/fetchSingelUser`, {
                    method: 'POST',

                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        "user_id": JSON.parse(localStorage.getItem("userId")),


                    })

                }).then(async (res) => {

                    const data = await res.json();
                    // console.log(data)
                    setDetails(data)
                }).catch(err =>
                    console.log(err)
                )


            } catch (error) {
                throw error

            }



        })()

    }, [])


    const { firstName, lastName, email, phone_no, ward, address, dob } = details

    const handleDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })

    }







    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        try {

            await fetch(`https://aks-backend.onrender.com/api/user/updateUser`, {
                method: 'POST',

                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": JSON.parse(localStorage.getItem("userId")),
                    firstName, lastName, email, phone_no, ward, address, dob

                })

            }).then(async (res) => {

                const data = await res.json();

                // console.log(data.user.dob)
                setMessage(data.msg);
                setErrorType(data.type)
                setTimeout(() => {
                    setIsLoading(false)
                    setFlag(true)

                }, 3000);



                setTimeout(() => {
                    navigate('/home')

                }, 6000);

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
                    {/* <div>
                        <img src={logo} alt="" width={100} height={100} />
                    </div> */}
                    <Typography component="h1" variant="h5">
                        Your Details
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
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    value={details?.address}
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


                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={dayjs(details?.dob)} required onChange={(e) => setDetails({ ...details, dob: `${(e.$M + 1) < 10 ? '0' + (e.$M + 1) : (e.$M + 1)}-${e.$D < 10 ? '0' + e.$D : e.$D}-${e.$y}` })} format="MM/DD/YYYY" label="Date of birth" />

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

                                            <MenuItem key={item} data-my-value={item} onClick={(e) => handleClose(e)} disableRipple>

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
                            {isLoading ? <CircularProgress color="inherit" /> : 'Update Details'}
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider >
    );
}