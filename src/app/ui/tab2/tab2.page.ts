import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/Product";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonItem, IonAlert]
})
export class Tab2Page {

  private barcode: string | undefined
  private http: HttpClient = inject(HttpClient)
  private dataService = inject(DataService)

  protected availableMediaDevices: WritableSignal<MediaDeviceInfo[]> =  signal([])
  protected scanResult = this.dataService.currentScannedProduct
  protected addedItems = this.dataService.addedItems
  protected alertButtons = [
    {
      text: 'Ok',
      handler: () => {
        console.log('Alert canceled');
      },
    },
  ]

  constructor() {}

  protected JSON = JSON;
}

interface OpenFoodFactResponse {
  code: string
  status_verbose: string
  product: OpenFoodFactProduct
}

interface OpenFoodFactProduct {
  product_name: string
  nutriments: OpenFoodFactNutriments
}

interface OpenFoodFactNutriments {
  'energy-kcal_100g': string
  proteins_100g: string
}
