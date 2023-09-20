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
  dialogFormRegistro: FormGroup;
  cliente: User = new User();
  registrarUsuario = false;

  userTypesList = ['cc', 'id'];

  constructor(
    private dialogRef: MatDialogRef<LoginUserComponent>,
    private formBuilder: FormBuilder,
    private formBuilderRegistro: FormBuilder,
    private router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.formBuilder.group({
      cedula: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.dialogFormRegistro = this.formBuilderRegistro.group({
      cedula: ['', Validators.required],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
    });
  }

  cancelar(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  aceptar(): void {
    console.log('Campos validos? ',this.dialogForm.valid);
    
    if (this.dialogForm.valid) {
      const valorcedula = this.dialogForm.controls['cedula'].value;
      const valoremail = this.dialogForm.controls['email'].value;
      this.buscarUsuario(valorcedula,valoremail);
    } else {
      console.log('Campos inválidos');
    }
  }

  subscribirse(): void {
    var nuevoCliente: User = new User();
    console.log('Campos validos subs? ',this.dialogFormRegistro.valid);

    //nuevoCliente.user_id = 4;
    //nuevoCliente.name='Cristian';
    //nuevoCliente.lastname='Admin';
    //nuevoCliente.email='ccbonilla@gmail.com';
    //nuevoCliente.phone= '311213123';
    //nuevoCliente.address= 'Km 7 vía Armenia - El edén';
    //nuevoCliente.user_type_id= 1;
    //nuevoCliente.previous_user_type_id = 0;
    //nuevoCliente.count= 15;
    //nuevoCliente.user_type_name='Usuario bronce';
    nuevoCliente.user_id = 1;
    nuevoCliente.name= this.dialogFormRegistro.controls['nombre'].value;
    nuevoCliente.lastname = this.dialogFormRegistro.controls['apellido'].value;
    nuevoCliente.email = this.dialogFormRegistro.controls['email'].value;
    nuevoCliente.phone = this.dialogFormRegistro.controls['telefono'].value;
    nuevoCliente.address= this.dialogFormRegistro.controls['direccion'].value;
    nuevoCliente.user_type_id=1;
    nuevoCliente.identification=this.dialogFormRegistro.controls['cedula'].value;
    //nuevoCliente.count= 3;

    console.log('validacion sub cliente? ',nuevoCliente);
    
    if (this.dialogFormRegistro.valid) {
      this.userService.create('create', nuevoCliente).subscribe((res) => {
        console.log('Result Create USER** ', res);
        const isObject = typeof res === 'object';
        if (isObject) {
          console.log('El resultado ES* un objeto', isObject);
          console.log('ID nuevo cliente', res.user_id);
          this.buscarUsuario(res.user_id,'');
          
        } else {
          console.log('El resultadon NO* es un objeto', isObject);
        }
      });
    } else {
      console.log('Campos inválidos suscripcion');
    }
  }

  ngOnInit(): void {

  }

  buscarUsuario(valorcedula: number,valoremail:string) {
    console.log('Campos user cedula ', valorcedula);
    this.userService.getById('find-by-id/'+valorcedula).subscribe((user) => {
      if (user === null) {
        this.crearUsuario(valorcedula);
      } else {
        this.cliente = user;
        this.dialogRef.close(this.cliente);
      }
    });
  }

  crearUsuario(valorcedula: number) {
    this.registrarUsuario = true;

  }

}