import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../../../../share/services/product/product.service";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  data:any[]=[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData() {
    this.productService.findAll().subscribe(response=>{
      console.log(response);
      this.data=response.data.list;


    },error=>{
      console.log("Something Went to Wrong!");
    })
  }
}
