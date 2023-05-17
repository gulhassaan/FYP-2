import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Container,
  Typography,
  Button,
  CardActions,
  TextField,
  Box,
} from "@mui/material";
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import NavbarD from "./NavbarD";
import { AdDContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "@fontsource/montserrat";
import imag2 from '../images/login10.jpg';
const ProductDetail = () => {
  const [rating, setRating] = useState(0);
  const [Email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [product, setProduct] = useState([]);
  const [Ad, setAd] = useState([]);
  const { AdD } = useContext(AdDContext);
  const navigate = useNavigate();
  const [report, setReport] = useState(1);
  const [Price, setPrice] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [ID, setID] = useState(0);
  const [writeReview, setWriteReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rateErr, setrateErr] = useState(false);
  const [reviewErr, setreviewErr] = useState(false);
  const [averageRating, setAverageRating] = useState(0);


  useEffect(() => {
    axios
      .get(`http://localhost:3006/Get_Up_Product/${AdD}`)
      .then((response) => {
        var temp = response.data;
        temp.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });

        setAd(temp);
        setImages(temp[0].Images);
        setMainImage(temp[0].Images[0]);
        setProduct(temp[0]);
        setEmail(localStorage.getItem("email_token"));
      });
    axios.get(`http://localhost:3006/Get_Up_Review/${AdD}`)
      .then((response) => {
        var temp = response.data;
        setReviews(temp);

        const totalRating = temp.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / temp.length).toFixed(1);
        setAverageRating(averageRating);
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("email_token")) {
      navigate("/login");
    }
  }, []);



  const handleAddToCart = () => {

    console.log("rating is: ", rating);
    axios
      .post("http://localhost:3006/addToCart", {
        CartID: localStorage.getItem("email_token"),
        ProductId: product.ID,
        Price: product.Price,
        ProductName: product.Name,
        Images: JSON.stringify(product.Images),
      })
      .then((response) => {
        console.log(response.data);
      });

    navigate("/Cart");
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleWriteReview = () => {
    setWriteReview(true);
  };

  const SubmitingReview = () => {
    // Send the review to the backend
    console.log(AdD)
    console.log("HELOLEOLOE")
    if (rating === 0) {
      setrateErr(true)
    }
    else if (writeReview.length < 10 || writeReview.length > 100) {
      setreviewErr(true)
    }
    else {
      axios.post("http://localhost:3006/addingRev", { productID: AdD, user: Email, rating: rating, review: writeReview }).then((response) => {
        console.log(response.data);
      })
      setrateErr(false);
      setreviewErr(false);
      setRating(0);
      setWriteReview('');

    }
    axios.get(`http://localhost:3006/Get_Up_Review/${AdD}`)
      .then((response) => {
        var temp = response.data;
        setReviews(temp);

        const totalRating = temp.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = (totalRating / temp.length).toFixed(1);
        setAverageRating(averageRating);
      });
  };
  const getRatingColor = (rating) => {
    if (rating >= 4.5) {
      return "green";
    } else if (rating >= 3.5) {
      return "orange";
    } else {
      return "red";
    }
  };
  const getRatingStars = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;
    const starIcons = [];

    // Filled stars
    for (let i = 0; i < filledStars; i++) {
      starIcons.push(<StarIcon key={i} style={{ color: "#FFC107" }} />);
    }

    // Half star
    if (hasHalfStar) {
      starIcons.push(<StarHalfIcon key={filledStars} style={{ color: "#FFC107" }} />);
    }

    // Empty stars
    const remainingStars = 5 - starIcons.length;
    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(<StarBorderIcon key={filledStars + i + 1} style={{ color: "#FFC107" }} />);
    }

    return starIcons;
  };

  function imageSet(ind) {
    setMainImage(images[ind]);

  }
  return (
    <div>
      <NavbarD />
      <main>
        <div className='sell-banner'>
          <div className="overlaybg0"></div>
          <img className="img1" src={imag2}></img>
          <div className='ContentLanding'>
            <Container sx={{ py: 3 }}>
              <Grid
                container
                spacing={1}
                marginTop={5}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  height: "550px",
                  borderRadius: "20px",
                  color: "#fff",
                  boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                  marginTop:"60px"
                }}
              >
                <Grid item xs={12} sm={7}>
                  <Grid container padding={1}>
                    <Grid item xs={12} height={350} width="inherit" borderRadius={3}>
                      <img
                        src={mainImage}
                        style={{ borderRadius: "inherit", height: "inherit", width: "inherit" }}
                        alt="Product"
                      />
                    </Grid>
                    {images.map((image, ind) => (
                      <Grid item xs={4} borderRadius={3} padding={"1rem"} key={ind}>
                        <img
                          src={image}
                          width={200}
                          height={100}
                          style={{ borderRadius: "inherit", height: 120, width: 170 }}
                          alt={`Product ${ind}`}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Grid container height={"initial"} style={{ marginLeft: "10px" }}>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h4" style={{ fontWeight: "bold" }} component="div">
                        {product.Name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="body1" component="div" style={{ fontSize: "20px" }}>
                        Product Detail: {product.Description}
                      </Typography>
                    </Grid>
                    <Typography gutterBottom variant="h5" style={{ fontWeight: "bold" }} component="div">
                      Price: Rs.{product.Price}
                    </Typography>
                    {/* Rating */}
                    <Grid item xs={12}>
                      <Typography variant="body1" style={{ color: getRatingColor(averageRating), color: "#fff" }}>
                        Average Rating: {getRatingStars(averageRating)}
                      </Typography>
                    </Grid>
                    <CardActions sx={{ marginTop: "20px" }}>
                      
                      <Button
                        className="pdetails"
                        sx={{ backgroundColor: "rgba(0, 95, 96, 1)", color: "#FFFFFF", padding:"10px" }}
                        onClick={handleAddToCart}
                      >
                        Add To Cart
                      </Button>
                    </CardActions>
                  </Grid>
                  <CardActions sx={{ marginTop: "200px", marginLeft:"300px" }}>
                      <Button
                        
                        className="pdetails"
                        sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF", marginRight: "10px",  padding:"10px" }}
                        onClick={handleWriteReview}
                      >
                        Write a Review
                      </Button>
                      
                    </CardActions>
                </Grid>
                
              </Grid>
            </Container>
          </div>
        </div>
      </main>
      <div className='ContentLanding'>
        {writeReview ? (
          <Container sx={{ py: 3 }}>
            <Grid
              container
              spacing={1}
              marginTop={3}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                color: "#FFF",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" style={{ fontWeight: "bold", marginLeft: "10px", marginTop: "10px" }}>
                  Write a Review
                </Typography>
                <Box sx={{ mt: 2, marginLeft: "10px", marginRight: "10px", height: 300, color: "#fff" }}>
                  {/* Review form */}
                  <Typography variant="body1">Rating:</Typography>
                  <div>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        onClick={() => handleRating(value)}
                        style={{ cursor: "pointer" }}
                      >
                        {value <= rating ? (
                          <StarIcon style={{ color: "orange" }} />
                        ) : (
                          <StarBorderIcon style={{ color: "orange" }} />
                        )}
                      </span>
                    ))}
                    {
                      rateErr ? <span style={{ color: "#00ffff" }}>Rating Is Required</span> : ""
                    }
                  </div>
                  <div className="review-text">
                    <TextField
                      id="review-text"
                      placeholder="Your Review"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      sx={{ marginTop: "10px" }}
                      style={{ color: "#ffffff", border: "2px solid #ffffff", borderRadius: "10px" }}
                      onChange={(e) => { setWriteReview(e.target.value) }}
                    />
                    {
                      reviewErr ? <span style={{ color: "#00ffff" }}>Write a review between 10 to 100 words</span> : ""
                    }
                  </div>

                  <Button
                    className="pdetails"
                    sx={{ backgroundColor: "rgba(0, 95, 96, 0.8)", color: "#FFFFFF", marginTop: "25px", marginLeft: "500px" }}
                    onClick={SubmitingReview}
                  >
                    Submit Review
                  </Button>
                  <br></br>
                </Box>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container sx={{ py: 3 }}>
            <Grid
              container
              spacing={1}
              marginTop={3}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                color: "#fff",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" style={{ fontWeight: "bold", marginLeft: "10px", marginTop: "10px" }}>
                  Reviews
                </Typography>
                {/* Render the list of reviews here */}
                {reviews.map((review) => (
                  <div key={review.Product_ID}>
                    <Typography variant="body1" style={{ marginLeft: "10px", marginTop: "15px", color: review.rating > 3 ? "green" : "red", fontWeight: "bold" }}>
                      Rating:
                      {Array.from(Array(review.rating)).map((_, index) => (
                        <StarIcon key={index} style={{ color: "orange" }} />
                      ))}
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: "10px" }}>
                      Review: {review.review}
                    </Typography>
                    <Typography variant="body2" style={{ marginLeft: "10px" }}>
                      By: {review.user}
                    </Typography>
                  </div>
                ))}
              </Grid>
              <Grid item xs={12}>

              </Grid>
            </Grid>
          </Container>

        )}
      </div>
    </div>
  );
};

export default ProductDetail;
