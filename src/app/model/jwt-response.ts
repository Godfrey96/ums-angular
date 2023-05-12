import { User } from "./user.model";

export class JwtResponse {
    user!: User;
    token!: string;
}