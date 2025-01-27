import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import { Product } from "./models/Product";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _currentScannedProduct: WritableSignal<Product | undefined> = signal(undefined)
  private _addedProducts: WritableSignal<Product[]> = signal([])

  constructor() {}

  get currentScannedProduct(): Signal<Product | undefined> {
    return this._currentScannedProduct;
  }

  set currentScannedProduct(value: Product | undefined) {
    this._currentScannedProduct.set(value);
  }

  get addedItems(): Signal<Product[]> {
    return this._addedProducts;
  }

  clearAddedItems(): void {
    this._addedProducts.set([])
  }

  addItem(product: Product): void {
    this._addedProducts.set([...this._addedProducts(), product])
  }

  addCurrentScannedProductToDay() {
    this._addedProducts.set([...this._addedProducts(), this.currentScannedProduct()!])
  }

  getTotalProtein = computed(() => {
    return this.addedItems()
      .map(product => parseInt(product.proteins_100g))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  });

  getTotalCalories = computed(() => {
    return this.addedItems()
      .map(product => parseInt(product.energy_kcal_100g))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  });
}
