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
  addeditems: any[] = [];
  totalamount: number = 0;

  constructor(private productService:ProductService,private paymentService:PaymentService) { }


  form= new FormGroup({
    product: new FormControl('',[Validators.required]),
    qty: new FormControl('',[Validators.required]),
    price: new FormControl(''),
    amount: new FormControl(''),
    totalamount: new FormControl(''),
    discount: new FormControl(''),
    nettotal: new FormControl(''),
    paytype: new FormControl('',[Validators.required]),
    paidamount:new FormControl('',[Validators.required]),
    balanceamount:new FormControl('')
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

  /*findAmount() {
    if(this.selectedItem) {
      this.form.patchValue({
        amount: this.form.get('qty')?.value! * this.form.get('price')?.value!
      })
    }
  }*/

  addbuttonClicked() {
    if(this.selectedItem) {

      const existingItem = this.addeditems.find(item => item.itemdescription === this.products.find(x => x.propertyId === this.selectedItem).displayName);

      if (existingItem) {

        console.log('Item already added to the table!');
        return;
      }

        let item: any = {

          itemdescription: this.products.find(x => x.propertyId === this.selectedItem).displayName,
          price: this.form.get('price')?.value!,
          qty: this.form.get('qty')?.value!,
          amount: this.form.get('qty')?.value! * this.form.get('price')?.value!
        }
        this.addeditems.push(item);
        this.calculateTotalAmount();
        qty: this.form.get('qty')?.reset()

      }

  }

  deleteItem(index: number) {
    this.addeditems.splice(index, 1);
    this.calculateTotalAmount();
  }
  calculateTotalAmount(): void {
    if(this.selectedItem) {
      this.form.patchValue({
        totalamount: this.addeditems.reduce((total, item) => total + item.amount, 0)
      })
    }

   /* this.totalamount = this.addeditems.reduce((total, item) => total + item.amount, 0);*/
  }

  calNettotal() {
    if(this.selectedItem) {
      this.form.patchValue({
        nettotal: this.form.get('totalamount')?.value! - this.form.get('discount')?.value!
      })
    }
  }

  calBalance() {
    if(this.selectedItem) {
      this.form.patchValue({
        balanceamount: this.form.get('paidamount')?.value! - this.form.get('nettotal')?.value!
      })
    }
  }

  cancelbuttonClicked() {
    this.addeditems = [];
    this.form.reset();
  }
}
