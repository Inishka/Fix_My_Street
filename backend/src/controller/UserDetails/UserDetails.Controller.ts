import express from "express";
import Controller from "../../interfaces/controller.interface";
import { BaseController } from "../BaseController";
import { UserDetailsService } from "../../database/repository/UserService";

export class UserDetailsController extends BaseController implements Controller {

    public path = '/user'
    public router = express.Router();
    public getUserDetails : any ;

    constructor() {
        super() ;
        this.getUserDetails = new UserDetailsService()
        this._initialiseRoutes() ;
    }


    private _initialiseRoutes = () =>{
       this.router.post(`${this.path}/login`, this._getAuthDetails) 
       this.router.post(`${this.path}/register`, this._insertAuthUser) 
       this.router.post(`${this.path}/insertComplains`, this._insertComplains)
       this.router.post(`${this.path}/getComplains`, this._getComplains)
       this.router.post(`${this.path}/getComplains/recent`, this._getComplainsToday)
       this.router.patch(`${this.path}/update`, this._updateUser)
    }

    private _getAuthDetails = this.catchAsyn(async ( req : express.Request , res : express.Response , next : express.NextFunction) => {
       console.log(req.body)
        const { email , password } = req.body ;
        this.getUserDetails.getAuthUser(res , email , password)
   
    })

    private _insertAuthUser = this.catchAsyn(async ( req : express.Request , res : express.Response , next : express.NextFunction) => {
      // console.log(req.body)
        const { email , password , mob ,lname,dob,fname,gender } = req.body ;
       console.log(req.body)
        this.getUserDetails.insertAuthUser(res , email , password , mob , 1 , 1, lname , fname , dob , gender)
      // res.send(req.body)
     
     })

     private _insertComplains = this.catchAsyn(async ( req : express.Request , res : express.Response , next : express.NextFunction) => {
       
        const { address, pincode, LandMarks, user, ComplainDetails } = req.body ;
       
         this.getUserDetails.insertComplains(res ,address, pincode, LandMarks, user.userID, ComplainDetails)
      
      })

      private _getComplains = this.catchAsyn(async ( req : express.Request , res : express.Response , next : express.NextFunction) => {
       
         const { user } = req.body ;

         console.log(req.url)
        
          this.getUserDetails.getComplains(res ,user.userID)
       
       })

       private _getComplainsToday = this.catchAsyn(async ( req : express.Request , res : express.Response , next : express.NextFunction) => {
       
         const { user } = req.body ;

         console.log(req.url)
        
          this.getUserDetails.getComplainsRecent(res ,user.userID)
       
       })

       private _updateUser = this.catchAsyn(async ( req : express.Request , res : express.Response , next : express.NextFunction) => {
       
         const { user , lname ,fname, dob , gender, email   } = req.body ;

         console.log(req.url)
         
         this.getUserDetails.updateUser( lname ,fname, dob , gender, email , user.userID)
       
       })

      
      
}