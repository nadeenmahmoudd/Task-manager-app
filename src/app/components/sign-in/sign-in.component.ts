import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  errorMessage: string | null = null;

  constructor( private _userAuthService: UserAuthService) { }
  signInForm:FormGroup= new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required]),
    })

  onSubmit(): void {
    const { email, password } = this.signInForm.value;
    this._userAuthService.getUsers().subscribe((users: any[]) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // Store the userId in local storage
        localStorage.setItem('userId', user.id.toString());
        this.errorMessage = null;
        alert('Sign-in successful');
        // Redirect or navigate to another page if necessary
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
