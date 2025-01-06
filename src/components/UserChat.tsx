import { ChangeEvent, FC, FormEvent, useState, useEffect } from "react";
import styles from "./UserChat.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store";
import {
  useGetChatQuery,
  usePatchMessageMutation,
} from "../Redux/Api/usersApi";
import { Message } from "../types/types";

const UserChat: FC = () => {
  const chatId = useSelector((state: RootState) => state.user.chatId);
  const userId = useSelector((state: RootState) => state.user.userId);
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    data: user,
    isLoading,
    isError,
  } = useGetChatQuery({
    id: userId,
    chatId: chatId,
  });

  const [patchMessage] = usePatchMessageMutation();

  useEffect(() => {
    if (user && user.message) {
      setMessages(user.message);
    }
  }, [user]);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUpdateMessage = async (message: Message) => {
    await patchMessage({
      id: userId,
      chatId: chatId,
      updatedData: message,
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const date = new Date();
    const msg: Message = {
      message: inputValue,
      date: date.toISOString(),
      sender: "you",
    };
    if (inputValue !== "") {
      setMessages((prevMessages) => [...prevMessages, msg]);
      handleUpdateMessage(msg);
    }

    setInputValue("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading users</div>;
  }

  return (
    <section className={styles.container}>
      <div className={styles.nicknameContainer}>
        <img src={user?.avatar} alt="avatar" className={styles.avatar} />
        <h3>
          {user?.first_name} {user?.last_name}
        </h3>
      </div>
      <div className={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.MessageContainer}>
            {msg.sender === "user" && (
              <img
                src={user?.avatar}
                alt="avatar"
                className={styles.msgAvatar}
              />
            )}
            <p
              className={`${styles.message} ${
                msg.sender === "user" ? styles.userMessage : styles.yourMessage
              }`}
            >
              {msg.message}
            </p>
            <p
              className={` ${
                msg.sender === "user" ? styles.userdate : styles.yourdate
              }`}
            >
              {msg.date}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.searchBarContainer}>
        <form className={styles.searchBar} onSubmit={submitHandler}>
          <input
            placeholder="Type your message"
            className={styles.search}
            value={inputValue}
            onChange={inputHandler}
          />
          <img
            src="https://static.thenounproject.com/png/61680-200.png"
            alt="Send"
          />
        </form>
      </div>
    </section>
  );
};

export default UserChat;
