import { Grid, Container, Typography, Button, CardActions } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import Navbar from './NavbarHome';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import { global } from "../App";
import { AdDContext } from "../../App";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const ProductDetail = () => {

  //let { id } = useParams();
  // const { user } = useContext(global);
  //  const isLoggedIn=!!user.id
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [product, setProduct] = useState([]);
  const [Ad, setAd] = useState([])
  const { AdD } = useContext(AdDContext);
  const [user, setuser] = useState("")
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [report, setReport] = useState(1);

  useEffect(() => {
    setuser(localStorage.getItem("user"));
    setRoom(localStorage.getItem('room'));
    axios.get(`http://localhost:3006/Get_Up_Ad/${AdD}`).then((response) => {
      var temp = response.data;
      temp.forEach(element => {
        element.Images = JSON.parse(element.Images)

      });
      setAd(temp);
      console.log("After parse : ", temp[0])
      setImages(temp[0].Images)
      setMainImage(temp[0].Images[0])
      setProduct(temp[0])
    });

  }, []);

  // const getUser = (AdID) => {
  //   setuser(localStorage.getItem("user"));
  //   setRoom(localStorage.getItem('room'));
  //   axios.get(`http://localhost:3006/get_userE/${AdID}`).then((res) => {
  //      setuser(res.data)
  //      console.log("Receiver User is : ", res.data[0].email)




  //   if (res.data[0].email !== "" && AdID !== "") 
  //   {
  //     console.log("rec is : ",res.data[0].email )
  //  navigate("/AppC",{state:{user:res.data[0].email,room:AdID}})
  //   }
  //   else
  //   {
  //     navigate("/login")
  //   }
  // })
  // }

  const GO = (id) => {
    setuser(localStorage.getItem("user"));
    console.log("user is : ", user)
    localStorage.setItem('room', id)
    console.log("sen is : ", user)
    console.log("id is : ", id)
    // const  S= localStorage.getItem('room');

    console.log("AD ID IS : ", id)

    if (user !== "" && id !== "") {
      navigate("/AppC", { state: { user: user, room: id } })
    }
    else {
      navigate("/login")
    }
  }

  const chats = (id) => {
    if (user !== "" && id !== "") {
      navigate("/AppC", { state: { user: user, room: id } })
    }
    else {
      navigate("/login")
    }
  }


  function imageSet(ind) {
    console.log(ind);
    console.log(images);
    setMainImage(images[ind]);
    console.log(mainImage);
  }

  const Report = (AdID) => {
    console.log(AdID)
    console.log(report)
    axios.put(`http://localhost:3006/Report_AD/${AdID}`, { Report: report }).then((response) => {
      console.log(response.data);
      navigate("/home")
    })


  }

  console.log(images);
  useEffect(() => {
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  return (
    <div style={{ backgroundColor: "rgba(0, 95, 96, 1)" }}>
      <Navbar />
      <main>
        <Container sx={{ py: 3 }} style={{ backgroundColor: "rgba(0, 95, 96, 0.8)" }}>
          <Grid container spacing={1} marginTop={5} style={{ backgroundColor: "#F78104", height: "550px", borderRadius: "20px", color: "rgba(0, 95, 96, 2)" }}>
            <Grid item xs={12} sm={7}>
              <Grid container padding={1}>
                <Grid item xs={12} height={350} width="inherit" borderRadius={3}>
                  <img src={mainImage} style={{ borderRadius: 'inherit', height: "inherit", width: 'inherit' }}></img>
                </Grid>
                {images.map((image, ind) => (
                  <Grid item xs={4} borderRadius={3} padding={'1rem'}>
                    <img
                      src={image}
                      width={200}
                      height={100}
                      onClick={() => {
                        imageSet(ind);
                      }}
                      style={{ borderRadius: 'inherit', height: 120, width: 170 }}
                    ></img>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Grid container height={'initial'} style={{ marginLeft: "10px" }}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h2" style={{ fontweight: "bold" }} component="div">
                    {product.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <Typography gutterBottom variant="body1" component="div" style={{ fontSize: "20px", color: "rgba(0, 95, 96, 2)" }}>
                    {product.Description}
                  </Typography></Grid>
                <Grid item xs={12}><Typography gutterBottom variant="h5" component="div">
                  Price: Rs.{product.Cost}/-
                </Typography></Grid>
                <CardActions sx={{ marginTop: "20px" }}>
                  <Button variant="contained" onClick={() => { GO(product.Ad_id) }} sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#F78104" }}>Contact Seller</Button>
                  <Button variant="contained" onClick={() => { Report(product.Ad_id) }} sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#F78104" }}>Report</Button>
             
                  <form action="https://www.escrow-sandbox.com/checkout" method="post">
                      <input type="hidden" name="type" value="domain_name" />
                      <input type="hidden" name="non_initiator_email" value="arslanm1517@gmail.com" />
                      <input type="hidden" name="non_initiator_id" value="1295393" />
                      <input type="hidden" name="non_initiator_role" value="seller" />
                      <input type="hidden" name="title" value="Buy Now" />
                      <input type="hidden" name="currency" value="USD" />
                      <input type="hidden" name="domain" value="gamingstan.com" />
                      <input type="number" name="price" required />
                      <input type="hidden" name="concierge" value="false" /><input type="hidden" name="with_content" value="false" /><input type="hidden" name="inspection_period" value="1" /><input type="hidden" name="fee_payer" value="split" /><input type="hidden" name="return_url" value="" /><input type="hidden" name="button_types" value="both" />
                      <input type="hidden" name="auto_accept" value="" /><input type="hidden" name="auto_reject" value="" />
                      <input type="hidden" name="item_key" value="undefined" />
                      <button class="EscrowButtonSecondary" type="submit">Buy It Now</button><img src="https://t.escrow-sandbox.com/1px.gif?name=bin&price&title=Buy%20Now&user_id=1295393" style={{"display": "none"}} />
                    </form>
                    <form action="https://www.escrow-sandbox.com/offer" method="post">
                      <input type="hidden" name="type" value="domain_name" />
                      <input type="hidden" name="non_initiator_email" value="arslanm1517@gmail.com" /><input
                        type="hidden" name="non_initiator_id" value="1295393" /><input type="hidden" name="non_initiator_role"
                          value="seller" /><input type="hidden" name="title" value="Buy Now" /><input type="hidden" name="currency"
                            value="USD" /><input type="hidden" name="domain" value="gamingstan.com" /><input type="hidden" name="price"
                              value="5" /><input type="hidden" name="concierge" value="false" /><input type="hidden" name="with_content"
                                value="false" />
                      <input type="hidden" name="inspection_period" value="1" /><input type="hidden" name="fee_payer"
                        value="split" /><input type="hidden" name="return_url" value="" /><input type="hidden" name="button_types"
                          value="both" /><input type="hidden" name="auto_accept" value="" /><input type="hidden" name="auto_reject"
                            value="" /><input type="hidden" name="item_key" value="6060a3b0-c2a2-11ed-9ec3-cda813b5bb3c" />
            
                      <button class="EscrowButtonSecondary" type="submit">Make An Offer</button>
                      <img src="https://t.escrow-sandbox.com/1px.gif?name=bin&price=5&title=Buy%20Now&user_id=1295393" style={{"display": "none"}}/>
                    </form>
                 


                  
                  







                </CardActions>


              </Grid>
            </Grid>
          </Grid>
          
        </Container>

          </main>

         
    </div>
    
  );
};


export default ProductDetail;
