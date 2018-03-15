import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps
  ) {}

  ionViewDidLoad(){
    this.loadMap();
   //commit a pr
  }

  loadMap(){
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 10.0032771, // default location
          lng: -84.2542092 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
   
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
   
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
        
      });
      console.log(response.latLng);
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

}