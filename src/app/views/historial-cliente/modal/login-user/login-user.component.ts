import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/users/users.service';


const LOAD_COMPONENT = Object.freeze({
  load: 1,
  modalLogin: 2,
  modalRegistrarse: 3,
  modalActualizar: 4
})

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
  estadoComponente: number = LOAD_COMPONENT.modalLogin;

  userTypesList = ['cc', 'id'];

  constructor(
    private dialogRef: MatDialogRef<LoginUserComponent>,
    private formBuilder: FormBuilder,
    private formBuilderRegistro: FormBuilder,
    private router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private objetoJSON: any,
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
      fechNacimiento: ['', Validators.required],
      telefono: [''],
    });
    
    const usuario = JSON.parse(objetoJSON);
    console.log('Objeto JSON recibido en el diálogo:', usuario);
    if(usuario){
      this.cliente = usuario;

      this.dialogFormRegistro.patchValue({
        cedula: usuario.identification,
        email: usuario.email,
        nombre: usuario.name,
        apellido: usuario.lastname,
        direccion: usuario.address,
        fechNacimiento: usuario.fechaNacimiento,
        telefono: usuario.phone,
      });
      
      this.estadoComponente = LOAD_COMPONENT.modalActualizar;
    }
  }
  
  actualizarDatos(): void {
    var nuevoCliente: User = new User();
    console.log('Campos validos subs? ',this.dialogFormRegistro.valid);
    
    nuevoCliente.user_id = this.cliente.user_id;
    nuevoCliente.previous_user_type_id = this.cliente.previous_user_type_id;
    nuevoCliente.name= this.dialogFormRegistro.controls['nombre'].value;
    nuevoCliente.lastname = this.dialogFormRegistro.controls['apellido'].value;
    nuevoCliente.email = this.dialogFormRegistro.controls['email'].value;
    nuevoCliente.phone = this.dialogFormRegistro.controls['telefono'].value;
    nuevoCliente.address= this.dialogFormRegistro.controls['direccion'].value;
    nuevoCliente.user_type_id=this.cliente.user_type_id;
    nuevoCliente.identification=this.dialogFormRegistro.controls['cedula'].value;
    nuevoCliente.password = this.cliente.password;
    nuevoCliente.count = this.cliente.count;
    
    console.log('validacion sub cliente? ',this.cliente);

    console.log('validacion nuevo cliente? ',nuevoCliente);
    
    if (this.dialogFormRegistro.valid) {

      this.userService.updateUser(`update/${this.cliente.user_id}`, nuevoCliente).subscribe((sub) => {
        if(sub){
          this.userService.getById('find-by-id/'+this.cliente.user_id).subscribe((user) => {
            this.cliente = user;
            this.dialogRef.close(this.cliente);
          });
        }
        console.log('result put '+sub);
      });

    } else {
      console.log('Campos inválidos suscripcion');
    }
  }
  
  get loadingComponent(){
    return this.estadoComponente === LOAD_COMPONENT.load;
  }
  get loginComponent(){
    return this.estadoComponente === LOAD_COMPONENT.modalLogin;
  }
  get registrarseComponent(){
    return this.estadoComponente === LOAD_COMPONENT.modalRegistrarse;
  }
  get actualizarComponent(){
    return this.estadoComponente === LOAD_COMPONENT.modalActualizar;
  }

  cancelar(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  aceptar(): void {
    this.estadoComponente = LOAD_COMPONENT.load;
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

    nuevoCliente.user_id = 1;
    nuevoCliente.name= this.dialogFormRegistro.controls['nombre'].value;
    nuevoCliente.lastname = this.dialogFormRegistro.controls['apellido'].value;
    nuevoCliente.email = this.dialogFormRegistro.controls['email'].value;
    nuevoCliente.phone = this.dialogFormRegistro.controls['telefono'].value;
    nuevoCliente.address= this.dialogFormRegistro.controls['direccion'].value;
    nuevoCliente.user_type_id=1;
    nuevoCliente.identification=this.dialogFormRegistro.controls['cedula'].value;

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
        this.estadoComponente = LOAD_COMPONENT.modalRegistrarse;

        const valorcedula = this.dialogForm.controls['cedula'].value;
        const valoremail = this.dialogForm.controls['email'].value;
        // Asignar los valores al dialogFormRegistro
        this.dialogFormRegistro.patchValue({ cedula: valorcedula, email: valoremail });
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