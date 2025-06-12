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

export type NotificationType = "COMMENT" | "REPLY";
