import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cartItems: CartItem[] = [];
totalPrice: Subject<number> = new Subject<number>();
totalQuantity: Subject<number> = new Subject<number>();

constructor() { }

addToCart(theCartItem: CartItem){
  // check whether book/item is already in the cart
  let alreadyExistsInCart: boolean = false;
  let existingCartItem: CartItem | undefined;

  if(this.cartItems.length > 0){
    // find the book/item in the cart based on the id
    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
    alreadyExistsInCart = (existingCartItem != undefined)
  }

  if(alreadyExistsInCart){
    // increment the quantity
    existingCartItem!.quantity++;
  }else{
    // add to the cart item array
    this.cartItems.push(theCartItem);
    theCartItem.unitInStock--;

  }

  this.calculateTotalPrice();

}
  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    // calculate total price and total quantity 
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    console.log(`total price: ${totalPriceValue}, total quantity: ${totalQuantityValue}`);
    
    // publish the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

}
