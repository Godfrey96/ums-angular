import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  // user$!: Observable<User>;
  editForm!: FormGroup;
  isSubmitted = false;
  responseMessage!: any;
  currentLoggedInUser!: User;
  uploadedImage!: File;
  getImageName?: string;
  fetchPhoto!: string;
  base64Data: any;
  responsePhoto: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService.getSingleUser().subscribe((user: User) => {
      // console.log('ser-prof: ', user.profilePicture?.imageName)
      this.currentLoggedInUser = user;
      // console.log('IMAGE: ', this.currentLoggedInUser.profilePicture?.imageName)

      this.getImageName = this.currentLoggedInUser.profilePicture?.imageName;
      // console.log('IMAGE-NAME: ', this.getImageName)

      console.log('IMAGE-NAME: ', this.getImageName);

      this.imageService.getImage(this.getImageName).subscribe({
        next: (res: any) => {
          console.log('name-image: ', res);
          this.responsePhoto = res;
          this.base64Data = this.responsePhoto.imageName;
          this.fetchPhoto = 'data:image/jpeg;base64,' + this.base64Data;
        },
        error: (error) => {
          console.log('di-error', error);
          if (error.status === 200) {
            console.log('photo fetched: ');
            return;
          }
        },
      });
    });

    this._editForm();
  }

  _editForm() {
    this.editForm = this.fb.group({
      myUsername: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this._populateCurrentUserEditForm();
  }

  _populateCurrentUserEditForm() {
    this.userService.getSingleUser().subscribe((res: User) => {
      this.editFormError['myUsername'].setValue(res.myUsername);
      this.editFormError['phone'].setValue(res.phone);
      this.editFormError['email'].setValue(res.email);
    });
  }

  onImageUpload(event: any) {
    console.log('event-image: ', event);
    this.uploadedImage = event.target.files[0];
    console.log('this.fetchPhoto: ', this.fetchPhoto);

    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);

    this.userService.uploadImage(imageFormData).subscribe({
      next: (res: any) => {
        console.log('eres-imager: ', res);
        this.notificationService.showSuccess(
          'Image uploaded successfully',
          'SUCCESS'
        );
      },
      error: (error: any) => {
        console.log('err: ', error);
        if (error.status === 200) {
          this.notificationService.showSuccess(
            'Image uploaded successfully',
            'SUCCESS'
          );
          return;
        }
      },
    });
  }

  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    console.log('this.getImageName: -- ', this.getImageName);

    const user: User = {
      myUsername: this.editFormError['myUsername'].value,
      phone: this.editFormError['phone'].value,
      email: this.editFormError['email'].value,
    };

    this.userService.updateUser(user).subscribe(
      (res: any) => {
        console.log('res-: ', res.data);
        this.ngxService.stop();
        this.responseMessage = res?.message;
        this.notificationService.showSuccess(this.responseMessage, 'SUCCESS');
      },
      (error) => {
        this.ngxService.stop();
        if (error.status === 200) {
          this.notificationService.showSuccess(
            'User updated successfully',
            'SUCCESS'
          );
          return;
        }
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = this.notificationService.showError(
            'Something went wrong',
            'BAD REQUEST'
          );
        }
        this.notificationService.showError(this.responseMessage, 'ERROR');
      }
    );
  }

  // errors
  get editFormError() {
    return this.editForm.controls;
  }
}
