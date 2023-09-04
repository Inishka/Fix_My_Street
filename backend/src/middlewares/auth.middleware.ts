import express from 'express';
import jwt from 'jsonwebtoken'

const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if(req.url.match('/user/login') || req.url.match('/user/register')) {
            next()
        }else{
            const token = req.headers.authorization?.split(' ')[1]
            if(token != undefined ){
                const user = jwt.verify(token,'123456789')
                req.body.user = user ;
                next()
            }else{
                let result : {status : string , error : string} = {status :'error',error :'Refresh Token' }
                res.send(result)
            }
        }
    } catch (error) {
        
    }
};

export default authMiddleware;
