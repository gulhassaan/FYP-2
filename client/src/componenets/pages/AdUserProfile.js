import { useEffect,useState } from "react";
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
const UserProfile = () => {
  // Sample user data
  const [Ads, setAds] = useState([]);
  const [User,setUser] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(0);
  var profileCheck = localStorage.getItem("pro")
  useEffect(() => {
    var user = localStorage.getItem("AdUser")
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

  return (
    <div>    <Navbar />
    <Container maxWidth="md" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <Paper elevation={3} style={{ padding: "30px", display: "flex", flexDirection: "column" }}>
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
              {User.IsVerified == 0 ?
                <Button class="myad-btn" onClick={() => {navigate("/userauth")}}>Authenticate as a Dealer</Button>
              :<Typography variant="body1" gutterBottom>Type: Authenticated User</Typography>}
             </div>
            :<Typography variant="body1" gutterBottom>Type: Authenticated User</Typography>}
          </Grid>
        </Grid>
      </Paper>
    </Container>
    <main style={{marginTop:60}}>
    <div style={{ textAlign:"center", color:"rgba(0, 95, 96, 1)", }}>
    <h1><b>User Ads</b></h1>
    </div>
  
    <Container sx={{ py: 8 }} to>

      <Grid container spacing={4}>
        {Ads.map((card) => (
          <Grid class="myad-card" item key={card} xs={12} sm={6} md={3}>
            <Card
              style={{ backgroundColor: "#FFFFFF", height: "480px", borderRadius: "20px", width: "350px", boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.25)" }}
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
                <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                  {card.title}
                </Typography>

                <Typography variant="p">
                  {card.Description}
                </Typography>
                <br></br>
                <Typography variant="p" style={{ topmargin: "5px", color: "rgba(0, 95, 96, 0.8)" }}>
                  {card.Location}
                </Typography>
                <br></br>
                <Typography variant="p" style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                  {card.date}
                </Typography>
                <br></br>
                <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                  Rs.{card.Cost}/-
                </Typography>
               
              </CardContent>
            </Card>
          </Grid>

        ))}
      </Grid>
      <Stack spacing={2} alignItems={"center"}>
        <Pagination count={10} sx={{ marginTop: 7 }} variant="outlined" color="secondary" onChange={(e, v) => setpage(v - 1)} />
      </Stack>
    </Container>
  </main>
    </div>

  );
};

export default UserProfile;
