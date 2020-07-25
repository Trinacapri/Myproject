//this will conatin themethod related to login and registration
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
// import { Productlist } from "./product";
// import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  private _registerUrl = "http://localhost:5000/api/register";
  private _loginUrl = "http://localhost:5000/api/login";
  private _uploadUrl = "http://localhost:5000/api/upload";
  private _addcategoryUrl = "http://localhost:5000/api/category";
  private _userdetails = "http://localhost:5000/api/userdetails";
  private _addproductyUrl = "http://localhost:5000/api/product";
  private _editproductUrl="http://localhost:5000/api/UpdateProduct/:id"
  private _deleteproductyUrl = "http://localhost:5000/api/DeleteProduct/:id";
  constructor(private http: HttpClient) {}
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user); //it is making httpreq to the backend url passing in the user details and returned the details of the registered user as a response
  }
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user); //it accepts the login user object and returns the response that the backend api sends
  }
  loggedIn() {
    return !!localStorage.getItem("token");
  }
  getToken() {
    return localStorage.getItem("token");
  }
  addcategory(categoryname) {
    return this.http.post<any>(this._addcategoryUrl, categoryname);
  }
  addproduct(
    productname: string,
    productprice: string,
    productdiscount: string,
    productpriceWithDiscount: string,
    productdoseInMG: string,
    productmgfdate: string,
    productexpiredate: string,
    productdescription: string,
    productimage: string,
    categoryid: string
  ) {
    // const body = new FormData();
    // body.append("productname", productname);
    // body.append("productprice", productprice);
    // body.append("productdiscount", productdiscount);
    // body.append("productdoseInMG", productdoseInMG);
    // body.append("productmgfdate", productmgfdate);
    // body.append("productexpiredate", productexpiredate);

    // body.append("productpriceWithDiscount", productpriceWithDiscount);
    // body.append("productdescription", productdescription);
    // body.append("productimage", productimage);
    // body.append("categoryid", categoryid);

    const body = {
      productname,
      productprice,
      productdiscount,
      productdoseInMG,
      productmgfdate,
      productexpiredate,
      productpriceWithDiscount,
      productdescription,
      productimage,
      categoryid,
    };

    return this.http.post(this._addproductyUrl, body);
  }

  getCategories() {
    return this.http.get(this._addcategoryUrl);
  }
  getAllProducts() {
    return this.http.get(this._addproductyUrl);
  }
  getproduct() {
    return this.http.get(this._addproductyUrl);
  }
  getImage(selectedFile: any) {
    const body = new FormData();
    body.append("file", selectedFile);
    return this.http.post(this._uploadUrl, body);
  }

  getuserdetails() {
    return this.http.get(this._userdetails);
  }
  editproduct(id:number){
    return this.http.delete(this._editproductUrl + '/' + id)
  }
  deleteProduct(id: number) {
    return this.http.delete(this._deleteproductyUrl + '/' + id)
  }
//   edit_Product(
//     productname: string,
//     productprice: string,
//     productdiscount: string,
//     productpriceWithDiscount: string,
//     productdoseInMG: string,
//     productmgfdate: string,
//     productexpiredate: string,
//     productdescription: string,
//     productimage: string,
//     categoryid: string
// )
// {
//     const body={
//         productname:productname,
//         productprice:productprice,
//         productdiscount:productdiscount,
//         productpriceWithDiscount:productpriceWithDiscount,
//         productdoseInMG:productdoseInMG,
//         productmgfdate:productmgfdate,
//         productexpiredate:productexpiredate,
//         productdescription:productdescription,
//         categoryid:categoryid,
//         id:id
//     }


// return this.http.put(this.url + '/' + id, body)
// }

}
