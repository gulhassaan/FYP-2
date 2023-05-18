import { useEffect, useState } from "react";
import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import avatarUser from "../images/newUser.jpg"
import Navbar from "./NavbarHome";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import imag2 from '../images/login5.jpg';
import verifieduser from '../images/verified.png';
import Adfeaturing from "./Adfeaturing";
const UserProfile = () => {
  // Sample user data
  const [Ads, setAds] = useState([]);
  const [User, setUser] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(0);
  var profileCheck = localStorage.getItem("pro")
  console.log(profileCheck)
  useEffect(() => {
    if (profileCheck == 1) {
      var user = localStorage.getItem("AdUser")
    }
    else {
      var user = localStorage.getItem("email_token")
    }
    axios.get(`http://localhost:3006/Get_Up_User/${user}`)
      .then((response) => {
        var temp = response.data;
        setUser(temp[0])
      });
    console.log(User);
    axios.get(`http://localhost:3006/Get_MyAD/${user}`).then((response) => {
      console.log("THis is Response Data : ", response.data)
      var temp = response.data;
      temp.forEach(element => {

        element.Images = JSON.parse(element.Images)

      });
      setAds(temp);
      console.log("After parse : ", temp)
    });


  }, []);
const Adfeature=(id)=>{
  console.log("Id was",id);
  localStorage.setItem("SetIDPKG",id)
  navigate("/adfeaturing")
  
}
  return (
    <div>    <Navbar />
      <div className='sell-banner'>
        <div className="overlaybg0"></div>
        <img className="img1" src={imag2}></img>
        <div className='ContentLanding'>
          <Container maxWidth="md" style={{ paddingTop: "120px", paddingBottom: "120px",  }}>
            <Paper elevation={3} style={{ padding: "30px", display: "flex", flexDirection: "column", backgroundColor: "rgba(255, 255, 255, 0.2)",  color: "#ffffff", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item>
                  <img src={avatarUser} alt="Profile Picture" style={{ width: "120px", height: "120px", marginBottom: "20px" }} />
                </Grid>
                <Grid item>
                  <Typography variant="h4" gutterBottom>
                    Name: {User.Name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {User.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Contact: {User.contact_number}
                  </Typography>
                  {profileCheck == 0 ?
                    <div>
                      {User.IsDealer == 0 ?
                        <Button class="myad-btn" onClick={() => { navigate("/userauth") }}>Authenticate as a Dealer</Button>
                        : <Typography variant="body1" gutterBottom><img className="verify-icon" src={verifieduser}></img> Authenticated User</Typography> }
                        
                    </div>
                    
                    : <div>{User.IsDealer == 0 ?
                      <Typography variant="body1" gutterBottom>Type: Not Verified User</Typography>
                      : <Typography variant="body1" gutterBottom>Type: Authenticated User</Typography>}
                    </div>}

                </Grid>
              </Grid>
            </Paper>
          </Container>
          <main style={{ marginTop: 60 }}>
            <div style={{ textAlign: "center", color: "#ffffff" }}>
              <h1><b>User Ads</b></h1>
            </div>
{Ads!=""?
            <Container sx={{ py: 8 }} to>

              <Grid container spacing={4}>
                {Ads.map((card) => (
                  <Grid class="myad-card" item key={card} xs={12} sm={6} md={3}>
                    <Card
                      style={{ height: "480px", borderRadius: "20px", width: "350px", backgroundColor: "rgba(255, 255, 255, 0.2)",  color: "#ffffff", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}
                      sx={{
                        maxWidth: 480,
                        maxHeight: 450
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={200}

                        sx={{ padding: "1em 1em 0 1em" }}
                        image={card.Images[0]}
                        alt="random"

                      />
                      <CardContent sx={{ flexGrow: 1 }}  >
                        <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "#ffffff" }}>
                          {card.title}
                        </Typography>

                        <Typography variant="p">
                          {card.Description}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ topmargin: "5px", color: "#ffffff" }}>
                          {card.Location}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ color: "#ffffff" }}>
                          {card.date}
                        </Typography>
                        <br></br>
                        <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "#ffffff" }}>
                          Rs.{card.Cost}/-
                        </Typography>
{
  profileCheck == 0?
  <Button class="feature-btn" onClick={() => { Adfeature(card.Ad_id) }}>Feature Ad</Button>:<p></p>
                      } 
                      </CardContent>
                    </Card>
                  </Grid>

                ))}
              </Grid>
              <Stack spacing={2} alignItems={"center"}>
                <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
              </Stack>
            </Container>:<div>
            <h2 style={{ marginTop: 100, marginLeft: 600, marginBottom: 340,color:"white" }}>No Ads</h2>
            
          </div>}
          </main>
        </div>
      </div>
    </div>

  );
};

export default UserProfile;
