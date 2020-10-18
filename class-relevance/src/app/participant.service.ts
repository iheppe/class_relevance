import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Participant } from './participant';
import { PEOPLE } from './mock-participants';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor() { }

  getParticipants(): Observable<Participant[]> {
    return of(PEOPLE);
  }

  getParticipant(id: number): Observable<Participant> {
    return of(PEOPLE.find(participant => participant.id === id));
  }
}
