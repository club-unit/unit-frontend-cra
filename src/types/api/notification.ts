export interface Notification {
  id: number;
  notificationId: number;
  type: NotificationType;
  isRead: boolean;
  title: string;
  extraText: string;
  content: string;
  url: string;
  createdDatetime: string;
}

export interface NotificationsNumUnreads {
  numUnreads: number;
}

export type NotificationType = "COMMENT" | "REPLY";
