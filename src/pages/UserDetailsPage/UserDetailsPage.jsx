import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { MyContext } from '../../ContextAPI'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';


const UserDetailsPage = () => {
    const { user_id } = useParams()
    const { allUsers } = useContext(MyContext)
    const [familyDetails, setFamilyDetails] = useState([])



    useEffect(() => {

        (async () => {
            await fetch("https://aks-backend.onrender.com/api/user/fetchFamilyDetails", {
                method: 'POST',

                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    user_id

                })

            })
                .then(async (res) => {
                    const data = await res.json()
                    setFamilyDetails(data)


                })
        })()

    }, [user_id])



    const mainUser = allUsers.filter((item) => {

        return item._id === user_id;
    })


    return (
        <>








            <div style={{ margin: '20px 20px' }}>

                <div className="row my-2 d-flex justify-content-center" >
                    {/* <div className="col-4"></div> */}
                    <div className="col d-flex justify-content-center"  >

                        {/* <div className=" my-4">

            <div className=" top-0 start-50 translate-middle "> */}

                        {/* <img style={{ borderRadius: "20px", objectFit: "cover" }} src={`https://drive.google.com/uc?export=view&id=${singleUser[0].Family_Photo.replace("https://drive.google.com/open?id=", "")}`} alt="" width={280} height={300} /> */}

                        {/* <Avatar
                    alt="Remy Sharp"
                    src = {`https://drive.google.com/uc?export=view&id=${singleUser[0].Family_Photo.replace("https://drive.google.com/open?id=","")}`}
                    // src="https://drive.google.com/file/d/1oyLUEfp2RFXqjSabNHk8WhE2y5EzMwWf/view"
                    // sx={{ width: 90, height: 80 }}
                    style={{width:"100px",height:"90px",boxShadow:'1px 1px 3px 1px grey'}}
                /> */}

                        {/* </div>
        </div> */}

                    </div>
                    {/* <div className="col-4"></div> */}


                </div>



                <List

                    sx={{ width: '100%', boxShadow: '1px 1px 1px 1px  lightgrey', borderRadius: '20px' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader style={{ background: '#1976d2', borderRadius: '20px 20px 0px 0px', color: 'white' }} component="div" id="nested-list-subheader">
                            Primary Details
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={mainUser[0]?.firstName + " " + mainUser[0].lastName} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <CallIcon />
                        </ListItemIcon>
                        <ListItemText primary={mainUser[0]?.phone_no} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <RoomIcon />
                        </ListItemIcon>
                        <ListItemText primary={mainUser[0]?.address} />
                    </ListItemButton>

                </List>

            </div>

            {familyDetails.length !== 0 ?
                <div style={{ margin: '20px 20px' }}>
                    <List

                        sx={{ width: '100%', boxShadow: '1px 1px 1px 1px  lightgrey', borderRadius: '20px' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader style={{ background: '#1976d2', borderRadius: '20px 20px 0px 0px', color: 'white' }} component="div" id="nested-list-subheader">
                                Family Details
                            </ListSubheader>
                        }
                    >
                        {familyDetails.map((item) =>

                            <ListItemButton key={item._id}>

                                <ListItemText primary={item?.name_of_member} secondary={item?.relationship_with_user} />
                                <ListItemText />
                                <ListItemText />
                                <ListItemText />
                                <ListItemText />
                                <ListItemText primary={item?.dob} />


                            </ListItemButton>
                        )}


                    </List>
                </div> : <></>

            }

        </>







    )
}

export default UserDetailsPage