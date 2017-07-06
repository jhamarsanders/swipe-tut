import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as jsPDF from 'jspdf'
//import {jspdf} from 'jspdf';



/**
 * Generated class for the ScriptPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-script',
  templateUrl: 'script.html',
})
export class ScriptPage {

  //pdfSrc: string = '../../assets/thirteen_ghosts.pdf';
  pdfSrc: string = 'https://s3-us-west-1.amazonaws.com/espy-vibe/thirteen_ghosts.pdf';
  page: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScriptPage');
  }

}
