import React, { useEffect, useState, useContext } from 'react'
import "../pages/App.css";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import add from '../images/add1.png';
import Navbar from './Navbar2';
import { AdFContext } from '../../App';
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

function Managead() {

  const navigate = useNavigate()
  const [page, setpage] = useState(0);
  const [Adpac, setAdPac] = useState([]);
  const { AdFID, setAdFID } = useContext(AdFContext);
  const [check, setcheck] = useState();
  console.log("hleo")
  useEffect(() => {

    axios.get("http://localhost:3006/Get_AdPackages").then((response) => {

      setAdPac(response.data);

    });
  }, []);

  const CurrentPkg = () => {
    axios.get("http://localhost:3006/Get_AdPackages").then((response) => {
      setcheck(1)
      setAdPac(response.data);

    });
  }


  const PreviousPkg = () => {
    axios.get("http://localhost:3006/Get_PreAdPackages").then((response) => {
      setcheck(0)
      setAdPac(response.data);

    });
  }
  const delete_AdPac = (id) => {
    axios.put(`http://localhost:3006/del_AdPackage/${id}`).then((res) => {
      console.log(res.data);
      setAdPac(
        Adpac.filter((val) => {
          return val.AdF_id != id
        }))
    })

  }

  const Active_AdPac = (id) => {
    axios.put(`http://localhost:3006/Active_AdPackage/${id}`).then((res) => {
      console.log(res.data);
      setAdPac(
        Adpac.filter((val) => {
          return val.AdF_id != id
        }))
    })

  }
  const navi = () => {
    navigate("/addpackage")
  }
  function update(id) {
    console.log("THIS IS ID : ", id)
    setAdFID(id)
    navigate("/editpackage");

  }
  useEffect(() => {
    if (!localStorage.getItem('Adminemail')) {
      navigate('/Adminlogin')
    }
  }, [])


  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
    <div>
      <Navbar />
      <div>
        <div className='page-heading'>


          <div class="pageheading">
            <h1>Manage Ad Featuring Packages</h1>
          </div>
          <div>
            <button className="manage-btn" onClick={navi} style={{ "background-color": "#FFFFFF" }}>
              <img className='pass-icon' src={add} />
              Add Packages
            </button>
          </div>
          <div className='head'>
            <button style={{ "background-color": "#008083", "color": "#F78104", "borderRadius": "10px", "borderColor": "#F78104", "marginRight": "10px" }} onClick={() => { CurrentPkg() }}>Current Packages</button>
            <button style={{ "background-color": "#008083", "color": "#F78104", "borderRadius": "10px", "borderColor": "#F78104", "marginRight": "10px" }} onClick={() => { PreviousPkg() }}>Previous Packages</button>
          </div>

          <main>
            <Container sx={{ py: 8, marginTop: 2 }}>

              <Grid container spacing={4}>
                {Adpac.map((card) => (
                  <Grid class="package-card" item key={card} xs={12} sm={6} md={3}>
                    <Card

                      style={{ backgroundColor: "#F78104", height: "260px", width: "300px", borderRadius: "20px" }}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center"

                      }}

                    >

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h4" component="h4" style={{ color: "rgba(0, 95, 96, 0.8)" }} sx={{ fontWeight: 'bold' }}>
                          {card.Title}
                        </Typography>
                        <Typography variant="p" style={{ color: "rgba(0, 95, 96, 1)", fontSize: "18px" }}>
                          {card.Description}
                        </Typography>
                      </CardContent>
                      <Box alignItems={"center"}>
                        <Typography variant="p" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)", fontSize: "16px" }}>
                          Rs.{card.Price}/-
                        </Typography>

                      </Box>
                      <Box alignItems={"center"} >
                        <CardActions sx={{ marginLeft: 9 }}>
                          {
                          check==1 ?<div> <Button class="pkg-btn" style={{ color: 'orange' }} onClick={() => { delete_AdPac(card.AdF_id) }}>Delete</Button>
                          <Button class="pkg-btn" style={{ 'margin-left': '10px', color: 'orange' }} onClick={() => { update(card.AdF_id) }}>Update</Button></div>
                          :<Button class="pkg-btn" style={{ 'margin-left': '15px', color: 'orange' }} onClick={() => { Active_AdPac(card.AdF_id) }}>Activate</Button>
                          }
                          
                        </CardActions>
                      </Box>
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
      </div>
    </div>
    </div>
  )
}

export default Managead;
