import {
  Grid,
  Container,
  Typography,
  Button,
  CardActions,
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import Navbar from "./NavbarHome";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import imag2 from "../images/login6.jpg";
import userpic from "../images/userprofile.png";
//import { global } from "../App";
import { AdDContext, EmailContext } from "../../App";
import "@fontsource/montserrat";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:3001");

const ProductDetail = () => {
  const [Contact, setContact] = useState("");
  const { Email, setEMAIL } = useContext(EmailContext);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState([]);
  const [Ad, setAd] = useState([]);
  const { AdD } = useContext(AdDContext);
  const [user, setuser] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const [report, setReport] = useState(1);
  const [price, setPrice] = useState();
  const [usd, setusd] = useState(0);
  const [User, setUser] = useState("");
  const [isDealer, setisDealer] = useState(0);
  const [amount, setamount] = useState(78);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    // Handle the report submission logic here
    console.log("Selected options:", selectedOptions);
    console.log("Report reason:", reportReason);

    handleClose();
  };

  useEffect(() => {
    setPrice(1000);
    setuser(localStorage.getItem("email_token"));
    setRoom(localStorage.getItem("room"));
    var id = localStorage.getItem("AdID");
    setLoading(true);
    axios.get(`http://localhost:3006/Get_Up_Ad/${id}`).then((response) => {
      var temp = response.data;

      temp.forEach((element) => {
        element.Images = JSON.parse(element.Images);
      });
      console.log("Contav   ", temp[0].concat_number);
      setAd(temp);
      setPrice(temp[0].Cost);
      setImages(temp[0].Images);
      setMainImage(temp[0].Images[0]);
      setProduct(temp[0]);
      setContact(temp.concat_number);
      setLoading(false);
      localStorage.setItem("email2", temp[0].email);

      axios
        .get(`http://localhost:3006/Get_Up_User/${temp[0].email}`)
        .then((response) => {
          var temp = response.data;
          setUser(temp);
          console.log("bbvbbbb", temp[0].IsDealer);
          setisDealer(temp[0].IsDealer);
        });
    });

    console.log("after axios");
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("after get data");
      console.log("price is : ", price);
      var myHeaders = new Headers();
      myHeaders.append("apikey", "WkVouJ3EwA3LB3wz0LSmrdRGCR2B9Ue1");

      var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };
      console.log("HELO HELP HE:LP ");
      fetch(
        `https://api.apilayer.com/fixer/convert?to=usd&from=pkr&amount=${price}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("result is", result.result);
          // setusd(result)
          // console.log("THis is the :", usd["result"])
          setamount(result.result);
          console.log("PRICE IN USD IS : ", amount);
        })
        .catch((error) => console.log("error", error));

      // axios.get(`https://api.apilayer.com/fixer/convert?to=usd&from=pkr&amount=${price}`,requestOptions).then((response) => {
      //   var temp = response.data;
      //   console.log("hello" + temp)

      // });
    }
  }, [loading]);
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
    setuser(localStorage.getItem("email_token"));
    console.log("user is : ", user);
    localStorage.setItem("room", id);
    console.log("sen is : ", user);
    console.log("id is : ", id);
    // const  S= localStorage.getItem('room');

    console.log("AD ID IS : ", id);

    if (user !== "" && id !== "") {
      navigate("/AppC", { state: { user: user, room: id } });
    } else {
      navigate("/login");
    }
  };

  const chats = (id) => {
    if (user !== "" && id !== "") {
      navigate("/AppC", { state: { user: user, room: id } });
    } else {
      navigate("/login");
    }
  };

  function imageSet(ind) {
    console.log(ind);
    console.log(images);
    setMainImage(images[ind]);
    console.log(mainImage);
    console.log(isDealer);
  }

  const Report = (id) => {
    var AdID = localStorage.getItem("AdID");
   
    console.log(reportReason);
    console.log(user);
    axios
      .put(`http://localhost:3006/Report_AD/${AdID}`, { User: user,Reason:reportReason })
      .then((response) => {
        console.log(response.data);
      });

      
    handleClose();
  };
  const viewProfile = (email) => {
    console.log(email);
    localStorage.setItem("AdUser", email);
    localStorage.setItem("pro", 1);
    navigate("/profile");
  };

  console.log(images);
  useEffect(() => {
    if (!localStorage.getItem("email_token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <main>
        <div className="sell-banner">
          <div className="overlaybg0"></div>
          <img className="img1" src={imag2}></img>
          <div className="ContentLanding">
            <Container sx={{ py: 3 }}>
              <Grid
                container
                spacing={1}
                marginTop={5}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  height: "550px",
                  borderRadius: "20px",
                  color: "#ffffff",
                  boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                  marginTop: "60px",
                }}
              >
                <Grid item xs={12} sm={7}>
                  <Grid container padding={1}>
                    <Grid
                      item
                      xs={12}
                      height={350}
                      width="inherit"
                      borderRadius={3}
                    >
                      <img
                        src={mainImage}
                        style={{
                          borderRadius: "inherit",
                          height: "inherit",
                          width: "inherit",
                        }}
                      ></img>
                    </Grid>
                    {images.map((image, ind) => (
                      <Grid item xs={4} borderRadius={3} padding={"1rem"}>
                        <img
                          src={image}
                          width={200}
                          height={100}
                          onClick={() => {
                            imageSet(ind);
                          }}
                          style={{
                            borderRadius: "inherit",
                            height: 120,
                            width: 170,
                          }}
                        ></img>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Grid
                    container
                    height={"initial"}
                    style={{ marginLeft: "10px" }}
                  >
                    <Grid item xs={12}>
                      <Typography
                        gutterBottom
                        variant="h4"
                        style={{ fontweight: "bold" }}
                        component="div"
                      >
                        {product.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{ fontSize: "20px", color: "#ffffff" }}
                      >
                        Description: {product.Description}
                      </Typography>
                    </Grid>
                    <Typography
                      gutterBottom
                      variant="h5"
                      style={{ fontweight: "bold" }}
                      component="div"
                    >
                      Ad Location: {product.Location}
                    </Typography>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h5" component="div">
                        Price: {product.Cost} Pkr
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h5" component="div">
                        +92 {product.contact_number}
                      </Typography>
                    </Grid>
                    
                    <CardActions sx={{ marginTop: "21px" }}>
                      <form
                        action="https://www.escrow-sandbox.com/checkout"
                        method="post"
                      >
                        <input type="hidden" name="type" value="domain_name" />
                        <input
                          type="hidden"
                          name="non_initiator_email"
                          value="arslanm1517@gmail.com"
                        />
                        <input
                          type="hidden"
                          name="non_initiator_id"
                          value="1295393"
                        />
                        <input
                          type="hidden"
                          name="non_initiator_role"
                          value="seller"
                        />
                        <input type="hidden" name="title" value="Buy Now" />
                        <input type="hidden" name="currency" value="USD" />
                        <input
                          type="hidden"
                          name="domain"
                          value="gamingstan.com"
                        />
                        <input
                          name="price"
                          required
                          value={amount}
                          type="hidden"
                        />
                        <input type="hidden" name="concierge" value="false" />
                        <input
                          type="hidden"
                          name="with_content"
                          value="false"
                        />
                        <input
                          type="hidden"
                          name="inspection_period"
                          value="1"
                        />
                        <input type="hidden" name="fee_payer" value="split" />
                        <input type="hidden" name="return_url" value="" />
                        <input type="hidden" name="button_types" value="both" />
                        <input type="hidden" name="auto_accept" value="" />
                        <input type="hidden" name="auto_reject" value="" />
                        <input
                          type="hidden"
                          name="item_key"
                          value="undefined"
                        />
                        <Button
                          className="adDetail-btn"
                          type="submit"
                          sx={{
                            backgroundColor: "#008083",
                            color: "#FFFFFF",
                            border: "2px solid #008083",
                          }}
                        >
                          Buy It Now
                        </Button>
                        <img
                          src="https://t.escrow-sandbox.com/1px.gif?name=bin&price&title=Buy%20Now&user_id=1295393"
                          style={{ display: "none" }}
                        />
                        <Button
                          className="adDetail-btn"
                          onClick={() => {
                            GO(product.Ad_id);
                          }}
                          sx={{
                            backgroundColor: "#008083",
                            color: "#FFFFFF",
                            border: "2px solid #008083",
                            marginLeft: "20px",
                          }}
                        >
                          Contact Seller
                        </Button>
                      </form>
                    </CardActions>
                    <CardActions
                      sx={{ marginTop: "140px", marginLeft: "255px" }}
                    >
                      <Button
                        className="adDetail-btn"
                        onClick={() => {
                          viewProfile(product.email);
                        }}
                        sx={{
                          backgroundColor: "#008083",
                          color: "#FFFFFF",
                          border: "2px solid #008083",
                          marginLeft: "20px",
                        }}
                      >
                        <img className="userpic" src={userpic}></img>Seller
                        Profile
                      </Button>
                    </CardActions>

                    <CardActions
                      sx={{
                        marginBottom: "70px",
                        marginLeft: "335px",
                        textDecorationLine: "underline",
                      }}
                    >
                      <Button
                        className="report-btn"
                        onClick={handleOpen}
                        sx={{
                          color: "#FFFFFF",
                          borderRadius: "20px",
                          minWidth: "40px",
                        }}
                      >
                        Report Ad
                      </Button>
                    </CardActions>

                    <Dialog open={open} onClose={handleClose} maxWidth="md">
                      <DialogTitle>Report Ad</DialogTitle>
                      <DialogContent>
                        <TextField
                          label="Reason"
                          multiline
                          rows={8}
                          style={{width:550}}
                   
                          onChange={(e) => setReportReason(e.target.value)}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button
                          onClick={Report}
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
