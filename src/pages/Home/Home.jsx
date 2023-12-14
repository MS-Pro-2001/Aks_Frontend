import { Button, Card, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const HomeScreen = () => {
  const [currentDate] = React.useState(new Date());
  const navigate = useNavigate();
  const [details, setDetails] = React.useState("")






  const card = (
    <React.Fragment>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {currentDate.toDateString()}
        </Typography>
        <Typography variant="h5" component="div">
          Ahmedabad Kerala Samajam
        </Typography>
      </CardContent>
    </React.Fragment>
  );




  let btnArrJson = [
    {
      "name": "AKS Directory",
      "navigate": "wards",
      "state": "userList"

    },

    {
      "name": "AKS Ward Comittee Members ",
      "navigate": "wards",
      "state": "wardCommittee"
    },
    {
      "name": "AKS Office Bearers",
      "navigate": "officebearers",
      "state": "bearers"
    }
  ]


  React.useEffect(() => {
    (async () => {

      try {

        await fetch(`https://aks-backend.onrender.com/api/user/fetchSingelUser`, {
          method: 'POST',

          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            "user_id": JSON.parse(localStorage.getItem("userId"))

          })

        }).then(async (res) => {

          const data = await res.json();
          setDetails(data?.firstName)

        }).catch(err =>
          console.log(err)
        )


      } catch (error) {
        throw error

      }



    })()

  }, [])








  return (
    <Container maxWidth="sm" >
      <Typography sx={{ m: 2 }}>Welcome!! {details}</Typography>

      <Card variant="outlined" sx={{ mb: 2 }}>{card}</Card>


      <Box sx={{ width: '70%', margin: 'auto' }}>
        <Stack spacing={5}>
          {btnArrJson?.map((item) =>
            <Button key={item?.name} variant='contained' onClick={() => navigate(`/${item?.navigate}`, { state: `${item.state}` })}>{item?.name}</Button>
          )

          }

        </Stack>
      </Box>

    </Container>


  )
}

export default HomeScreen