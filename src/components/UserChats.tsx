import { FC, useState, MouseEvent, useEffect } from "react";
import styles from "./UserChats.module.css";
import { useGetUserQuery } from "../Redux/Api/usersApi";
import { useDispatch } from "react-redux";
import { changechatId } from "../Redux/Slices/userSlice";
import ModalWindow from "./ModalWindow";
import { useDeleteChatMutation } from "../Redux/Api/usersApi";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  searchQuery: string;
}

const UserChats: FC<Props> = ({ searchQuery }) => {
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"update" | "add">("add");
  const [userId] = useState<string>("67784d6296626b889b7b5547");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const chatId = useSelector((state: RootState) => state.user.chatId);
  const dispatch = useDispatch();

  const {
    data: user,
    isLoading: Loading,
    isError: Error,
  } = useGetUserQuery({
    id: userId,
  });

  const [deleteChat] = useDeleteChatMutation();

  const clickHandler = (e: MouseEvent, id: string) => {
    dispatch(changechatId({ userId, chatId: id }));
  };

  const clickHandlerModal = (
    e: MouseEvent,
    first_name: string,
    last_name: string
  ) => {
    setIsModalOpen(true);
    setNewFirstName(first_name);
    setModalMode("update");
    setNewLastName(last_name);
    setIsMenuOpen(false);
  };

  const rightClickFunction = (
    e: MouseEvent,
    first_name: string,
    last_name: string,
    chatId: string
  ) => {
    e.preventDefault();
    dispatch(changechatId({ userId, chatId }));
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setIsMenuOpen(true);
    setNewFirstName(first_name);
    setNewLastName(last_name);
  };

  const handleDelete = async (chatId: string) => {
    try {
      await deleteChat({ id: userId, chatId }).unwrap();
      console.log("Chat deleted successfully");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleClickOutside = (e: Event) => {
    if (
      menuPosition &&
      !document.getElementById("context-menu")?.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuPosition]);

  if (Loading) {
    return <div>Loading...</div>;
  }

  if (Error) {
    return <div>Error loading users</div>;
  }

  const filteredUsers = user?.users?.filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchQuery)
  );

  return (
    <aside className={styles.container}>
      <h2 className={styles.Chats}>Chats</h2>

      {filteredUsers &&
        filteredUsers.map((user) => {
          return (
            <div
              key={user.id}
              onClick={(e) => clickHandler(e, user.id)}
              className={styles.userContainer}
              onContextMenu={(e) =>
                rightClickFunction(e, user.first_name, user.last_name, user.id)
              }
            >
              <div className={styles.cont}>
                <img src={user.avatar} alt="user" className={styles.avatar} />
                <div className={styles.nameContainer}>
                  <div className={styles.timeName}>
                    <h3>
                      {user.first_name} {user.last_name}
                    </h3>
                    <p>{user.message[user.message.length - 1].date}</p>
                  </div>

                  <p className={styles.name}>
                    {user.message[user.message.length - 1].message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      {isMenuOpen && menuPosition && (
        <div
          id="context-menu"
          className={styles.contextMenu}
          style={{
            left: `${menuPosition.x + 5}px`,
            top: `${menuPosition.y + 5}px`,
          }}
        >
          <ul>
            <li
              onClick={(e) => clickHandlerModal(e, newFirstName, newLastName)}
            >
              Update
            </li>
            <li onClick={() => handleDelete(chatId)}>Delete</li>
            <li
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
                setModalMode("add");
              }}
            >
              Add Chat
            </li>
          </ul>
        </div>
      )}
      {isModalOpen && (
        <ModalWindow
          setIsOpen={setIsModalOpen}
          first_name={newFirstName}
          last_name={newLastName}
          mode={modalMode}
        />
      )}
    </aside>
  );
};

export default UserChats;
