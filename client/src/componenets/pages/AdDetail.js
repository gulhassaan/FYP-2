import { Grid, Container, Typography, Button, CardActions, Hidden } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import Navbar from './NavbarHome';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//import { global } from "../App";
import { AdDContext,EmailContext } from "../../App";
import "@fontsource/montserrat";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const ProductDetail = () => {




const {Email,setEMAIL} = useContext(EmailContext)
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [product, setProduct] = useState([]);
  const [Ad, setAd] = useState([])
  const { AdD } = useContext(AdDContext);
  const [user, setuser] = useState("")
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [report, setReport] = useState(1);
  const [price, setPrice] = useState();
  const [usd, setusd] = useState(0);
  const [amount, setamount] = useState(78);
  const [loading, setLoading] = useState(true);
  const [contact_number,setContact] = useState();
  useEffect(() => {
    setPrice(1000)
    setuser(localStorage.getItem("user"));
    setRoom(localStorage.getItem('room'));
    setLoading(true)
    axios.get(`http://localhost:3006/Get_Up_Ad/${AdD}`).then((response) => {
      var temp = response.data;
      
      temp.forEach(element => {
        element.Images = JSON.parse(element.Images)

      });
      console.log("Contav   ",temp[0].concat_number)
      setAd(temp);
      setPrice(temp[0].Cost)
      setImages(temp[0].Images)
      setMainImage(temp[0].Images[0])
      setProduct(temp[0])
    setContact(temp.concat_number);
      setLoading(false);
      console.log("got data")

    });

    console.log("after axios")



  }, []);

  useEffect(() => {

    if (!loading) {
      console.log("after get data")
      console.log("price is : ", price)
      var myHeaders = new Headers();
      myHeaders.append("apikey", "WkVouJ3EwA3LB3wz0LSmrdRGCR2B9Ue1");

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
console.log("HELO HELP HE:LP ")
      fetch(`https://api.apilayer.com/fixer/convert?to=usd&from=pkr&amount=${price}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log("result is",result.result)
          // setusd(result)
          // console.log("THis is the :", usd["result"])
          setamount(result.result)
          console.log("PRICE IN USD IS : ", amount);
        })
        .catch(error => console.log('error', error));


      // axios.get(`https://api.apilayer.com/fixer/convert?to=usd&from=pkr&amount=${price}`,requestOptions).then((response) => {
      //   var temp = response.data;
      //   console.log("hello" + temp)


      // });


    }
  }, [loading])
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
    console.log(Email);
    setuser(localStorage.getItem("user"));
    console.log("user is : ", user)
    localStorage.setItem('room', id)
    console.log("sen is : ", user)
    console.log("id is : ", id)
    // const  S= localStorage.getItem('room');

    console.log("AD ID IS : ", id)

    if (user !== "" && id !== "") {
      navigate("/AppC", { state: { user: Email, room: id } })
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
    axios.put(`http://localhost:3006/Report_AD/${AdID}`).then((response) => {
      console.log(response.data);

    })

    navigate("/home");
  }

  console.log(images);
  useEffect(() => {
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  return (
    <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
      <Navbar />
      <main>
        <Container sx={{ py: 3 }} >
          <Grid container spacing={1} marginTop={5} style={{ backgroundColor: "#FFFFFF", height: "550px", borderRadius: "20px", color: "rgba(0, 95, 96, 2)", boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}>
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
                  <Typography gutterBottom variant="h4" style={{ fontweight: "bold" }} component="div">
                    {product.title}
                  </Typography>
        
                </Grid>
                <Grid item xs={12} >
                  <Typography gutterBottom variant="body1" component="div" style={{ fontSize: "20px", color: "rgba(0, 95, 96, 2)" }}>
                    {product.Description}
                  </Typography></Grid>
                  <Typography gutterBottom variant="h5" style={{ fontweight: "bold" }} component="div">
                  {product.Location}
                </Typography>
                <Grid item xs={12}><Typography gutterBottom variant="h5" component="div">
                  Price: Rs.{product.Cost}/-
                </Typography></Grid>
                <Grid item xs={12}><Typography gutterBottom variant="h5" component="div">
               +92 {product.contact_number}
              </Typography></Grid>
                <CardActions sx={{ marginTop: "20px" }}>
                  <Button className="adDetail-btn"  onClick={() => { GO(product.Ad_id) }} sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF" }}>Contact Seller</Button>
                  <Button className="adDetail-btn"  onClick={() => { Report(product.Ad_id) }} sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF" }}>Report</Button>

                </CardActions>
                <CardActions sx={{ marginTop: "21px" }}>
                  <form action="https://www.escrow-sandbox.com/checkout" method="post">
                    <input type="hidden" name="type" value="domain_name" />
                    <input type="hidden" name="non_initiator_email" value="arslanm1517@gmail.com" />
                    <input type="hidden" name="non_initiator_id" value="1295393" />
                    <input type="hidden" name="non_initiator_role" value="seller" />
                    <input type="hidden" name="title" value="Buy Now" />
                    <input type="hidden" name="currency" value="USD" />
                    <input type="hidden" name="domain" value="gamingstan.com" />
                    <input name="price" required value={amount} type="hidden" />
                    <input type="hidden" name="concierge" value="false" /><input type="hidden" name="with_content" value="false" /><input type="hidden" name="inspection_period" value="1" /><input type="hidden" name="fee_payer" value="split" /><input type="hidden" name="return_url" value="" /><input type="hidden" name="button_types" value="both" />
                    <input type="hidden" name="auto_accept" value="" /><input type="hidden" name="auto_reject" value="" />
                    <input type="hidden" name="item_key" value="undefined" />
                    <Button className="adDetail-btn" type="submit" sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF"}}>Buy It Now</Button>
                    <img src="https://t.escrow-sandbox.com/1px.gif?name=bin&price&title=Buy%20Now&user_id=1295393" style={{ display: "none" }} />
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
