import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CustomizedSnackbars from '../../components/CustomSnackBar';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const defaultTheme = createTheme();

export default function AddFamilyDetailsPage() {

    const navigate = useNavigate()
    const [flag, setFlag] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [errorType, setErrorType] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const [details, setDetails] = React.useState({
        name_of_member: '',
        relationship_with_user: '',
        dob: ''
    })



    const { name_of_member, relationship_with_user, dob } = details


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        try {

            await fetch(`https://aks-backend.onrender.com/api/user/add-family-details`, {
                method: 'POST',

                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": JSON.parse(localStorage.getItem("userId")),
                    name_of_member, relationship_with_user, dob


                })

            }).then(async (res) => {

                const data = await res.json();

                console.log(data)
                setMessage(data.msg);
                setErrorType(data.type)
                setTimeout(() => {
                    setIsLoading(false)
                    setFlag(true)

                }, 1000);

                if (data.success) {


                    setTimeout(() => {
                        navigate('/home')

                    }, 2000);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <FamilyRestroomIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Family details
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name_of_member"
                                    required
                                    fullWidth
                                    id="FullName"
                                    label="Name of member"
                                    autoFocus
                                    onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })}
                                />
                            </Grid>


                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    name="relationship_with_user"
                                    label="Relationship with the member"
                                    type="relationship_with_user"
                                    id="relationship_with_user"
                                    autoComplete="relationship_with_user"
                                    onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })}
                                />
                            </Grid>


                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>

                                        <DatePicker required onChange={(e) => setDetails({ ...details, dob: `${(e.$M + 1) < 10 ? '0' + (e.$M + 1) : (e.$M + 1)}-${e.$D < 10 ? '0' + e.$D : e.$D}-${e.$y}` })} format="MM/DD/YYYY" label="Date of birth" />

                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? <CircularProgress color="inherit" /> : 'Add Member'}
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}