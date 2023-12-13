// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import logo from "../../images/aks_logo.jpeg"
// import { NavLink, useNavigate } from 'react-router-dom';
// import { MyContext } from '../../ContextAPI';


// function ResponsiveAppBar() {


//   const { setLoggedIn } = React.useContext(MyContext)
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     setLoggedIn(false)
//     localStorage.clear()


//     navigate("/")

//   }


//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <NavLink to="/home">


//             <div style={{ marginRight: 10 }}>
//               <img style={{ borderRadius: 50 }} src={logo} alt="" width={50} height={50} />

//             </div>

//           </NavLink>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             <NavLink to="/home" style={{ textDecoration: 'none', color: 'white' }}>
//               AKS
//             </NavLink>
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
//           {
//             localStorage.getItem("userId") !== null &&
//             <Box sx={{ flexGrow: 0 }}>
//               <Button style={{ color: 'white', border: '1px solid white', marginLeft: '10px' }} onClick={() => navigate("/userinfopage")} >Profile</Button>
//               <Button style={{ color: 'white', border: '1px solid white', marginLeft: '10px' }} onClick={() => handleLogout()} >logout</Button>
//             </Box>
//           }


//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;
