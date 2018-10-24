import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BoundedContextDefinitionService {
  public bContextList: any;
  public bcDropdownflag: boolean;
  public bcTextflag: boolean;
  public domainBtnflag: boolean;
  public disabledflag: boolean;

  constructor(private http: HttpClient) {
    this.bContextList = [];
  }

  getBContextList(): Observable<any> {
    return this.http.get('/api/dna/bcontext/findAllBc');
  }
}
