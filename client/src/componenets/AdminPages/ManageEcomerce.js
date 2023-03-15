import React, { useEffect, useState, useContext } from 'react'
import "../pages/App.css";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import add from '../images/add1.png';
import Navbar from './Navbar2';
import { ProContext } from '../../App';
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
import UpdateAd from '../pages/UpdateAd';

function Managead() {

    const navigate = useNavigate()
    const [page, setpage] = useState(0);
    const [product, setProduct] = useState([]);
    const { ProID, setProID } = useContext(ProContext);
    const [search, setSearch] = useState("");
    const [check, setcheck] = useState(1);
    console.log("hleo")

    useEffect(() => {
        axios.get(`http://localhost:3006/Get_Product`).then((response) => {
            console.log("THis is Response Data : ", response.data)
            var temp = response.data;
            console.log(response.data);
            temp.forEach(element => {

                element.Images = JSON.parse(element.Images)

            });
            setProduct(temp);
            console.log("After parse : ", temp)
        });
    }, []);

    const CurrentPkg = () => {
        axios.get("http://localhost:3006/Get_Product").then((response) => {
            var temp = response.data;
            console.log(response.data);
            temp.forEach(element => {

                element.Images = JSON.parse(element.Images)

            });
            setcheck(1)
            setProduct(temp);

        });
    }


    const PreviousPkg = () => {
        axios.get("http://localhost:3006/Get_PreProduct").then((response) => {
            var temp = response.data;
            console.log(response.data);
            temp.forEach(element => {

                element.Images = JSON.parse(element.Images)

            });
            setcheck(0)
            setProduct(temp);

        });
    }
    const delete_Product = (id) => {
        axios.put(`http://localhost:3006/del_Product/${id}`).then((res) => {
            console.log(res.data);
            setProduct(
                product.filter((val) => {
                  return val.ID != id
                }))
    
        })

    }

    const Active_Product = (id) => {
        axios.put(`http://localhost:3006/Active_Product/${id}`).then((res) => {
            console.log(res.data);
             setProduct(
                 product.filter((val) => {
                   return val.ID != id
                }))
        })

    }
    const navi = () => {
        navigate("/addproduct")
    }
    function UpdateProduct(id) {
        console.log("THIS IS ID : ", id)
        setProID(id)
        console.log(ProID)
        navigate("/updateproduct");

    }
    useEffect(() => {
        if (!localStorage.getItem('Adminemail')) {
            navigate('/Adminlogin')
        }
    }, [])


    return (

        <div style={{ backgroundColor: "rgba(227, 229, 232, 0.32)" }}>
        <Navbar />
          <main>
          <div className='Search_Filters' style={{ display: 'flex', alignItems: 'center',justifyContent:"center" , paddingTop:"50PX" }}>
          <input
            style={{ width: '50%', marginRight: '0.5rem', backgroundColor: '#FFFFFF',color:"rgba(0, 95, 96, 0.8)" }}
            autoComplete='off'
            placeholder='Search'
            type='text'
            className='customform w-50'
            list='item-list'
            onChange={(e)=>{setSearch(e.target.value)}}
          />
        
         
        </div>
        <div class="pageheading">
                                <h1>Manage Ad Ecomerce Store</h1>
                            </div>
                            <div>
                                <button className="manage-btn" onClick={navi} style={{ "background-color": "#FFFFFF" }}>
                                    <img className='pass-icon' src={add} />
                                    Add Product
                                </button>
                            </div>
                            <div className='head'>
                                <button style={{ "background-color": "#008083", "color": "#F78104", "borderRadius": "10px", "borderColor": "#F78104", "marginRight": "10px" }} onClick={() => { CurrentPkg() }}>Current Product</button>
                                <button style={{ "background-color": "#008083", "color": "#F78104", "borderRadius": "10px", "borderColor": "#F78104", "marginRight": "10px" }} onClick={() => { PreviousPkg() }}>Previous Product</button>
                            </div>

            <Container sx={{ py: 8 }}>
    
              <Grid container spacing={4}>
                {product.filter((card)=>{
                  return search.toLowerCase()===''?card:(card.Name.toLowerCase().includes(search)); 
                }).map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={3}>
                    <Card
                      style={{ backgroundColor: "#F78104", height: "380px", borderRadius: "20px" }}
                      raised
                      sx={{
                        maxWidth: 280,
                        margin: "0 auto",
                        padding: "0.1em",
                        maxHeight: 450
                      }}
    
    
                    >
                      <CardMedia
                        component="img"
                        height={180}
                        image={card.Images[0]}
                        alt="random"
                        sx={{ padding: "1em 1em 0 1em" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}  >
                        <Typography gutterBottom variant="h6" component="h6" sx={{ fontWeight: 'bold' }} style={{ color: "rgba(0, 95, 96, 0.8)" }}>
                          {card.Name}
                        </Typography>
    
                        <Typography variant="p">
                          {card.Description}
                        </Typography>
                        <br></br>
                        <Typography variant="p" style={{ topmargin: "5px", color: "rgba(0, 95, 96, 0.8)" }}>
                          {card.Price}
                        </Typography>
                        <br></br>
                      </CardContent>
                      {
                        check==1 ?<div> <Button class="pkg-btn" style={{'margin-left': '15px', color: 'orange' }} onClick={() => { delete_Product(card.ID) }}>Delete</Button>
                        <Button class="pkg-btn" style={{ 'margin-left': '10px', color: 'orange' }} onClick={() => { UpdateProduct(card.ID) }}>Update</Button></div>
                        :<Button class="pkg-btn" style={{ 'margin-left': '15px', color: 'orange' }} onClick={() => { Active_Product(card.ID) }}>Activate</Button>
                        }
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
    
    

       
  
  )
}

export default Managead;
