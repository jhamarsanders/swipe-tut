import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import * as jsPDF from 'jspdf'
//import {jspdf} from 'jspdf';
import 'rxjs/Rx';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  testData: Array<any>;
  cardArr: Array<any> = [];
  cardCnt: number = 0;

  constructor(public navCtrl: NavController, private http: Http) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    //this.cards = [{email: ''}];
    this.addNewCards(this.cardCnt);
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(like: boolean) {
    //let removedCard = this.cards.pop();
    let removedCard = this.cardArr.pop();
    this.cardCnt += 1;
    if(this.cardCnt < 5){
      this.addNewCards(this.cardCnt)
    } else {
      this.cardCnt = 0;
      this.addNewCards(this.cardCnt);
    }
    //this.addNewCards(1);
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.title;
    } else {
      this.recentCard = 'You disliked: ' + removedCard.title;
    }
  }

  goToScriptPage(){

    // var doc = new jspdf();
    // doc.setFontStyle('Bold');
    // doc.setFontSize(14);
    // doc.text('Testing PDFs', 20, 20);
    // var blob = doc.output('blob', {type: 'application/pdf'});
    // let pdfUrl = {pdfUrl: URL.createObjectURL(blob)};
    // let modal = this.navCtrl.push('ScriptPage', pdfUrl);
    // var doc = new jsPDF();
    // doc.setFontStyle('Bold');
    // doc.setFontSize(14);
    // doc.text('Testing PDFs', 20, 20);
    // var blob = doc.output('blob', {type: 'application/pdf'});
    // let pdfUrl = {pdfUrl: URL.createObjectURL(blob)};
    // let modal = this.navCtrl.push(ResumeView, pdfUrl);
    this.navCtrl.push('ScriptPage');
  }

// Add new cards to our array
//   addNewCards(count: number) {
//     this.http.get('https://randomuser.me/api/?results=' + count)
//       .map(data => data.json().results)
//       .subscribe(result => {
//         for (let val of result) {
//           this.cards.push(val);
//         }
//       })
//   }

  addNewCards(count: number){

    this.testData = [
      {
        title: 'The Godfather',
        logline: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        author: 'Sam Aleman'
      },
      {
        title: 'Pulp Fiction',
        logline: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        author: 'Jhamar Sanders'
      },
      {
        title: 'Forrest Gump',
        logline: 'Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.',
        author: 'ALexis Blades'
      },
      {
        title: 'The Matrix',
        logline: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        author: 'Chris Blades'
      },
      {
        title: 'Silence Of The Lambs',
        logline: 'A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.',
        author: 'Khadija Toliver'
      }
    ];
    console.log(this.cardArr);

    this.cardArr.push(this.testData[count]);
    console.log(this.cardArr);
  }

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

}
