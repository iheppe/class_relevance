import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../mock-participants'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  participants = PEOPLE;

  constructor() { }

  ngOnInit(): void {
  }

}
