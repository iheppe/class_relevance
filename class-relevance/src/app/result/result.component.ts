import { Component, OnInit } from '@angular/core';
import { Participant } from '../participant';
import { ParticipantService } from '../participant.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  participants: Participant[];

  constructor(private participantService: ParticipantService) { }

  ngOnInit(): void {
    this.getParticipants();
  }

  getParticipants(): void {
    this.participantService.getParticipants()
        .subscribe(participants => this.participants = participants);
  }
}
