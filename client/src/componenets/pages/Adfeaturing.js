import React, { useEffect, useState, useContext } from 'react'
import "../pages/App.css";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import NavbarS from './Navbar';
import "./Adfeaturing.css";

const Adfeaturing = () => {

  const [Adpac, setAdPac] = useState([]);
const navigate = useNavigate();  
  
  useEffect(() => {

    axios.get("http://localhost:3006/Get_AdPackages").then((response) => {

      setAdPac(response.data);

    });

  }, []);


  const Payment=(price,title,days)=>{
    localStorage.setItem('TotalBill', price)
    localStorage.setItem('PackageType',title)
    localStorage.setItem('PackageDays',days)
    navigate('/payment');
  }
  return (

    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
    <div>
      <NavbarS />
      <div>
        <div className='page-heading'>


          <div class="pageheading" style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"90PX" }}>
            <h1>Buy Ad Featuring Packages</h1>
          </div>

          <main>
          {Adpac!=""?
            <Container sx={{ py: 8, marginTop: 2 }}>

              <Grid container spacing={6}>
                {Adpac.map((card) => (
                  <Grid class="package-card" item key={card} xs={12} sm={6} md={3} style={{marginLeft:50}}>
                    <Card

                      style={{ backgroundColor: "#FFFFFF", height: "260px", width: "300px", borderRadius: "15px"}}
                      sx={{
                        height:"100%",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                       
                    margin: "0 auto",
                    padding: "0.1em",
                    maxHeight: 450
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
                      <br></br>
                   
                      <Button class="pkg-btn" style={{ color: 'white' }} onClick={() => {Payment(card.Price,card.Title,card.Days)}}>Buy Now</Button>
       
                    </Card>
                    
                    
              
                  </Grid>
                  
                ))}
                
              </Grid>
            
            </Container>:<div>
            <h2 style={{ marginTop: 100, marginLeft: 600, marginBottom: 340,color:"white" }}>No Ad Featuring Packages</h2>
            
          </div>}
            
          </main>
          





        </div>
      </div>
    </div>
    </div>
  );
};

export default Adfeaturing;