import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Log from '../model/log';
import { LoggerService } from '../service/logger.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() logs: Array<Log>;
  today: number = Date.now();

  constructor(public loggerService: LoggerService) { }

  ngOnInit(): void {
  }


}
