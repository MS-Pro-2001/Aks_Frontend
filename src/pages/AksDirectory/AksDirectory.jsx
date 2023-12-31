import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
// import "./AksDirectory.css"
import { useLocation } from 'react-router-dom';


const AksDirectory = () => {




  const [query, setQuery] = useState("")
  const [aksDirectory, setAksDirectory] = useState([])

  useEffect(() => {
    (async () => {

      await fetch("https://sheetdb.io/api/v1/c2id24dx91yp0", {
        method: 'GET', headers: {
          'Content-type': 'application/json'
        }
      }).then(async (res) => {
        const aksComitteeData = await res.json();
        // console.log(aksComitteeData)
        setAksDirectory(aksComitteeData)
      }).catch((error => {
        console.log(error)

      }))

    })()

  }, [])


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
        <div className="total_entries">showing  {aksDirectory?.filter(user => user.Name.toLowerCase().includes(query)).length} entries</div>
        <div className="list-items">


          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>




            <List>
              {

                aksDirectory?.filter(user => user.Name.toLowerCase().includes(query)).map((item) =>

                  <div key={item?._id}>


                    <ListItem

                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">

                          <a href={"tel:" + item?.Contact_number}>
                            <CallIcon />

                          </a>


                        </IconButton>
                      }

                      disablePadding >
                      <ListItemButton>
                        <ListItemIcon>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={item?.image} />
                          </ListItemAvatar>

                        </ListItemIcon>

                        <ListItemText primary={item?.Name} secondary={item?.Designation} />




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

export default AksDirectory