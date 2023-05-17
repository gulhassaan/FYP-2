import React, { Component, useContext, useEffect } from 'react'
import { useState } from 'react';
import Axios from 'axios'
import { EmailContext } from '../../App';
import { Link, resolvePath, useNavigate } from "react-router-dom";
import { ImagesContext } from '../../App';
import { AdContext } from '../../App';
import "./App.css";
import "./test.css";
import { NavLink } from "react-router-dom";
import AddImage from "../images/Add-Image.png";
import arrow from "../images/arrow1.png";
import Navbar from "./NavbarNotSell";
import "@fontsource/montserrat";
import imag2 from '../images/login5.jpg';
import { MultiUploader } from "../../Uploader/Uploader";

export default function Hardware() {


  const { Email } = useContext(EmailContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [price, setprice] = useState('');
  // const [Images, setimage] = useState({ Images: "", });
  const [newEmail, setEmail] = useState('')
  const [location, setlocation] = useState('')
  const { Images } = useContext(ImagesContext);
  console.log("THIS IS PUBLISH : ", Images);
  const [error, seterror] = useState('');


  const [errC, seterrC] = useState(false)
  const [errL, seterrL] = useState(false)
  const [errT, seterrT] = useState(false)
  const [errD, seterrD] = useState(false)
  const [errI, seterrI] = useState(false)
  const [errP, seterrP] = useState(false)


  const publish = () => {
    const param1 = localStorage.getItem("email_token")
    setEmail(param1)
    console.log("bew emai l is ", newEmail)
    if (Category === "") {
      seterror("Category is Required")
      seterrC(true)
      // seterrN(true)
    }
    else if (location === "") {
      //   seterrE(true)
      seterror("location is Required")
      seterrL(true)
    }
    else if (title === "") {
      //   seterrE(true)
      seterror("Title is Required")
      seterrT(true)
    } else if (price === "" || price === "0") {

      //   seterrE(true)
      seterror("Price is Required")
      seterrP(true)
    }

    else if (Description === "") {

      //   seterrE(true)
      seterror("Description is Required")
      seterrD(true)
    }
    else if (Images.length === 0) {
      //   seterrE(true)
      seterror("Images is Required")
      seterrI(true)
    }
    else {
      Axios.post("http://localhost:3006/publish", { title: title, Description: Description, Cost: price, Images: JSON.stringify(Images), email: newEmail, location: location, Type: Type, adCategory: Category }).then((response) => {
        console.log(response.data);
        seterrC(false);
        seterrD(false);
        seterrI(false);
        seterrL(false);
        seterrP(false);
        seterrT(false);
        navigate("/home")
      })
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();


  }

  const [Type, setType] = useState("Account");
  // const [price, setprice] = useState("");
  const [Category, setCategory] = useState("");
  // const [title, setTitle] = useState("");
  // const [location, setLocation] = useState("");
  // const [message, setMessage] = useState("");
  // const [img, setImg] = useState("");
  // const [post, setPost] = useState("");
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const priceHandle = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (e.target.value == "" || e.target.value == "0") {
      seterrP(true)
    }
    else {
      seterrP(false)
    }
    if (e.target.value === "" || re.test(e.target.value)) {
      setprice(e.target.value);
    }
  };

  const titleHandle = (e) => {

    if (e.target.value == "") {
      seterrT(true)
    }
    else {
      seterrT(false)
    }


    if (e.target.value.length > 50) {
      setErrMessage("Title length less than 50")
      setErr(true)
    } else {
      setTitle(e.target.value)
      setErrMessage("")
      setErr(false)
    }
  };



  const setcat = (e) => {
    const temp = e.target.value;
    const param1 = localStorage.getItem("email_token")
    setEmail(param1)
    setType(temp);
  };

  const setacc = (e) => {
    if (e.target.value == "") {
      seterrC(true)
    }
    else {
      seterrC(false)
    }

    const temp = e.target.value;
    const param1 = localStorage.getItem("email_token")
    setEmail(param1)
    setCategory(temp);
  };
  const sethard = (e) => {
    if (e.target.value == "") {
      seterrC(true)
    }
    else {
      seterrC(false)
    }
    const temp = e.target.value;
    const param1 = localStorage.getItem("email_token")
    setEmail(param1)
    setCategory(temp);
  };



  const Location = (e) => {
    if (e.target.value == "") {
      seterrL(true)
    }
    else {
      seterrL(false)
    }
    const param1 = localStorage.getItem("email_token")
    setEmail(param1)
    const temp = e.target.value;
    setlocation(temp);
  }


  const DesHandle = (e) => {
    if (e.target.value == "") {
      seterrD(true)
    }
    else {
      seterrD(false)
    }
    const temp = e.target.value;
    setDescription(temp);
  }


  useEffect(() => {
    function autocomplete(inp, arr) {
      /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("input", function (e) {
        var a,
          b,
          i,
          val = this.value;

        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
          return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML =
              "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function (e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              console.log("THIS IS FIRTS:", this.getElementsByTagName("input")[0].value)
              console.log("fgnhj", countries.findall("Lahore"))

              if (document.getElementById("city_list").value == "Okara") {
                setlocation(inp.value)
              }
              else if (document.getElementById("hardware_list").value == "GAMING CONSOLE") {
                setCategory(inp.value)
              }
              else if (document.getElementById("game_list").value == "PUBG") {
                setCategory(inp.value)
              }
              /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) {
          //up
          /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
          except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    }

    /*An array containing all the country names in the world:*/
    const countries = [
      "Abbottabad",
      "Ahmadpur East",
      "Aliabad",
      "Alipur",
      "Arifwala",
      "Attock",
      "Badin",
      "Bagh",
      "Bahawalnagar",
      "Bahawalpur",
      "Bannu",
      "Bhakkar",
      "Burewala",
      "Chakwal",
      "Chaman",
      "Charsadda",
      "Chichawatni",
      "Chiniot",
      "Chishtian Mandi",
      "Chitral",
      "Dadu",
      "Daska",
      "Dera Ghazi Khan",
      "Dera Ismail Khan",
      "Dina",
      "Faisalabad",
      "Faruka",
      "Fort Abbas",
      "Gadar",
      "Gajar",
      "Gandava",
      "Garh Maharaja",
      "Garh More",
      "Gharo",
      "Gilgit",
      "Gojra",
      "Gothki",
      "Gujranwala",
      "Gujrat",
      "Gujar Khan",
      "Hafizabad",
      "Haroonabad",
      "Hasilpur",
      "Haveli",
      "Hyderabad",
      "Islamabad",
      "Jacobabad",
      "Jalalpur Pirwala",
      "Jalalpur",
      "Jampur",
      "Jamshoro",
      "Jhang",
      "Jhelum",
      "Kalat",
      "Karachi",
      "Kashmor",
      "Kasur",
      "Khairpur",
      "Khairpur Nathan Shah",
      "Khangarh",
      "Khanpur",
      "Kharan",
      "Kharian",
      "Khushab",
      "Khuzdar",
      "Kohat",
      "Kot Addu",
      "Kot Mithan",
      "Kotli",
      "Lahore",
      "Larkana",
      "Lodhran",
      "Loralai",
      "Mailsi",
      "Mandi Bahauddin",
      "Mandi",
      "Mansehra",
      "Mardan",
      "Mashki Chah",
      "Mastung",
      "Mehar",
      "Mian Channu",
      "Mianke Mor",
      "Mianwali",
      "Mingaora",
      "Mirpur Khas",
      "Mirpur Mathelo",
      "Mirpur",
      "Multan",
      "Murree",
      "Muzaffarabad",
      "Muzaffargarh",
      "Nawabshah",
      "Nazimabad",
      "Nowshera",
      "Nushki",
      "Okara",
      "Pattoki",
      "Peshawar",
      "Quetta",
      "Rabwah",
      "Rahim Yar Khan",
      "Raiwind",
      "Rajanpur",
      "Ranipur",
      "Ratodero",
      "Rawalpindi",
      "Renala Khurd",
      "Risalpur",
      "Rohri",
      "Sadiqabad",
      "Safdarabad",
      "Sahiwal",
      "Sakrand",
      "Sambrial",
      "Sanghar",
      "Sargodha",
      "Sehwan Sharif",
      "Shakargarh",
      "Sheikhupura",
      "Shikarpur",
      "Shorkot",
      "Sialkot",
      "Sibi",
      "Sohawa",
      "Sujawal",
      "Sukkur",
      "Swabi",
      "Swat",
      "Tando Adam",
      "Tando Allahyar",
      "Tando Muhammad Khan",
      "Tangi",
      "Tank",
      "Tarbela",
      "Taunsa",
      "Taxila",
      "Thari Mirwah",
      "Tharparkar",
      "Thatta",
      "Toba Tek Singh",
      "Turbat",
      "Umerkot",
      "Vehari",
      "Wah Cantonment",
      "Wazirabad",
      "Yazman",
      "Zhob",
      "Ziarat",
    ];

    /*initiate the autocomplete function on the "city_list" element, and pass along the countries array as possible autocomplete values:*/
    autocomplete(document.getElementById("city_list"), countries);

    const games_names = [
      "PUBG",
      "Fortnite",
      "Call of Duty",
      "Free Fire",
      "Clash Clans",
      "Rise of Kingdom",
      "Lords Mobile",
      "Clash Royale",
      "GTA 5",
      "Valorant",
      "League of Legends",
      "Overwatch",
      "Minecreaft",
      "Valheim",
      "World of Wirecraft",
    ];
    const game_hardware = [
      "Arcade stick",
      "Gaming console",
      "Gaming headset",
      "Gaming keyboard",
      "Gaming laptop",
      "Gaming mouse",
      "Gaming PC",
      "Graphics card",
      "Joystick",
      "Microphone",
      "Processor",
      "Racing wheel",
      "Solid state drive",
      "Speakers",
      "Virtual reality headset",
      "Webcam",
    ];
    /*initiate the autocomplete function on the "myInput" element, and pass along the games_names array as possible autocomplete values:*/
    if (Type == "Account") {
      autocomplete(document.getElementById("game_list"), games_names);
    } else {
      autocomplete(document.getElementById("hardware_list"), game_hardware);
    }
  });
  useEffect(() => {
    if (!localStorage.getItem('email_token')) {
      navigate('/login')
    }
  }, [])
  return (
    <div >
      <div className="back">
        <Navbar />
        <div className='sell-banner'>
          <div className="overlaybg0"></div>
          <img className="img1" src={imag2}></img>
          <div className='ContentLanding'>
            <section className="sell-main">
              <div className="conatiner mt-5">
                <div className="sell-main-content">
                  <div className="signup-form w-100">
                    {/* New Design */}
                    <div className="">
                      <div className="d-flex align-items-center w-full justify-content-between p-1">
                        <a href="/home">
                          <img className="pass-icon4" src={arrow} alt=""></img>
                        </a>
                        <h2 className="form-title mx-auto">Publish Your Ad</h2>
                      </div>
                      <form onSubmit={handleSubmit}>
                        {/* Forms */}
                        <div className="p-5">
                          {/* Row 1 */}
                          <div className="w-50 my-2">
                            <div className="w-full">
                              <h6>Type</h6>
                            </div>
                            <select
                              style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff", borderRadius: "20px" }}
                              name=""
                              id="category-btn"
                              className="customform w-100"
                              onClick={setcat}
                            >
                              <option value="Account" style={{ backgroundColor: '#FFFFFF', color: "rgba(0, 95, 96, 1)" }}>Account</option>
                              <option value="Hardware" style={{ backgroundColor: '#FFFFFF', color: "rgba(0, 95, 96, 1)" }}>Hardware</option>
                            </select>
                          </div>
                          <div className="w-full">
                            <hr></hr>
                          </div>
                          {/* Row 2 */}
                          <div className="d-flex w-100 justify-between my-2">
                            <div className=" autocomplete w-50 p-1">
                              <div className="w-full">
                                <h6> Category</h6>
                              </div>
                              {Type == "Account" ? (
                                <input
                                  style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff", borderRadius: "20px" }}
                                  type="text"
                                  id="game_list"
                                  className="cat w-100"
                                  placeholder="Select Game"
                                  onChange={setacc}
                                ></input>
                              ) : (
                                <input
                                  style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff", borderRadius: "20px" }}
                                  type="text"
                                  id="hardware_list"
                                  className="cat w-100"
                                  placeholder="Select Hardware"
                                  onChange={sethard}
                                ></input>
                              )}
                              {
                                errC ? <span style={{ color: "#00ffff" }}>Category Is Required</span> : ""
                              }
                            </div>

                            <div className=" autocomplete w-50 p-1">
                              <div className="w-full">
                                <h6>Your Ad's Location</h6>
                              </div>
                              <input
                                style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff", borderRadius: "20px" }}
                                autoComplete="off"
                                type="text"
                                className="customform w-100"
                                id="city_list"
                                name="myCountry"
                                list="item-list"
                                onChange={Location}
                              ></input>
                              {errL ? <span style={{ color: "#00ffff" }}>Location Is Required</span> : ""}
                            </div>

                          </div>

                          {/* Row 3 */}
                          <div className="d-flex w-100 justify-between my-2">
                            <div className="w-full w-50 p-1">
                              <h6>Ad Title</h6>
                              <input
                                style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff", borderRadius: "20px" }}
                                value={title}
                                onChange={titleHandle}
                                name=""
                                id=""
                                className="customform w-100"
                                placeholder="Ad Title"
                                required
                              />

                              {errT ? <span style={{ color: "#00ffff" }}>Title Is Required</span> : ""}
                            </div>

                            <div className="w-full w-50 p-1">
                              <h6>Set Price (PKR)</h6>
                              <input
                                style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff", borderRadius: "20px" }}
                                value={price}
                                onChange={priceHandle}
                                type="text"
                                name=""
                                id=""
                                className="customform w-100"
                                placeholder="RS | "
                              />

                              {errP ? <span style={{ color: "#00ffff" }}>Price Is Required</span> : ""}
                            </div>

                          </div>
                          <div className="w-full">
                            <div>
                              <p>{errMessage}</p>
                            </div>
                            <h6>Ad Description</h6>
                            <textarea
                              style={{ backgroundColor: "rgba(0,0,0, 0.1)", border: "1px solid #ffffff", color: "#ffffff" }}
                              name=""
                              id=""
                              className="customform1 w-100"
                              rows="5"
                              onChange={DesHandle}
                            ></textarea>

                            {errD ? <span style={{ color: "#00ffff" }}>Description Is Required</span> : ""}
                          </div>
                          <div className="custom-text">

                            <br></br>
                            <h5 >Upload photos</h5>
                          </div>

                          <div className="d-flex mt-3 justify-content-between">
                            <MultiUploader />
                            {errI ? <span style={{ color: "#00ffff" }}>Images Is Required</span> : ""}
                          </div>

                          <button onClick={publish} className="PostNow">
                            Post Now
                          </button>

                        </div>
                      </form>
                    </div>

                  </div>

                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}