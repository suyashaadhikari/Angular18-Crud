import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { EmployeeClass } from './model/Employee';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isEditMode: boolean = false; 
  title = 'angular_18_crud';
  employeeForm:FormGroup=new FormGroup({});
  employeeObject: EmployeeClass=new EmployeeClass();
  employeeList:EmployeeClass[]=[];
  constructor()
  {
    this.isEditMode;
    this.createForm();
    const oldData=localStorage.getItem("EmpData");
    if(oldData!=null){
      const parseData=JSON.parse(oldData);
      this.employeeList=parseData;
    }
  }
  createForm(){
    this.employeeForm=new FormGroup({
      empId:new FormControl(this.employeeObject.empId),
      name:new FormControl(this.employeeObject.name),
      city:new FormControl(this.employeeObject.city),
      address:new FormControl(this.employeeObject.address),
      emailId:new FormControl(this.employeeObject.emailId),
      contactNo:new FormControl(this.employeeObject.contactNo),
      pinCode:new FormControl(this.employeeObject.pinCode),
      state:new FormControl(this.employeeObject.state),
    });
  }

  onEdit(item:EmployeeClass){
    this.employeeObject=item;
    this.createForm() ;
    this.isEditMode = true;
  }
  onDelete(id:number){
    const isDelete=confirm("Are you sure you want to delete?");
    if (isDelete){
      const index=this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1)
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    }
  }
  onUpdate(){
    const record=this.employeeList.find(e=>e.empId==this.employeeForm.controls['empId'].value);

    if (record!=undefined){
      record.address=this.employeeForm.controls['address'].value;
      record.name=this.employeeForm.controls['name'].value;
      record.city=this.employeeForm.controls['city'].value;
      record.emailId=this.employeeForm.controls['emailId'].value;
      record.contactNo=this.employeeForm.controls['contactNo'].value;
      record.pinCode=this.employeeForm.controls['pinCode'].value;
      record.state=this.employeeForm.controls['state'].value;

       localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
        this.onClear();
       this.employeeObject=new EmployeeClass();
      this.isEditMode = false;
    }

  }


  onSave(){
  
   const oldData = localStorage.getItem("EmpData");

  if (oldData != null) {
    const parseData = JSON.parse(oldData);
    this.employeeForm.controls['empId'].setValue(parseData.length + 1);
    this.employeeList = parseData;
  } else {
    this.employeeForm.controls['empId'].setValue(1);
  }

  this.employeeList.unshift(this.employeeForm.value);

  localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  this.onClear();
  this.employeeObject=new EmployeeClass();
  this.isEditMode = false;
  }

  onClear(){
    this.employeeForm.reset(); 
  }
}
