import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from 'src/app/model/button';

@Component({
  selector: 'tt-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() button: Button;
  @Output() select = new EventEmitter<Button>();
  constructor() {}

  ngOnInit(): void {}

  selectButton(button) {
    this.select.emit(button);
  }
}
