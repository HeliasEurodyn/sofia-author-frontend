export class SseNotificationResponseDTO {

  message: string
  userToSendId: string


  constructor(message: string, userToSendId: string) {
    this.message = message;
    this.userToSendId = userToSendId;
  }
}
