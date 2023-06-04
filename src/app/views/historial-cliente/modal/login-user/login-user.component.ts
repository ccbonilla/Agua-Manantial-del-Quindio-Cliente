import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginUserComponent>) { }

  ngOnInit(): void {
    
  }

}
