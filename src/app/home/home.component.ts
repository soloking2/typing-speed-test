import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { Button } from '../model/button';

@Component({
  selector: 'tt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  message: string = 'Welcome To Typing Speed Test';
  randomTexts = [
    'my name is solomon, i am a front-end developer',
    'Out too the been like hard off. Improve enquire welcome own beloved matters here.',
    'On no twenty spring of in esteem spirit likely estate. Continue new you declared differed learning bringing honoured',
  ];
  timers: Button[] = [
    {
      id: 1,
      name: '1m',
      seconds: 60,
    },
    {
      id: 1,
      name: '2m',
      seconds: 120,
    },
    {
      id: 1,
      name: '5m',
      seconds: 300,
    },
  ];
  msg: string;
  @ViewChild('test', { static: false }) testButton: ElementRef;
  // typeWords: HTMLInputElement = this.document.querySelector('#typedWords');
  @ViewChild('typedWords') typedWords: ElementRef;
  @ViewChild('copiedWords') copiedWord: ElementRef;
  @ViewChild('msg', { static: false }) msgContent: ElementRef;
  startTime;
  endTime;
  totalTime;
  el: HTMLElement;
  typedWord: HTMLInputElement;
  copiedWords: HTMLInputElement;
  messagesEl: HTMLElement;
  output: string;
  mistakes: number = 0;
  timer: any;
  chosenTime: number = 60;
  time = this.chosenTime;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.el = this.testButton.nativeElement;
    this.typedWord = this.typedWords.nativeElement;
    this.copiedWords = this.copiedWord.nativeElement;
    this.messagesEl = this.msgContent.nativeElement;
  }

  selectedTime(time: Button) {
    this.chosenTime = time.seconds;
    this.time = this.chosenTime;
    this.mistakes = 0;
    this.document.getElementById('result').style.display = 'none';
  }

  startGame() {
    if (this.el.innerText == 'Start') {
      if (this.typedWords) {
        this.typedWord.disabled = false;
        this.typedWord.value = '';
        this.document.getElementById('end').style.display = 'none';
        this.document.getElementById('result').style.display = 'none';
        this.time = this.chosenTime;
        this.mistakes = 0;
      }
      this.playGame();
    }
  }

  playGame() {
    let randomNumber = Math.floor(Math.random() * this.randomTexts.length);
    this.timeReduce();
    if (
      this.copiedWords.value.trim().length &&
      this.copiedWords.value.trim() !== ''
    ) {
      this.messagesEl.innerText = '';
      this.msg = this.copiedWords.value.trim();
    } else {
      this.msg = this.randomTexts[randomNumber];
      let arr = this.msg.split('').map((value) => {
        return "<span class='quote-chars'>" + value + '</span>';
      });
      this.messagesEl.innerHTML += arr.join('');
      this.copiedWords.style.display = 'none';
    }

    this.el.style.display = 'none';
    this.document.getElementById('end').style.display = 'block';
    this.document.getElementById('end').classList.add('mx-auto');
  }

  toCompare() {
    let quoteChars = Array.from(this.document.querySelectorAll('.quote-chars'));
    let userInput = this.typedWord.value.split('');

    quoteChars.forEach((char, index) => {
      const character = userInput[index];
      if (char.innerHTML == character) {
        char.classList.add('success');
      } else if (character == null) {
        if (char.classList.contains('success')) {
          char.classList.remove('success');
        } else {
          char.classList.remove('danger');
        }
      } else {
        if (!char.classList.contains('danger')) {
          this.mistakes += 1;
          char.classList.add('danger');
        }
      }

      let check = quoteChars.every((element) => {
        return element.classList.contains('success');
      });

      if (check) {
        this.endGame();
      }
    });
  }

  timeReduce() {
    this.time = this.chosenTime;
    this.timer = setInterval(() => {
      this.time == 0 ? this.endGame : --this.time;
    }, 1000);
  }

  endGame() {
    this.document.getElementById('result').style.display = 'block';
    this.typedWord.disabled = true;
    this.el.style.display = 'block';
    this.document.getElementById('end').style.display = 'none';
    this.el.classList.add('mx-auto');
    this.messagesEl.innerText = '';
    this.copiedWords.style.display = 'block';
    clearInterval(this.timer);
    let timeTaken = 1;
    if (this.time != 0) {
      timeTaken = (this.chosenTime - this.time) / 100;
    }

    this.document.getElementById('wpm').innerText =
      (this.typedWord.value.length / 5 / timeTaken).toFixed(2) + ' wpm';

    this.document.getElementById('accuracy').innerText =
      Math.round(
        ((this.typedWord.value.length - this.mistakes) /
          this.typedWord.value.length) *
          100
      ) + '%';
  }
}
