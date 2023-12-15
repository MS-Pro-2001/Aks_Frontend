
import { Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




const AksOfficeBearers = () => {


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
        setAksDirectory(aksComitteeData)

      }).catch((error => {
        console.log(error)


      }))

    })()

  }, [])


  const designationWiseFilteredData = aksDirectory.filter((item) => {
    return item.designation !== "member"
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
        <div className="total_entries">showing  {designationWiseFilteredData?.filter(user => user.firstName.toLowerCase().includes(query.toLowerCase()) || user.designation.toLowerCase().includes(query.toLowerCase())).length} entries</div>
        <div className="list-items" >


          <List>





            {
              designationWiseFilteredData?.length === 0 ?
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
                :


                designationWiseFilteredData?.filter(user => user.firstName.toLowerCase().includes(query.toLowerCase()) || user.designation.toLowerCase().includes(query.toLowerCase())).map((item) =>

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
                      <ListItemButton>
                        <ListItemIcon>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={item?.image} />
                          </ListItemAvatar>

                        </ListItemIcon>

                        <ListItemText primary={item?.firstName} secondary={item?.designation} />




                      </ListItemButton>
                    </ListItem>


                    <Divider />

                  </div>
                )
            }




          </List>
        </div>

      </div>


    </div>
  )
}

export default AksOfficeBearers