import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  dialogForm: FormGroup;
  cliente: User = new User();

  constructor(
    private dialogRef: MatDialogRef<LoginUserComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.formBuilder.group({
      campo1: ['', Validators.required],
      campo2: ['', Validators.required]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  aceptar(): void {
    console.log('Campos validos? ',this.dialogForm.valid);
    
    if (this.dialogForm.valid) {
      this.validarUsuario();
    } else {
      console.log('Campos inválidos');
    }
  }

  ngOnInit(): void {

  }

  validarUsuario() {
    const valorCampo1 = this.dialogForm.controls['campo1'].value;
    const valorCampo2 = this.dialogForm.controls['campo2'].value;
    console.log('Campos user cedula ', valorCampo1);
    this.userService.getById('find-by-id/'+valorCampo1).subscribe((user) => {
      if (user === null) {
        this.crearUsuario(valorCampo1);
      } else {
        this.cliente = user;
        this.dialogRef.close(this.cliente);
      }
    });
  }

  crearUsuario(valorCampo1: number) {


  }

}

