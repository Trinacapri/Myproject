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
  image: any;
  file: any;
  item: any;
  products: any[];

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

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _catservice: AuthService
  ) {
    this.service = _authService;
  }

  ngOnInit() {
    this.loadCategories();
    this.loadAllProducts();
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
    this.service
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

  loadCategories() {
    this._catservice.getCategories().subscribe((response) => {
      if (response["status"] == "success") {
        this.cat = response["data"];
      }

      if (this.cat.length > 0) this.categoryid = this.cat[0].id;
    });
  }

  onSelectImage(event) {
    this._catservice
      .getImage(event.target.files[0])
      .subscribe((response: any) => {
        this.productimage = response.filename;
      });
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

  loadAllProducts() {
    this._authService.getAllProducts().subscribe((response) => {
      if (response["status"] == "success") {
        this.products = response["data"];
        console.log(this.products);
      } else {
        alert("error");
      }
    });
  }
  // loadproductimage() {
  //   this._authService.getImage(this.file).subscribe((response) => {
  //     this.image = this.file;

  //   });
  // }

  ondelete(productId: number) {
    // this._authService.deleteProduct(id).subscribe(
    //   (data) => {
    //     this.products= data;
    //     alert("delete product");
    //     this.products = ["data"];
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  onUpdate() {
    this._authService.editproduct(this.item).subscribe((response) => {
      if (response["status"] == "success") {
        alert("product-updated");
        this._router.navigate(["/home"]);
      } else {
        console.log(response["error"]);
        alert("error");
        //toastr.error(response['error'])
      }
    });
    console.log("hi");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }
}
