const dotenv = require("dotenv");
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser')
dotenv.config({path:".env"});
// const { promisify } = require("util");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

/*
//DO NOT MODIFY ANY PART OF THIS CODE USELESS TOLD TO DO SO.
*/ 
/*Add you connestion details to the env file*/
const connectionString = mysql.createConnection({
    host :'localhost',
    user :'root',
    password:'root',
    database:"game"
    });


function createTable(CreateQuerry)
{
    console.log(CreateQuerry)
    /*
    The function is responsible for creating tables in your database. Do not modify it.
    */
   return new Promise((resolve, reject)=>{
    connectionString.query(CreateQuerry,
        (err,result)=>
        {
            if(err)
            {
                console.log(err)
                console.log("Table creation failed");
                reject(err);
            }
            else
            {
                console.log("Table created");
                resolve()
                //console.log(result);
            }
        });

   });
}
    


// const createTablePromised = promisify(createTable)

/*
    Here you will be writing your create table queries and storing them in a const variable.
*/

connectionString.connect( (error)=>
{
    if(!error)
    {
        console.log("Connection has been established");
        connectionString.query(`CREATE DATABASE IF NOT EXISTS ${process.env.database}`, async (err2,result) =>
        {
            if(err2)
            {
                console.log(err2);
            }
            else
            {
                console.log("Database Created");
                try{
                    //call create table here using await like done below here.
                    // await createTable(CreateQuerry)
                }
                catch(err)
                {
                    console.log(err)
                }
                

                /*
                Here you will be calling the createTable function to create each table passing the above created 
                variable as a paramter to the function.
                */
                table_query_1 = 'CREATE TABLE Users(Name Varchar(100) NOT NULL, password Varchar(255) NOT NULL, contact_number Varchar(100) NOT NULL,email Varchar(100) NOT NULL UNIQUE  , PRIMARY KEY(email));'
                createTable(table_query_1)
                 
                table_query_2='CREATE TABLE Ads(Ad_id int NOT NULL  AUTO_INCREMENT,title varchar(50) NOT NULL,Description varchar(255) Not NULL,Cost int NOT NULL,Images varchar(255) Not NULL,email Varchar(100) NOT NULL,date DATETIME default now(),PRIMARY KEY (Ad_id));'
                createTable(table_query_2)
 
                table_query_3='CREATE TABLE Admin(password Varchar(255) NOT NULL,email Varchar(100) NOT NULL UNIQUE  , PRIMARY KEY(email));'
                createTable(table_query_3)
 
                table_query_2='CREATE TABLE Ad_Packages(AdF_id int NOT NULL  AUTO_INCREMENT,Title varchar(50) NOT NULL,Description varchar(255) Not NULL,Price int NOT NULL,PRIMARY KEY (AdF_id));'
                createTable(table_query_2)
 
                connectionString.end();

            }
        });
    }
    else
    {
        console.log("Connection failed");
        console.log(error);
    }
});

