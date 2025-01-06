import { FC, useState } from "react";
import Header from "../layout/header";
import UserChats from "../components/UserChats";
import UserChat from "../components/UserChat";
import styles from "./Chat.module.css";

const Chat: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.usersChatsContainer}>
        <Header setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
        <UserChats searchQuery={searchQuery}></UserChats>
      </div>
      <UserChat />
    </div>
  );
};

export default Chat;
