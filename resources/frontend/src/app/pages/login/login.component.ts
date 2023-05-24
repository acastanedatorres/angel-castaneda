import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hideOld = true;
  hideNew = true;

  submitted = false;

  formParent: FormGroup = new FormGroup({});


  img : string = "https://uneg.edu.mx/wp-content/uploads/2022/01/5.-Que-actividades-realiza-un-contador-dentro-de-una-organizacion-min-scaled.jpg";

  constructor(
  ) {}

  public login() {
    
  }

  ngOnInit(): void {

    
  }

  initfromParent(){
   
  }

}
