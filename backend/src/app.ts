import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Controller from './interfaces/controller.interface';

class App {
  public app: express.Application;
  public port: any;

  constructor(controllers: Controller[], port: any) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }


  private initializeMiddlewares() {
   

    this.app.use(express.json({ limit: '5mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    const corsOptions = {
      origin: '*',
      credentials: true
    };
    // this.app.options("*",cors())
    this.app.use(cors(corsOptions))

  }

  private initializeControllers(controllers: Controller[]) {
    console.log(controllers[0].path)
    controllers.forEach((controller) => {
      this.app.use( controller.router);
    });
  }

 

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
