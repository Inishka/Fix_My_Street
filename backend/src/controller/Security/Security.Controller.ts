import express from "express";
import Controller from "../../interfaces/controller.interface";
import { BaseController } from "../BaseController";
import { UserDetailsService } from "../../database/repository/UserService";
import authMiddleware from "../../middlewares/auth.middleware";

export class SecurityController extends BaseController implements Controller {

    public path = '/'
    public router = express.Router();
    

    constructor() {
        super() ;
        this._initialiseRoutes() ;
    }


    private _initialiseRoutes = () =>{
       this.router.post(`/*`, authMiddleware) 
    }

    
}