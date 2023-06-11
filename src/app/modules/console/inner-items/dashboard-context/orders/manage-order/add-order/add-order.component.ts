import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ProductService} from "../../../../../../share/services/product/product.service";
import {PaymentService} from "../../../../../../share/services/payment/payment.service";
import {InvoiceService} from "../../../../../../share/services/invoice/invoice.service";
import {SnackBarService} from "../../../../../../share/services/core/snack-bar.service";



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
  selectedPaytype: any;

  constructor(private productService:ProductService,private paymentService:PaymentService,private invoiceService:InvoiceService,private snackbarService:SnackBarService) { }


  form= new FormGroup({
    product: new FormControl('',[Validators.required]),
    qty: new FormControl('',[Validators.required]),
    price: new FormControl(''),
    amount: new FormControl(''),

  });

  formSave= new FormGroup({

    totalamount: new FormControl(''),
    discount: new FormControl(''),
    nettotal: new FormControl(''),
    paytype: new FormControl('',[Validators.required]),
    paidamount:new FormControl('',[Validators.required]),
    balanceamount:new FormControl('')
  });



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
          propertyId:this.selectedItem,
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
      this.formSave.patchValue({
        totalamount: this.addeditems.reduce((total, item) => total + item.amount, 0)
      })
    }

   /* this.totalamount = this.addeditems.reduce((total, item) => total + item.amount, 0);*/
  }

  calNettotal() {
    if(this.selectedItem) {
      this.formSave.patchValue({
        nettotal: this.formSave.get('totalamount')?.value! - this.formSave.get('discount')?.value!
      })
    }
  }

  calBalance() {
    if(this.selectedItem) {
      this.formSave.patchValue({
        balanceamount: this.formSave.get('paidamount')?.value! - this.formSave.get('nettotal')?.value!
      })
    }
  }

  cancelbuttonClicked() {
    this.addeditems = [];
    this.form.reset();
    this.formSave.reset();
  }

  saveProduct(formData: FormGroupDirective) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const invoiceDate = `${year}-${month}-${day}`;

// Get the values from the form group
    const total = this.formSave.get('totalamount')?.value;
    const discount = this.formSave.get('discount')?.value;
    const netTotal = this.formSave.get('nettotal')?.value;
    const paytype = this.formSave.get('paytype')?.value;
    const paidamount = this.formSave.get('paidamount')?.value;
    const balance = this.formSave.get('balanceamount')?.value;


    const paytype1 = this.selectedPaytype;
    const paytype2 = null;



    // Create the invoice detail list using the addeditems array
    const invoiceDetailList = this.addeditems.map(item => {
      return {
        sellingPrice: item.price,
        unitPrice: 0,
        amount: item.amount,
        qty: item.qty,
        product_property_Id: {
          product_property_Id: item.propertyId
        }
      };
    });

    const jsonObject = {
      invoiceDate,
      total,
      discount,
      netTotal,
      paytype1,
      paytype2,
      balance,
      invoiceDetailList
    };


    this.invoiceService.saveInvoice(jsonObject).subscribe(response=>{
      if(response.code===201){
        this.snackbarService.showSnackbar('Success!','Close')

        this.formSave.reset();
        this.form.reset();
        this.addeditems=[];

      }
    },error => {
      this.snackbarService.showSnackbar('Something went wrong','Close')
    });


  }
}
