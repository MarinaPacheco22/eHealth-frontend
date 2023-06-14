import {Component, OnInit} from '@angular/core';
import {MailService} from "../../services/mail.service";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  private email = 'eHealth@hotmail.com';

  constructor(private mailService: MailService) {}

  ngOnInit(): void {
  }

  sendEmail(destinatario: string, mensaje: string): void {
    const emailData = {
      to: destinatario,
      from: 'remitente@example.com',
      subject: 'Cuenta eHealth',
      text: mensaje,
    };

    this.mailService.sendEmail(emailData)
      .subscribe(
        () => {
          console.log('Correo enviado');
        },
        (error) => {
          console.error('Error al enviar el correo', error);
        }
      );
  }

}
