import { Injectable } from '@angular/core';

declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(message: string, options: Partial<AlertOptions>) {
    alertify.set('notifier', 'delay', 3);
    alertify.set('notifier', 'position', options.position);
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers) {
      msj.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomLeft;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Message = 'message',
  Notify = 'notify',
}

export enum Position {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  TopCenter = 'top-center',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  BottomCenter = 'bottom-center',
}
