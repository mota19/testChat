import { FC, useState } from "react";
import styles from "./ModalWindow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../Redux/Slices/userSlice";
import { usePatchnameMutation } from "../Redux/Api/usersApi";
import { useAddChatMutation } from "../Redux/Api/usersApi";
import { RootState } from "../Redux/Store/store";

interface ModalWindowProps {
  setIsOpen: (isOpen: boolean) => void;
  first_name: string;
  last_name: string;
  mode: "update" | "add";
}

const ModalWindow: FC<ModalWindowProps> = ({
  setIsOpen,
  first_name,
  last_name,
  mode,
}) => {
  const dispatch = useDispatch();
  const chatId = useSelector((state: RootState) => state.user.chatId);
  const userId = useSelector((state: RootState) => state.user.userId);

  const [newFirstName, setNewFirstName] = useState(first_name);
  const [newLastName, setNewLastName] = useState(last_name);

  const [addChat] = useAddChatMutation();
  const [patchname] = usePatchnameMutation();

  const [newChatId, setNewChatId] = useState("");
  const [newChatFirstName, setNewChatFirstName] = useState("");
  const [newChatLastName, setNewChatLastName] = useState("");
  const [newChatAvatar, setNewChatAvatar] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFirstName && newLastName) {
      dispatch(
        changeName({ first_name: newFirstName, last_name: newLastName })
      );
      setIsOpen(false);
      handlePatchName(newFirstName, newLastName);
    }
  };

  const handlePatchName = async (first_name: string, last_name: string) => {
    await patchname({
      id: userId,
      chatId: chatId,
      first_name: first_name,
      last_name: last_name,
    });
  };

  const handleAddChat = async () => {
    if (newChatId && newChatFirstName && newChatLastName && newChatAvatar) {
      try {
        await addChat({
          id: userId,
          chatId: newChatId,
          first_name: newChatFirstName,
          last_name: newChatLastName,
          avatar: newChatAvatar,
        }).unwrap();
        setIsOpen(false);
      } catch (error) {
        console.error("Error adding chat:", error);
      }
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent && !modalContent.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.modal} onClick={handleClickOutside}>
      <div id="modal-content" className={styles.modalContent}>
        {mode === "update" ? (
          <form onSubmit={handleSubmit}>
            <p>Change name</p>
            <input
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              placeholder={first_name}
            />
            <input
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              placeholder={last_name}
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddChat();
            }}
          >
            <p>Add New Chat</p>
            <input
              value={newChatId}
              onChange={(e) => setNewChatId(e.target.value)}
              placeholder="Chat ID"
            />
            <input
              value={newChatFirstName}
              onChange={(e) => setNewChatFirstName(e.target.value)}
              placeholder="First Name"
            />
            <input
              value={newChatLastName}
              onChange={(e) => setNewChatLastName(e.target.value)}
              placeholder="Last Name"
            />
            <input
              value={newChatAvatar}
              onChange={(e) => setNewChatAvatar(e.target.value)}
              placeholder="Avatar URL"
            />
            <button type="submit">Add Chat</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
