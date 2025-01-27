import {Component, inject} from '@angular/core';
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonToolbar
} from '@ionic/angular/standalone';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {BarcodeFormat} from '@zxing/library';
import {DataService} from "../../data.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonContent, ZXingScannerModule, IonItem, IonSelect, IonSelectOption, IonAlert],
})
export class Tab1Page {
  constructor() {}

  private readonly dataService = (inject(DataService))
  private readonly http = (inject(HttpClient))
  availableDevices: MediaDeviceInfo[] | undefined
  deviceCurrent: MediaDeviceInfo | undefined
  deviceSelected: string = ""
  startScan: boolean = true
  protected scanResult = this.dataService.currentScannedProduct
  protected alertButtons = [
    {
      text: 'Ok',
      handler: () => {
        console.log('Alert canceled');
      },
    },
  ]

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean = true;
  hasPermission: boolean = true;

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices!.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onCodeResult(resultString: string) {
    //this.barcode = "4016241030603"
    this.http
      .get<OpenFoodFactResponse>("https://world.openfoodfacts.net/api/v2/product/" + resultString + "?product_type=all&fields=product_name,nutriments")
      .pipe(take(1))
      .subscribe((value) => {
        this.dataService.currentScannedProduct = {
          name: value.product.product_name,
          energy_kcal_100g: value.product.nutriments['energy-kcal_100g'],
          proteins_100g: value.product.nutriments.proteins_100g
        } as Product
        this.startScan = false
      })
  }
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
