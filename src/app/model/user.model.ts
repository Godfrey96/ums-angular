import { Image } from "./image";
import { Role } from "./role";

export class User {
    id?: any;
    myUsername?: string;
    phone?: string;
    email?: string;
    password?: string;
    profilePicture?: Image;
    status?: string;
    role?: string;
}
