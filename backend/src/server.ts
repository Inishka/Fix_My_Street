import App from './app';
import { PORT } from './config';
import { UserDetailsController } from './controller/UserDetails/UserDetails.Controller';
import { SecurityController } from './controller/Security/Security.Controller';


export const app = new App([new SecurityController,new UserDetailsController()], PORT);

app.listen();



