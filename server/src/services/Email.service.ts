import Mailjet, { Client } from "node-mailjet";

class EmailService {
  private static Instance: Client | null = null;

  private constructor() {
    // Initialize the Mailjet client instance
    EmailService.Instance = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY || "",
      process.env.MAILJET_SECRET_KEY || ""
    );
  }

  static getInstance(): Client {
    if (!EmailService.Instance) {
      new EmailService();
    }
    return EmailService.Instance!;
  }

  static async sendEmail(
    recipient: string,
    subject: string,
    textPart: string,
    htmlPart: string
  ): Promise<void> {
    try {
      const mailjet = EmailService.getInstance();

      const request = mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "gulshan.gupta@omlogic.co.in",
              Name: "Genesis",
            },
            To: [
              {
                Email: recipient,
              },
            ],
            Subject: subject,
            TextPart: textPart,
            HTMLPart: htmlPart, 
          },
        ],
      });

      await request;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
}

export default EmailService;
