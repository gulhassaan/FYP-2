

// // function Home() {


// //   return (
// //     <div>
// //       {listOfPosts.map((value, key) => {
// //         return (
// //           <div className="post">
// //             <div className="title"> {value.title} </div>
// //             <div className="body">{value.postText}</div>
// //             <div className="footer">{value.username}</div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // }

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { color } from '@mui/system';
import Navbar from './Navbar';
import { Link,useNavigate } from "react-router-dom";
export const LandingPage = () => {
  const [listOfAds, setListOfAds] = useState([]);
  const [page, setpage] = useState(0);
  const [img, setimg] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_AD`).then((response) => {
      console.log("THis is Response Data : ",response.data)
      var temp = response.data;
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)
      
      });
      setListOfAds(temp);
      console.log("After parse : ",temp)
    });
  }, []);
  const navigate = useNavigate();
  const moreinfo = () => {
navigate('/login')
  }
  
  useEffect(() => {
    if(localStorage.getItem('email_token'))
    {
      navigate('/home')
    }
  }, [])
  return (

    <div style={{backgroundColor:"rgba(0, 0, 0, 0)"}}>
<Navbar/>
    <main>
    <Container  sx={{ py: 8 }}>
    
      <Grid container spacing={4}>
        {listOfAds.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <Card
            style={{backgroundColor:"#FFFFFF",height:"450px",borderRadius:"20px"}}
            sx={{
              maxWidth: 280,
              margin: "0 auto",
              padding: "0.1em",
              maxHeight:450
            }}
            >
              <CardMedia
                component="img"
            
                height={200}
                image={card.Images[0]}
                alt="random"
                sx={{ padding: "1em 1em 0 1em" }}
              />
              <CardContent sx={{ flexGrow: 1 }}  >
                <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{color:"rgba(0, 95, 96, 0.8)"}}>
                  {card.title}
                </Typography>

                <Typography variant="p">
                 {card.Description}
                </Typography>
<br></br>
                <Typography variant="p" style={{topmargin:"5px",color:"rgba(0, 95, 96, 0.8)"}}>
                {card.Location}
               </Typography>
               <br></br>
                <Typography variant="p" style={{color:"rgba(0, 95, 96, 0.8)"}}>
                {card.date}
               </Typography>
               <br></br>
               <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{color:"rgba(0, 95, 96, 0.8)"}}>
                 Rs.{card.Cost}/-
                </Typography>
              </CardContent>
              <Box alignItems={"center"} >
                      <CardActions sx={{ marginLeft: 8}}>
                        <Button class="forgot-btn" onClick={moreinfo}>More Info</Button>

                      </CardActions>
                    </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
        <Stack spacing={2} alignItems={"center"}>
<Pagination count={10} sx={{marginTop:7}} variant="outlined" color="secondary" onChange={(e,v)=>setpage(v-1)} />
</Stack>
    </Container>
  </main>



    </div>
  );



}



