import {Component} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ZXingScannerModule],
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
  tryHarder = false;

  name = ""
  clearResult(): void {
    this.qrResultString = "null";
  }

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
    console.log("invoked")
    this.qrResultString = resultString;
    this.http.get("https://world.openfoodfacts.org/api/v2/search?code=" + this.qrResultString)
      .subscribe(
        // @ts-ignore
        it => {
          console.log(it);
          // @ts-ignore
          this.name = it["products"][0]["product_name"]
        })
  }

}
