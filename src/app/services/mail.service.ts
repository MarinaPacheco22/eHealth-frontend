import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private sendGridApiKey = 'TU_CLAVE_DE_API_SENDGRID';

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    const url = 'https://api.sendgrid.com/v3/mail/send';

    const headers = {
      'Authorization': `Bearer ${this.sendGridApiKey}`,
      'Content-Type': 'application/json',
    };

    return this.http.post(url, emailData, { headers });
  }
}
