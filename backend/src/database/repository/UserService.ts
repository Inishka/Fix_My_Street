import express from 'express';
import sql from 'mysql2'
import Database from '../database';
import crypto from 'crypto-js'
import jwt from 'jsonwebtoken'

export class UserDetailsService extends Database {

    constructor() {
        super()
        this.CreateTable("create  table if not exists UserDetails ( userID int primary key AUTO_INCREMENT, email varchar(100) unique ,encrptedPassword varchar(100),mob varchar(100),  fname varchar(100),lname varchar(100),dob varchar(100), gender varchar(100),role int ,status int) ")
        this.CreateTable("create  table if not exists AddressMapping ( AddressID int primary key AUTO_INCREMENT,  Address varchar(100)  ,PinCode varchar(100),LandMarks varchar(100)) ")
        this.CreateTable("create  table if not exists ComplainsTable ( refID int primary key AUTO_INCREMENT, userID int ,ComplainDetails varchar(100),AddrressID varchar(100))")

    }

    private CreateTable(query: string) {
        this.setMySqlConfig("complain")
        this.executeQuery(query, (err: any, data: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Table is created")
            }
        })
    }

    public getAuthUser = async (res: express.Response, email: string, password: string) => {
        this.setMySqlConfig("complain")

        const encrptedPassword = "" + crypto.SHA256(password)
        this.executeQuery(`select userID ,fname , lname,email , mob ,gender , role , status , dob from userdetails  where email = '${email}' and encrptedPassword = '${encrptedPassword}' `, (err: any, data: any) => {
            const result = {
                status: "",
                error: "",
                message: "",
            }


            if (err) {
                result["status"] = "error"
                result["error"] = "credentail error"
            } else {
                if (data.length == 0) {
                    result["status"] = "error"
                    result["error"] = "user doesn't exists"
                } else {
                    result["status"] = "success"
                    let token: any
                    try {

                        token = jwt.sign(data[0], "123456789")
                    } catch (err: any) {

                    }
                    result["message"] = token

                } res.send(result)
            }
        })

    }

    public insertAuthUser = async (res: express.Response, email: string, password: string, mob: string, role: string, status: string, lname: string, fname: string, dob: string, gender: string) => {
        this.setMySqlConfig("complain");

        const encrptedPassword = "" + crypto.SHA256(password)
        this.executeQuery(`insert into userDetails values ( default , '${email}', '${encrptedPassword}', '${mob}', '${fname}', '${lname}', '${dob}', '${gender}', ${role}, ${status} ) ;`, (err: any, data: any) => {
            const result = {
                status: "",
                error: "",
                message: ""
            }
            console.log(err)
            if (err) {
                result["status"] = "error"
                result["error"] = "user doesn't exists"
            } else {
                result["status"] = "error"
                result["message"] = "User is Created"
            }
            res.send(result)
        })

    }
// select ComplainDetails from complainstable where userID = 1
public getComplains = async (res: express.Response, userID: string) => {
    this.setMySqlConfig("complain");
 
               this.executeQuery(`select ComplainDetails from complainstable  where userID = ${userID};`, (error: any, r: any) => {
                    // console.log(data, select[0].AddressID, response, r)
                    const result = {
                        status: "",
                        error: "",
                        message: ""
                    }

                    result["status"] = "error"
                    result["message"] = r
                    res.send(result)
                })
           
}

public getComplainsRecent = async (res: express.Response, userID: string) => {
    this.setMySqlConfig("complain");
 
               this.executeQuery(`select ComplainDetails from complainstable  where userID = ${userID} limit 2;`, (error: any, r: any) => {
                    // console.log(data, select[0].AddressID, response, r)
                    const result = {
                        status: "",
                        error: "",
                        message: ""
                    }

                    result["status"] = "error"
                    result["message"] = r
                    res.send(result)
                })
           
}

    public insertComplains = async (res: express.Response, address: string, pincode: string, LandMarks: string, userID: number, ComplainDetails: string) => {
        this.setMySqlConfig("complain");
        console.log(address, pincode, LandMarks, userID, ComplainDetails)
        this.executeQuery(`insert into addressmapping values ( default ,"${address}" , "${pincode}","${LandMarks}");`, (e: any, response: any) => {
            console.log( response ,e)
            this.executeQuery(`select AddressID from addressmapping where address ='${address}' and pincode = '${pincode}' and LandMarks = '${LandMarks}'; `, (err: any, select: any) => {
                console.log( select, response)
                this.executeQuery(`insert into complainstable values ( default , ${userID} , '${ComplainDetails}' , ${select[0].AddressID}  ) ;`, (error: any, data: any) => {
                    // console.log(data, select[0], response)
                    this.executeQuery(`select refID from complainstable where userID = ${userID} and AddrressID = ${select[0].AddressID} ;`, (error: any, r: any) => {
                        console.log( r)
                        const result = {
                            status: "",
                            error: "",
                            message: ""
                        }

                        // console.log(response , data , r , select)
                        result["status"] = "success"
                        result["message"] = r
                        res.send(result)
                    })
                })
            // res.send()
            })

            
        })
        
    }

    public updateUser = async (res: express.Response, lname: string, fname: string, dob: string, gender: string , email : string , userID : number) => {
        this.setMySqlConfig("complain");
        // console.log(address, pincode, LandMarks, userID, ComplainDetails)
        this.executeQuery(`update  userdetails set fname="${fname}", lname="${lname}", email="${email}" , dob="${dob}", gender="${gender}" where userID=${userID};`, (e: any, response: any) => {
            
            const result = {
                status: "",
                error: "",
                token: ""
            }
        
              if (e != null) {
                // there is an error while performing the operation
                result["status"] = "error";
                result["error"] = "Invalid credentials!!";
                res.status(400);
              } else {
                // there is no error
                const user = {
                  fname: fname,
                  lname: lname,
                  email: email,
                  dob: dob,
                  gender: gender,
                  userID: userID ,
                };
                const token = jwt.sign(user, '123456789');
                result["status"] = "success";
                result["token"] = token;
                console.log("User updated");
              }
              res.send(result);
            });
          
        };
           

            
       
        
 

    
            

}


