import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./Wards.css"

const Wards = () => {

    const [query, setQuery] = useState("")
    const navigate = useNavigate()


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

    return (
        <div>

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
                    <div className="total_entries">showing  {wards?.filter((val) => val.toLowerCase().includes(query)).length} entries</div>
                    <div className="list-items">


                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>




                            <List>
                                {

                                    wards?.filter((val) => val.toLowerCase().includes(query)).map((item) =>

                                        <div key={item}>


                                            <ListItem
                                                onClick={() => navigate(`/userList/${item.toLowerCase()}`)}
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete">

                                                        <ArrowForwardIosIcon />

                                                    </IconButton>
                                                }

                                                disablePadding >
                                                <ListItemButton>


                                                    <ListItemText primary={item} />




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



        </div>
    )
}

export default Wards