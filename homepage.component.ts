import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { DateAdapter } from "@angular/material/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  // cat :{};
  cat: any[];
  categoryList = [];

  products: any[];

  // categoryid = "";
  categoryid = "";
  productname: string;
  productprice: string;
  productdiscount: string;
  productpriceWithDiscount: string;
  productdoseInMG: string;
  productmgfdate: string;
  productexpiredate: string;
  productdescription: string;
  productimage: string;

  service: AuthService;

  categoryNameData = {
    categoryname: String,
  };

  constructor(private _authService: AuthService, private _router: Router) {
    this.service = _authService;
  }

  ngOnInit() {
    this.loadCategories();
  }

  addcategoryName() {
    this._authService.addcategory(this.categoryNameData).subscribe(
      (res) => {
        console.log(res);

        localStorage.setItem("token", res.token);
      },
      (err) => console.log(err)
    );
  }
  addProduct() {
    this._authService
      .addproduct(
        this.productname,
        this.productprice,
        this.productdiscount,
        this.productpriceWithDiscount,
        this.productdoseInMG,
        this.productmgfdate,
        this.productexpiredate,
        this.productdescription,
        this.productimage,
        this.categoryid
      )
      .subscribe((response) => {
        if (response["status"] == "success") {
          alert("added product");
        } else {
          console.log(response["error"]);
          alert("error");
        }
      });
  }

  // loadCategories() {
  //   this._authService.getCategories().subscribe((response) => {
  //     console.log(response);
  //     //  this.cat[]= response[];
  //     // (cat) => (response = cat);
  //     // this.cat = response["categories"];
  //     // (response) => (this.cat = response);
  //     this.cat = [
  //       { id: 1, categoryname: "kids wear" },
  //       { id: 2, categoryname: "mens wear" },
  //       { id: 3, categoryname: "womens wear" },
  //     ];

  //     console.log(this.cat);
  //     // if (this.cat.length > 0) this.categoryid = this.cat[0].id;
  //     // }
  //   });
  // }

  loadCategories() {
    this._authService.getCategories().subscribe((response) => {
      if (response["status"] == "success") {
        // this.categoryList = response["data"];
        this.cat = response["data"];
      }

      // if (this.categoryList.length > 0) this.categoryid = this.cat[0]._id;
      if (this.cat.length > 0) this.categoryid = this.cat[0]._categoryid;
    });
  }

  onSelectImage(event) {
    this.productimage = event.target.files[0];
  }

  //   this._authService.getproduct().subscribe((response)=>{
  //     if(response['status']=='success')
  //     {
  //         this.products = response['data']
  //     }
  //     else{
  //         alert('error')
  //         console.log(response['error'])

  //     }
  // })
  // this.loadAllProducts()
  // }

  // loadAllProducts() {
  //   this._authService
  //     .getAllProducts()
  //     .subscribe(response => {
  //       if (response['status'] == 'success') {
  //         this.products = response['data']
  //       } else {
  //         alert('error')
  //       }
  //     })
  // }
  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }
}
