import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from "../../../../../../share/services/product/product.service";
import {PaymentService} from "../../../../../../share/services/payment/payment.service";



@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  products:any[]=[];
  paytypes:any[]=[];
  selectedItem: any;
  constructor(private productService:ProductService,private paymentService:PaymentService) { }


  form= new FormGroup({
    product: new FormControl('',[Validators.required]),
    qty: new FormControl('',[Validators.required]),
    price: new FormControl(''),
    amount: new FormControl(''),
    totalamount: new FormControl(''),
    discount: new FormControl(''),
    nettotal: new FormControl(''),
    paytype: new FormControl('')
  })


  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData() {
    this.productService.findAll().subscribe(response=>{
      console.log(response);
      this.products=response.data.list;

       this.paymentService.findAll().subscribe(response=>{
     console.log(response);
     this.paytypes=response.data.list;


   },error=>{
     console.log("Something Went to Wrong!");
   })

    },error=>{
      console.log("Something Went to Wrong!");
    })


  }

  changePrice() {
   debugger
    if(this.selectedItem){
      this.productService.findProduct(this.selectedItem).subscribe(response=>{
        if(response.code===200){
          this.form.patchValue({

            price: response.data.sellingPrice
          })
        }
      },error => {
       /* this.snackbarService.showSnackbar('Not Found','Close')*/
      })
    }
    else {
      /*this.snackbarService.showSnackbar('Please Select the Item','Close')*/
    }
  }
}
