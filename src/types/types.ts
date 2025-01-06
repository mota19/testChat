export interface Message {
  message: string | "";
  date: string;
  sender: "user" | "you";
}

export interface User {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  message: Message[];
}

export interface Conversation {
  _id: string;
  users: User[];
  first_name: string;
  last_name: string;
}
