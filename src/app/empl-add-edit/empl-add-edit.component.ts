import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-empl-add-edit',
  templateUrl: './empl-add-edit.component.html',
  styleUrls: ['./empl-add-edit.component.css']
})
export class EmplAddEditComponent implements OnInit{

  empForm: FormGroup;

  education : string[]=[
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb:FormBuilder, 
    private _empService: EmployeeService,
    private _dialogRef:MatDialogRef<EmplAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    )
    {
    this.empForm=this._fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender:'',
      education: '',
      company: '',
      experience: '',
      package:'',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.data){
      this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val:any)=>{
          alert('Employee detail update!');
          this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err);
        }
      });
    }else{
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert('employee added sucessfully');
          this._dialogRef.close(true);
        },
        error: (err:any)=>{
          console.error(err);
        }
      })
    }
  }
}

}
