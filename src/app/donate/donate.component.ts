import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {

  title = 'donateapp';
  //set the link of the based route
  readonly APIUrl="http://localhost:5038/api/donate/";
  

  constructor(private http:HttpClient){
  }
  //initialize the books array
  donate:any=[];

  refreshDonate(){
    this.http.get(this.APIUrl+'GetDonate').subscribe(data=>{
      this.donate=data;
    })
  }
  ngOnInit(){
    this.refreshDonate();
  }

  addDonate(){
    var newName=(<HTMLInputElement>document.getElementById("newName")).value;
    var newMessage=(<HTMLInputElement>document.getElementById("newMessage")).value;
    var newDonation=(<HTMLInputElement>document.getElementById("newDonation")).value;
    var formData=new FormData();
    formData.append("name", newName);
    formData.append("message", newMessage);
    formData.append("donation", newDonation.toString());
    this.http.post(this.APIUrl+'AddDonate', formData).subscribe(data=>{
      alert(data);
      this.refreshDonate()
    })
  }
  
  deleteDonate(id:any){
      this.http.delete(this.APIUrl+'DeleteDonate?id='+id).subscribe(data=>{
      alert(data);
      this.refreshDonate()
    })
  }




  // Initialize donationForm as an empty object
  donationForm = {
    name: '',
    email: '',
    amount: 0
  };

  submitDonation(form: NgForm) {
    if (form.valid) {
      // Here you can handle the submission of the donation form, e.g., send data to backend or payment gateway
      console.log('Donation submitted:', form.value);
      // Reset the form after submission
      form.resetForm();
      // Display a thank you message
      alert('Thank you for your donation!');
    }
  }
}
