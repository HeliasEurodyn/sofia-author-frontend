export class NotificationDTO {

  message: string;
  userToSendId: string;


  constructor(message: string, userToSend: string) {
    this.message = message;
    this.userToSendId = userToSend;
  }
}
