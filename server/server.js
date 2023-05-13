const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt")
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root1234",
    database: "gamingstan"
});


//FOR GETING EMAIL
app.post("/getEmail", (req, res) => {

    const email = req.body.email;


    db.query(`SELECT * FROM users WHERE email = '${email}' AND Status=1`, (err, result) => {

        if (err) throw err;
        else if (result.length !== 0) {

            console.log("Email Already Exist")
            res.send("already")
            return
        }
        else if (result.length === 0) {
            res.send("not")
            return
        }

    })
})



//FOR USER SIGNUP  
app.post("/register", async (req, res) => {

    const name = req.body.name;
    const contact = req.body.contact_number;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, 10).then((hash) => {
        db.query(
            "INSERT INTO users (name,password, contact_number,email) VALUES (?,?,?,?)",
            [name, hash, contact, email],
            (err, result) => {
                console.log(err);
            }
        );
        res.json("Success");
    })
});

//FOR Add Publish 
app.post("/publish", async (req, res) => {

    const title = req.body.title;
    const Description = req.body.Description;
    const Cost = req.body.Cost;
    const Images = req.body.Images;
    const email = req.body.email;
    const location = req.body.location;
    const Type = req.body.Type;
    const adCategory = req.body.adCategory;


    console.log(email);
    console.log("PUB :  ", Images)
    db.query(
        "INSERT INTO ads (title,Description,Cost,Images,email,Location,Type,adCategory) VALUES (?,?,?,?,?,?,?,?)",
        [title, Description, Cost, Images, email, location, Type, adCategory],
        (err, result) => {
            console.log(err);
        }
    );
    res.json("Success");
})

//FOR Add Product 
app.post("/Productpublish", async (req, res) => {

    const Name = req.body.Name;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.body.Images;
    const Quantity=req.body.Quantity

    console.log("PUB :  ", Images)
    db.query(
        "INSERT INTO product (Name,Description,Price,Images,Quantity) VALUES (?,?,?,?,?)",
        [Name, Description, Price, Images,Quantity],
        (err, result) => {
            console.log(err);
        }
    );
    res.json("Success");
})


//Add to Cart
app.post("/addToCart", async (req, res) => {

    const ID = req.body.ProductId
   const Email = req.body.CartID;
    const Price = req.body.Price;
    const Name = req.body.ProductName;
    const Images = req.body.Images;
    console.log(ID)
    db.query(
        "INSERT INTO cart(CartID,ProductId, Price ,ProductName,Images,Total) VALUES (?,?,?,?,?,?)",
        [Email,ID, Price,Name, Images,Price],
        (err, result) => {
            console.log(err);
            console.log(result.data)
        }
    );
    res.json("Success");
})

//Get From Cart
app.get("/Get_items", async (req, res) => {
    console.log("im a server")
    db.query(`SELECT * FROM cart where Quantity > 0`, (err, result) => {
        res.send(result);
        console.log("THIS IS CART ",result )

    })
})

//Update Cart

app.put("/UpdateCart/:id", (req, res) => {
    const ID = req.params.id;
    const Quantity = req.body.Quantity;
    const Price = req.body.Price;
    const new_price = Price * Quantity
  
    console.log(ID)
    console.log("FOR UPDATE")
    db.query(`UPDATE cart SET Quantity = ${Quantity}, Total =${Price} WHERE ProductId = ${ID}`, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})


//Delete Product
app.delete("/RemoveCart/:id", (req, res) => {
    const ID = req.params.id;
    db.query(`DELETE FROM cart WHERE ProductId = ? AND Quantity < 1`,[ID], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})


//FOR USER Login
app.post("/login", (req, res) => {

    const password = req.body.password;
    const email = req.body.email;


    db.query(`SELECT * FROM users WHERE email = '${email}' AND Status=1`, (err, result) => {

        if (err) throw err;
        else if (result.length === 0) {

            console.log("incorrect email or password")
            res.send("Incorrect Email")
            return
        }
        else {
            bcrypt.compare(password, result[0].password, function (err, results) {
                if (!results) {
                    console.log("incorrect password")
                    res.send("Incorrect Password")
                    return
                }

                if (results) {
                    console.log("successfully Login")
                    res.send("Login")
                }
            });
        }
    })
})


//For Admin Login

app.post("/Admin_login", (req, res) => {

    const password = req.body.password;
    const email = req.body.email;


    db.query(`SELECT * FROM admin WHERE Email = '${email}'`, (err, result) => {

        if (err) throw err;
        else if (result.length === 0) {
            console.log("Incorrect email or password")
            res.send("Invalid")
            return
        }
        else if (password === result[0].Password) {
            console.log("successfully Login")
            res.send("Login")
        }
        else {
            console.log("Incorrect password")
            res.send("Invalid")
            return
        }
    })
})


//For Publish Ad Featuring Packages
app.post("/publish_package", async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    db.query(
        "INSERT INTO ad_packages (Title,Description,Price) VALUES (?,?,?)",
        [title, description, price],
        (err, result) => {
            console.log(err);
        }
    );
    res.json("Success");
})

//Get All Ad Packages
app.get("/Get_AdPackages", (req, res) => {
    console.log("im a server")
    db.query(`SELECT * FROM ad_packages Where Status=1`, (err, result) => {
        res.send(result);

    })
})

//Get All Products
app.get("/Get_Product", (req, res) => {
    console.log("im a server")
    db.query(`SELECT * FROM product Where Status=1`, (err, result) => {
        res.send(result);

    })
})

//Get Specific Product
app.get("/Get_Up_Product/:AdD", (req, res) => {
    const id = req.params.AdD;
    console.log("Serverr : ", id)
    db.query(`SELECT * FROM product where ID = ${id} AND Status=1`, (err, result) => {
        res.send(result);
    })
})

//For Delete Product
app.put("/del_Product/:id", (req, res) => {
    const ID = req.params.id;
    console.log(ID)
    db.query(`UPDATE product SET Status=0 WHERE ID = '${ID}'`, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//Get prevous Products
app.get("/Get_PreProduct", (req, res) => {
   
    db.query(`SELECT * FROM product Where Status=0`, (err, result) => {
        res.send(result);

    })
})


//For Active Product
app.put("/Active_Product/:id", (req, res) => {
    const ID = req.params.id;
    db.query(`UPDATE product SET Status=1 WHERE ID = '${ID}'`, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})


//For getting specific Product for updation
app.get("/get_product_edit/:ProID", (req, res) => {
    const id = req.params.ProID;
    console.log("Serverr : ", id)
    db.query(`SELECT * FROM product WHERE ID = '${id}' AND Status=1`, (err, result) => {
        res.send(result);

    })
})


//For Updating Product
app.put("/update_Product/:ProID", (req, res) => {
    const ID = req.params.ProID;
    const Name = req.body.Name;
    const Description = req.body.Description;
    const Price = req.body.Price;
    const Images = req.body.Images;
const Quantity = req.body.Quantity;
    console.log("SERVER SIDE : ", Images)



    db.query(
        "UPDATE product SET Name = ?,Description = ?,Price = ?,Images=?,Quantity=? WHERE ID = ?",
        [Name, Description, Price, Images, Quantity, ID],
        (err, result) => {
            if (err) throw err;
            else if (result.length == 0) {
                console.log("Product Not Updated")
                // res.status=404
                // res.send({found:false})
                return res.status(404).send({ found: false })
            }
            else {
                res.send({ found: true })
                console.log("Product Updated Successfully")
            }
        }
    );



})


//Get prevous Ad Packages
app.get("/Get_PreAdPackages", (req, res) => {
    console.log("im a server")
    db.query(`SELECT * FROM ad_packages Where Status=0`, (err, result) => {
        res.send(result);

    })
})


//For Delete Package
app.put("/del_AdPackage/:id", (req, res) => {
    const AdFID = req.params.id;
    console.log(AdFID)
    db.query(`UPDATE ad_packages SET Status=0 WHERE AdF_id = '${AdFID}'`, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//For Active Package
app.put("/Active_AdPackage/:id", (req, res) => {
    const AdFID = req.params.id;
    console.log(AdFID)
    db.query(`UPDATE ad_packages SET Status=1 WHERE AdF_id = '${AdFID}'`, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//For Geting specific Ad Package for Updating
app.get("/get_AdPackage/:AdFID", (req, res) => {
    const id = req.params.AdFID;
    console.log("Serverr : ", id)
    db.query(`SELECT * FROM ad_packages WHERE AdF_id = '${id}'`, (err, result) => {
        res.send(result);

    })
})


//For Updationg Ad Packages
app.put("/update_AdPackage/:AdFId", (req, res) => {
    const AdFid = req.params.AdFId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    db.query(`UPDATE ad_packages SET Title = '${title}',Description = '${description}',Price = '${price}' WHERE AdF_id = '${AdFid}'`, (err, result) => {

        if (err) throw err;
        else if (result.length == 0) {
            console.log("Ad Package Not Updated")
            // res.status=404
            // res.send({found:false})
            return res.status(404).send({ found: false })
        }
        else {
            res.send({ found: true })
            console.log("Ad Package Updated Successfully")
        }
    })
})



//For Password Forget
app.post("/forget", (req, res) => {
    const email = req.body.email;
    db.query(`SELECT * FROM users WHERE email = '${email}' AND Status=1`, (err, result) => {

        if (err) throw err;
        else if (result.length === 0) {
            res.send("Email not Exist")
        }
        else {
            res.send("user found")
        }
    })
})


//Get All Products
//FOR Geting All Ads    
app.get("/Get_Products", (req, res) => {
    db.query(`SELECT * FROM product where Status=1 AND Quantity > 0`, (err, result) => {
        res.send(result);
      
    })
})

//FOR Geting All Ads    
app.get("/Get_AD", (req, res) => {
    db.query(`SELECT a.*, u.Name
    FROM ads a
    JOIN users u ON a.email = u.email where a.Status=1`, (err, result) => {
        res.send(result);

    })
})

//For Admin GET ALL ADS
app.get("/Get_MYAD", (req, res) => {
    db.query(`SELECT a.*, u.Name
    FROM ads a
    JOIN users u ON a.email = u.email where a.Status=1 && a.Report=0`, (err, result) => {
        res.send(result);

    })
})
//Get Repoted ADs


//FOR Geting Ads for Specific User
app.get("/Get_MyAD/:param", (req, res) => {
    const email = req.params.param;

    db.query(`SELECT * FROM ads WHERE email = '${email}' AND Status = 1`, (err, result) => {
        res.send(result);

    })
})


//For Delete Ad
app.put("/del_MyAD/:id", (req, res) => {
    const AdID = req.params.id;
    console.log(AdID)
    db.query(`UPDATE ads SET Status = ? WHERE Ad_id = ?`,[0,AdID],(err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//For Un Reporting add
app.put("/UnReport/:id",(req,res)=>{
    const AdID = req.params.id;
    db.query(`UPDATE ads SET Report = ? WHERE Ad_id = ?`,[0,AdID],(err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//For Activate Ad
app.put("/activeAd/:id",(req,res)=>{
    const AdID = req.params.id;
    db.query(`UPDATE ads SET Status = ? WHERE Ad_id = ?`,[1,AdID],(err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})


//Block User
app.put("/blockUser/:email", (req, res) => {
    const email = req.params.email;
    db.query(`UPDATE users SET Status = ? WHERE email = ?`,[0,email],(err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

//UnBlock User
app.put("/UnblockUser/:email", (req, res) => {
    const email = req.params.email;
    db.query(`UPDATE users SET Status = ? WHERE email = ?`,[1,email],(err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})


//For getting specific AD for updation
app.get("/Get_Up_Ad/:AdID", (req, res) => {
    const id = req.params.AdID;
    console.log("Serverr : ", id)
    db.query(`SELECT a.*,u.contact_number FROM ads a join users u  on a.email =  u.email where a.Ad_id = ${id} AND a.Status=1`, (err, result) => {
        res.send(result);
console.log(result[0].contact_number)
    })
})

// Seacrhing Ads
app.get("/Search_Ad/:S_AD", (req, res) => {

    const Searching = req.params.S_AD;

      
        console.log("Seasdf",Searching.length);
        console.log("Serverr : ", Searching)
        db.query(`SELECT * FROM ads WHERE (title LIKE '%${Searching}%' OR adCategory LIKE '%${Searching}%') AND Status=1`, (err, result) => {
            res.send(result);
        })
})
// Filters H to L AD
app.get("/filterHtoL",(req,res)=>{
    db.query("SELECT * FROM ads where Status=1 ORDER BY Cost DESC ",(err,result)=>{
        res.send(result);
    })
})
//Get Reported Ads

app.get("/Get_Reported_ADs",(req,res)=>{
    db.query("SELECT * FROM ads where Report = 1 AND Status=1",(err,result)=>{
        res.send(result);       
    })
})

//Get Deleted ADs
app.get("/Get_Deleted_ADs",(req,res)=>{
    db.query("SELECT * FROM ads where Status=0",(err,result)=>{
        res.send(result);       
    })
})

//Filter L to H AD
app.get("/filterLtoH",(req,res)=>{
    db.query("SELECT * FROM ads where Status=1 ORDER BY Cost ASC ",(err,result)=>{
        res.send(result);
    })
})
//filter for lastest Ad
app.get("/filterLatest",(req,res)=>{
    db.query("SELECT * FROM ads where Status=1 ORDER BY date DESC",(err,result)=>{
        res.send(result);
    })
})
//Filter for oldest AD
app.get("/filterOldest",(req,res)=>{
    db.query("SELECT * FROM ads where Status=1 ORDER BY date ASC",(err,result)=>{
        res.send(result);
    })
})
//Get Blocked Users
app.get("/Get_Blocked_Users",(req,res)=>{
    db.query("SELECT * FROM users u where u.Status=?",[0],(err,result)=>{
        res.send(result);       
    })
})

//Get all users
app.get("/Get_Users",(req,res)=>{
    db.query("SELECT * FROM users u where u.Status=?",[1],(err,result)=>{
        res.send(result);       
    })
})

//Get Reported Users
app.get("/Get_Reported_Users",(req,res)=>{
    db.query("SELECT * FROM users where Report = ? AND Status=?",[1,1],(err,result)=>{
        res.send(result);       
    })
})

// Seacrhing Users
app.get("/Search_Users/:S_User", (req, res) => {

    const Searching = req.params.S_User;
        db.query(`SELECT * FROM users WHERE (Name LIKE '%${Searching}%' OR email LIKE '%${Searching}%') AND Status=?`,[1], (err, result) => {
            res.send(result);
        })
})

app.put("/Report_AD/:AdID",(req,res)=>{
    const AdID = req.params.AdID
    const temp =1;
    db.query(`UPDATE users u JOIN  ads a ON u.email = a.email  SET a.Report =${temp}  where a.Ad_id = ${AdID}`,(err,result)=>{
        if (err) throw err;
            else if (result.length == 0) {
                console.log("User Not Reported")

                return res.status(404).send({ found: false })
            }
            else {
                res.send({ found: true })
                console.log("User Reported Successfully")
            } 
    })
})
//For Updating Ad
app.put("/update_MYAD/:id", (req, res) => {
    const Adid = req.params.id;
    const title = req.body.title;
    const Description = req.body.Description;
    const Cost = req.body.Cost;
    const Location = req.body.location;
    const Type = req.body.Type;
    const adCategory = req.body.adCategory
    const Images = req.body.Images;

    console.log("SERVER SIDE : ", Images)



    db.query(
        "UPDATE ads SET title = ?,Description = ?,Cost = ?,Images=?,Location=?,Type=?,adCategory=? WHERE Ad_id = ?",
        [title, Description, Cost, Images, Location, Type, adCategory, Adid],
        (err, result) => {
            if (err) throw err;
            else if (result.length == 0) {
                console.log("Ad Not Updated")
                // res.status=404
                // res.send({found:false})
                return res.status(404).send({ found: false })
            }
            else {
                res.send({ found: true })
                console.log("Ad Updated Successfully")
            }
        }
    );



})

//For Updating Password
app.put("/update", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    console.log(password)

    bcrypt.hash(password, 10).then((hash) => {
        db.query(`UPDATE users SET password = '${hash}' WHERE email = '${email}' AND Status=1`, (err, result) => {

            if (err) throw err;
            else if (result.length == 0) {
                console.log("Password Not Updated")
                // res.status=404
                // res.send({found:false})
                return res.status(404).send({ found: false })
            }
            else {
                res.send({ found: true })
                console.log("Password Updated Successfully")
            }
        })
    });
})



//Get Specific User with Ad ID for Chat System
app.get("/get_userE/:AdID", (req, res) => {
    const id = req.params.AdID;
    console.log("Serverr : ", id)
    db.query(`SELECT email FROM ads WHERE Ad_id = '${id}'`, (err, result) => {
        res.send(result);

    })
})

// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "";
//     con.query(sql, function (err, result) {
//       if (err) throw err; 
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

app.listen(3006, () => {
    console.log("server listening on port 3006")
})


console.log("This is ,y final year project gamingstan p2p market place for gammers where gamers can buy")



//ecom

app.get("/addtocart/:id", (req, res) => {
    const id = req.params.product.id;
    console.log("Serverr : ", id)
    db.query(`SELECT * FROM product WHERE ID = '${id}' `, (err, result) => {
        res.send(result);

    })
})


app.get('/Get_Up_Product/:productId', (req, res) => {
    const productId = req.params.productId;
    db.query(`SELECT * FROM product WHERE ID = ${productId} AND Status = 1`, (err, result) => {
      if (err) {
        console.log(err);
    
      } else {
        if (result.length === 0) {
          res.status(404).send('Product not found');
        } else {
          res.send(result[0]);
        }
      }
    });
  });
  

  app.get('/addtocart/:id', (req, res) => {
    const productId = req.params.product.id;
    db.query(`SELECT ID, Name, Price, Images FROM product WHERE ID = ${productId} AND Status = 1`, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving product information');
      } else {
        if (result.length === 0) {
          res.status(404).send('Product not found');
        } else {
          res.send(result[0]);
        }
      }
    });
  });
  


  
  
  
  
  
  
  