/**
 * Created by dattaram on 15/2/18.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { prefixUrl } from '../canvas-models/canvas.constant';
import { Observable } from 'rxjs';

@Injectable()
export class RestCallService {
  constructor(public _httpClient: HttpClient) {}

  getRestCall(url: any): Observable<any> {
    return this._httpClient.get(url);
  }

  postRestCall(url: any, requestJson: any): Observable<any> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json;charset=UTF-8'
    );
    return this._httpClient.post(prefixUrl + url, requestJson, { headers });
  }
}
