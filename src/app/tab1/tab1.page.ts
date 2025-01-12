import {Component, inject} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {HttpClient} from "@angular/common/http";
import {map} from "ionicons/icons";
import {tap} from "rxjs";

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


  qrResultString: string = "";

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  clearResult(): void {
    this.qrResultString = "";
  }
  askApi(){
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    console.log("CLICKED")
    // @ts-ignore
    // @ts-ignore
    this.http.get("https://world.openfoodfacts.org/api/v2/search?code=" + this.qrResultString)
      .subscribe(
        // @ts-ignore
        it => {
          console.log(it);
          // @ts-ignore
          console.log(it["products"][0]["product_name"])
        })
  }
}
