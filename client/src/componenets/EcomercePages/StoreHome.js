import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fade from 'react-reveal/Fade';
import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Pagination from "@mui/material/Pagination";
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
import { color } from "@mui/system";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EmailContext } from "../../App";
import { AdDContext } from "../../App";
import "@fontsource/montserrat";
import NavbarStore from "./Navbarstore";
import storebanner from "../images/gamingstanstore.png";

import NavbarS from "./NavbarS";
import ProductDetail from "./ProductDetail";
import "./Ecommerce.css";
import imag2 from "../images/login12.jpg";
import banner2 from "./images/slider2.png";
import banner3 from "./images/slider3.png";
import { NavLink } from "react-router-dom";


const StoreHome = () => {
  const { Email } = useContext(EmailContext);
  const { AdD, setAdD } = useContext(AdDContext);
  const [listOfAds, setListOfAds] = useState([]);
  const navigate = useNavigate();
  const [page, setpage] = useState(0);
  localStorage.setItem("newemail", Email);
  console.log("LCOAL  :", localStorage.getItem("email"));
  console.log("THIS IS LOCAL : ", localStorage.getItem("email"));
  const [listofProducts, setlistofProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [Filter, setFilter] = useState("");
  const [img, setimg] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3006/Get_AD`).then((response) => {
      console.log("THis is Response Data : ", response.data);
      var temp = response.data;
      console.log(response.data);
      temp.forEach((element) => {
        element.Images = JSON.parse(element.Images);
      });
      setListOfAds(temp);
      console.log("After parse : ", temp);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:3006/Get_Products?limit=10&offset=${page * 10}`)
      .then((response) => {
        console.log("THis is Response Data : ", response.data);
        var temp = response.data;
        console.log(response.data);
        temp.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setlistofProducts(temp);
        console.log("After parse : ", temp);
      });
  }, []);
  const moreinfo = () => {
    navigate("/Addetail");
  };
  function view(id) {
    console.log(id);
    setAdD(id);
    navigate("/productdetail");
  }

  const Selectfilter = (e) => {
    var filter = e.target.value;
    setFilter(e.target.value);
    if (filter == "High TO Low") {
      console.log(Filter);
      axios.get(`http://localhost:3006/filterHtoL`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    } else if (filter == "Low To High") {
      axios.get(`http://localhost:3006/filterLtoH`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    } else if (filter == "Latest") {
      axios.get(`http://localhost:3006/filterLatest`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    } else if (filter == "Oldest") {
      axios.get(`http://localhost:3006/filterOldest`).then((response) => {
        var data = response.data;
        data.forEach((element) => {
          element.Images = JSON.parse(element.Images);
        });
        setListOfAds(data);
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("email_token")) {
      navigate("/login");
    }
  }, []);

  /*Pagination: */

  const itemsPerPage = 3; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the list of products based on the current page
  const displayedProducts = listofProducts.slice(startIndex, endIndex);

  return (
    <div className="bg-storehome">
      <div>
        <main>
          <NavbarStore />
          <div className="storebanner">
            <div className="overlaybg6"></div>
            <img className="img1" src={imag2}></img>
            <Fade top distance="20%" duration={1500}>
              <div className='welcomelanding'>
                <h2>Welcome</h2>
                <h4>To</h4>
                <h1>GAMINGSTAN STORE</h1>

              </div>
            </Fade>
          </div>
          <div className="ContentLanding">
            <div
              className="Search_Filters"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50PX",
              }}
            />

            <h1
              style={{
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "30PX",
                marginTop:"150px"
              }}
            >
              Fresh Recommendations
            </h1>
            <div
              className="Search_Filters"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "40PX",
              }}
            >
              <input
                style={{
                  width: "50%",
                  marginRight: "0.5rem",
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  borderRadius: "30px",
                  border: "2px solid white",
                }}
                autoComplete="off"
                placeholder="Search"
                type="text"
                className="estore w-50"
                list="item-list"
                onChange={(e) => setSearch(e.target.value)}
              />
              <FormControl
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #ffffff",
                  color: "#ffffff",
                  minWidth: 150,
                  borderRadius: "30px",
                }}
                size="small"
              >
                <InputLabel
                  id="demo-select-small"
                  style={{ color: "#ffffff" }}
                >
                  Sort by
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={Filter}
                  label="Filters"
                  onChange={Selectfilter}
                  style={{
                    borderRadius: "20px",
                    height: "45px",
                    color: "rgba(0, 95, 96, 0.8)",
                  }}
                >
                  <MenuItem
                    value=""
                    style={{
                      borderRadius: "20px",
                      color: "rgba(0, 95, 96, 0.8)",
                    }}
                  >
                    <em>None</em>
                  </MenuItem>
                  <MenuItem
                    value={"High TO Low"}
                    style={{
                      borderRadius: "20px",
                      color: "rgba(0, 95, 96, 0.8)",
                    }}
                  >
                    High to Low
                  </MenuItem>
                  <MenuItem
                    value={"Low To High"}
                    style={{
                      borderRadius: "20px",
                      color: "rgba(0, 95, 96, 0.8)",
                    }}
                  >
                    Low to High
                  </MenuItem>
                  <MenuItem
                    value={"Latest"}
                    style={{
                      borderRadius: "20px",
                      color: "rgba(0, 95, 96, 0.8)",
                    }}
                  >
                    Latest
                  </MenuItem>
                  <MenuItem
                    value={"Oldest"}
                    style={{
                      borderRadius: "20px",
                      color: "rgba(0, 95, 96, 0.8)",
                    }}
                  >
                    Oldest
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <Container sx={{ py: 8 }}>
              <Grid container spacing={4}>
                {displayedProducts
                  .map((card) => {
                    return search.toLowerCase() === ""
                      ? card
                      : card.Name.toLowerCase().includes(search);
                  })
                  .map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={3}>
                      <Card
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          height: "330px",
                          borderRadius: "20px",
                          boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.55)",
                          color: "white",
                        }}
                        raised
                        sx={{
                          maxWidth: 280,
                          margin: "0 auto",
                          padding: "0.1em",
                          maxHeight: 450,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height={180}
                          image={card.Images[0]}
                          alt="random"
                          style={{
                            padding: "0.5em 0.5em 0 0.5em",
                            borderRadius: "20px",
                          }}
                          onClick={() => {
                            view(card.ID);
                          }}
                        />
                        <CardContent
                          sx={{ flexGrow: 1 }}
                          onClick={() => {
                            view(card.ID);
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h6"
                            sx={{ fontWeight: "bold" }}
                            style={{ color: "#ffffff" }}
                          >
                            {card.Name}
                          </Typography>

                          <Typography
                            variant="p"
                            style={{ topmargin: "5px", color: "#ffffff" }}
                          >
                            {card.Price}
                          </Typography>
                          <br></br>
                          <Typography
                            variant="p"
                            style={{ color: "#ffffff" }}
                          >
                            {card.Description}
                          </Typography>
                          <br></br>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>

              <Stack spacing={2} alignItems={"center"}>
                <Pagination
                  count={Math.ceil(listofProducts.length / itemsPerPage)}
                  style={{ color: "white" }}
                  onChange={handlePageChange}
                  page={currentPage + 1}
                />

              </Stack>
            </Container>
          </div>

        </main>
      </div>
    </div>
  );
};

export default StoreHome;