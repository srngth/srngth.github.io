import {Component} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, take} from "rxjs";
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ZXingScannerModule, IonItem, IonSelect, IonSelectOption],
})
export class Tab1Page {
  constructor(
    private http: HttpClient,
  ) {}

  availableDevices: MediaDeviceInfo[] = [];
  deviceCurrent: MediaDeviceInfo | undefined;
  deviceSelected: string = "";

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  qrResultString: string = "";
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  name = ""
  kcal = ""
  protein = ""

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.http.get<OpenFoodFactResponse>("https://world.openfoodfacts.net/api/v2/product/" + this.qrResultString + "?product_type=all&fields=product_name&Cnutriments")
      .pipe(
        take(1)
      )
      .subscribe(value => {
        this.name = value.product.product_name;
        this.kcal = value.product.nutriments.energy_kcal_100g
        this.protein = value.product.nutriments.proteins_100g
      })
  }
}

export interface OpenFoodFactResponse {
  code: string
  status_verbose: string
  product: Product
}

interface Product {
  product_name: string
  nutriments: Nutriments
}

interface Nutriments {
  energy_kcal_100g: string
  proteins_100g: string
}
