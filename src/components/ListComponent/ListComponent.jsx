// import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from '@mui/material'
// import React, { useContext, useEffect, useState } from 'react'
// import CallIcon from '@mui/icons-material/Call';

// import Avatar from '@mui/material/Avatar';
// import InputBase from '@mui/material/InputBase';

// import { styled, alpha } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';

// import { NavLink, useNavigate } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';
// // import { MyContext } from '../ContextAPI';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import "./listComponent.css"



// const ListComponent = ({ data_arr }) => {


//   const [query, setQuery] = useState("")
//   // const [data, setData] = useState([...data_arr])





//   // const handleQuery = (e) => {

//   //   setQuery(e.target.value);
//   //   // console.log(query)

//   //   var updatedList = [...data_arr];

//   //   updatedList = data_arr.filter((item) => {

//   //     return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
//   //   });

//   //   setData(updatedList);
//   //   // Edege case
//   //   if (query.length === 0 || query.length === 1) {

//   //     setData(data_arr);
//   //   }


//   // };






//   return (
//     <>



//       <div className="search_container">

//         <div className="search_bar">
//           <div className="search_icon "><SearchIcon color="primary" fontSize="large" /></div>
//           <div className="search_input">
//             <input type="text" placeholder="search..." value={query} onChange={(e) => handleQuery(e)} />
//           </div>

//         </div>
//       </div>

//       <div className="list">
//         <div className="total_entries">showing  {data_arr.length} entries</div>
//         <div className="list-items">


//           <List sx={{ width: '100%', bgcolor: 'background.paper' }}>




//             <List>
//               {

//                 data_arr?.map((item) =>

//                   <div key={item?._id}>
//                     <NavLink style={{ textDecoration: 'none' }} to={item?._id ? `/userDetail/${item?._id}` : `/userlist/${item}`} >

//                       <ListItem

//                         secondaryAction={
//                           <IconButton edge="end" aria-label="delete">
//                             {
//                               item?.Contact_number ? <>
//                                 <a href={"tel:" + item?.Contact_number}>
//                                   <CallIcon />

//                                 </a>

//                               </> : <>
//                                 <ArrowForwardIosIcon />
//                               </>
//                             }

//                           </IconButton>
//                         }

//                         disablePadding >
//                         <ListItemButton>
//                           <ListItemIcon>
//                             <ListItemAvatar>
//                               <Avatar alt="Remy Sharp" src={item?.image ? <>{item?.image}</> : <></>} />
//                             </ListItemAvatar>

//                           </ListItemIcon>

//                           <ListItemText primary={item?.firstName || item} secondary={item?.designation} />




//                         </ListItemButton>
//                       </ListItem>
//                     </NavLink>

//                     <Divider />

//                   </div>
//                 )
//               }


//             </List>

//           </List>
//         </div>

//       </div>










//     </>
//   )
// }

// export default ListComponent