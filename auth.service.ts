//this will conatin themethod related to login and registration
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
// import { Productlist } from "./product";
// import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  private _registerUrl = "http://localhost:5000/api/register";
  private _loginUrl = "http://localhost:5000/api/login";
  private _addcategoryUrl = "http://localhost:5000/api/category";
  
  private _addproductyUrl = "http://localhost:5000/api/product";
  // private _fetchproductyUrl = "http://localhost:5000/api/product";
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
    const body = new FormData();
    body.append("productname", productname);
    body.append("productprice", productprice);
    body.append("productdiscount", productdiscount);
    body.append("productdoseInMG", productdoseInMG);
    body.append(" productmgfdate", productmgfdate);
    body.append(" productexpiredate", productexpiredate);

    body.append("productpriceWithDiscount", productpriceWithDiscount);
    body.append("productdescription", productdescription);
    body.append("productimage", productimage);
    body.append("categoryid", categoryid);

    return this.http.post(this._addproductyUrl, body);
  } //end of addservive

  getCategories() {
    return this.http.get(this._addcategoryUrl);
  }
  getAllProducts() {
    return this.http.get(this._addproductyUrl);
  }
  getproduct()
  {
      return this.http.get(this._addproductyUrl)
  }
}
