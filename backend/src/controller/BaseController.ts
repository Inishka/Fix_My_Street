import express from "express";

export abstract class BaseController {
 
  protected catchAsyn = (fn: any) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      fn(req, res, next).catch((err: any) => {
      res.send()
      });
    };
  };
}
