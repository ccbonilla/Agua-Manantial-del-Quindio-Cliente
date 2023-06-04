import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {
  dialogForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.formBuilder.group({
      campo1: ['', Validators.required],
      campo2: ['', Validators.required]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  aceptar(): void {
    if (this.dialogForm.valid) {
      this.dialogRef.close(this.dialogForm.value);
    }
  }

  ngOnInit(): void {

  }

}
