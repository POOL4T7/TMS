// import Mailjet, { Client } from "node-mailjet";

// // const Instance: Client = Mailjet.apiConnect(
// //   process.env.MAILJET_API_KEY || "",
// //   process.env.MAILJET_SECRET_KEY || ""
// // );

// class EmailService {
//   private static Instance: Client | null = null;

//   private constructor() {}

//   static async sendEmail(
//     recipient: string,
//     subject: string,
//     textPart: string,
//     html: string
//   ): Promise<void> {
//     try {
//       await Instance.post("send", { version: "v3.1" }).request({
//         Messages: [
//           {
//             From: {
//               Email: "gulshan.gupta@omlogic.co.in",
//               Name: "Gensis",
//             },
//             To: [
//               {
//                 Email: recipient,
//               },
//             ],
//             Subject: subject,
//             TextPart: textPart,
//             HTMLPart: html,
//           },
//         ],
//       });
//     } catch (e: any) {
//       throw new Error(e.message);
//     }
//   }
// }

// export default EmailService;
