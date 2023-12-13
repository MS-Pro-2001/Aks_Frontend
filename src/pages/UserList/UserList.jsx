
import { useNavigate, useParams } from 'react-router-dom';
import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useContext, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';

import { MyContext } from '../../ContextAPI';
// import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./UserList.css"


const UserList = () => {

    const { ward_name } = useParams();

    const { allUsers } = useContext(MyContext)

    const navigate = useNavigate()

    const [query, setQuery] = useState("")


    const wardWiseFilteredData = allUsers.filter((item) => {
        return item.ward === ward_name
    })




    return (
        <div>
            <div className="search_container">

                <div className="search_bar">
                    <div className="search_icon "><SearchIcon color="primary" fontSize="large" /></div>
                    <div className="search_input">
                        <input type="text" placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>

                </div>
            </div>

            <div className="list">
                <div className="total_entries">showing  {wardWiseFilteredData?.filter((item) => item?.firstName.toLowerCase().includes(query))?.length} entries</div>
                <div className="list-items">


                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>




                        <List>
                            {
                                wardWiseFilteredData?.length === 0 ?
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        No Users found
                                    </Box>
                                    :

                                    wardWiseFilteredData?.filter((item) => item?.firstName.toLowerCase().includes(query)).map((item) =>

                                        <div key={item?._id}>


                                            <ListItem

                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete">

                                                        <a href={"tel:" + item?.phone_no}>
                                                            <CallIcon />

                                                        </a>


                                                    </IconButton>
                                                }

                                                disablePadding >
                                                <ListItemButton >
                                                    <ListItemIcon >
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={item?.image} />
                                                        </ListItemAvatar>

                                                    </ListItemIcon>


                                                    <ListItemText onClick={() => navigate(`/userDetail/${item?._id}`)} primary={item?.firstName} secondary={item?.designation} />





                                                </ListItemButton>
                                            </ListItem>

                                            <Divider />

                                        </div>
                                    )
                            }


                        </List>

                    </List>
                </div>

            </div>


        </div>
    )
}

export default UserList