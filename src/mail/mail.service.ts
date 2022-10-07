import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationSendGrid(user: User, token: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const url = `http://jetbuild-app.herokuapp.com/auth/activate/${token}`;
    const msg = {
      to: user.email,
      from: 'admin@jet-build.com', // Use the email address or domain you verified above
      subject: 'Email confirmation',
      text: `http://jetbuild-app.herokuapp.com/auth/activate/${token}`,
      html: `<p>Hey</p>
      <p>Please click below to confirm your email</p>
      <p>
          <a href="http://jetbuild-app.herokuapp.com/auth/activate/${token} ">Confirm</a>
      </p>
      
      <p>If you did not request this email you can safely ignore it.</p>
      `,
    };

    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  }
}
