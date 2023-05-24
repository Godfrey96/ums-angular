export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './image.service';
import { ImageService } from './image.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [AuthenticationService, ImageService, UserService];
