import { FC } from "react";
import styles from "./header.module.css";

interface Props {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

const Header: FC<Props> = ({ setSearchQuery, searchQuery }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <header className={styles.header}>
      <div className={styles.Image_container}>
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhIQBw8NEBITEA8PEA8NDQ8OEQ8WFREWFhUTExYYHCgsGBolGxMVITEhJSkrLi4uGB8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCAwQGB//EADMQAQACAAQCCAYBAwUAAAAAAAABAgMEESFBUQUSIjEyYXGRUoGhscHwM2Jy0RNCQ6Lh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APogAAAAAAAAAAADRi5mKz2q2nfTWI1jub2FsKs+OInfXff97gaq5rWdIrb120j5uhrrg1jw1iOGzYAAAAAAAAAAAhKAZAAgAAAAAAAAAAAAE1rM7ViZnlEaggb4yeJ8E/PSGrEwrV/krMesAxAAAAAAAAAAQlAMgAQAAAAAAAADdlcCb207o75nkDDCwrWnTDjX8ervw+jI/wCW0zP9O0O3Cw4rGmHGkMgcM9GV12tbTjE6T9XZhYcVjTDiI9GQATHMAcmPkKW8HZny7vZXY+XtTxxtzjuleFoidrRExykHnh157KdTtYfhn/q5AAAAAAAEJQDIAEAAAAAAAALXoumlNfimfaNv8qpeZONKV9In33BtAAAAAAABji060TWeMaKDTm9Cos1Gl7R/VP3BrAAAAAAQlAMgAQAAAAAAAAvctPYrp8Nfsolt0Zia00n/AGzp8p3/AMg6wAAAAAAAFHnJ7dv7pXdraRMzwjVQWtrMzPGZn3BAAAAAACEoBkACAAAAAAAAFvksp1N5mdZjeOCprOkxPnEvQAAAAAAAAA05ytppMYUazO3LbipJjm9Co83Pbtp8Ug1AAAAAAISgGQAIAAAAAAABC7yWL1qRPGOzPrCldOSzX+nr1omYnlzBcDDAxOtWLRx4cmYAAAAAAItbSJmeETLz9p1mZnjOqxz+brNZrhTrMzpO07RCuAAAAAAAQlAMgAQAAAAAAAAACz6KxNprPCdY+f79Xco8ri9S0Tw7p9JXnoAAAAA15nF6tZt5bevBsVXSOY609WndH1kHGAAAAAAAAhKAZAAgAAAAAAAAAEPQ1jSIjyhR5fD61oiOca+nFegAAAAKDFjtT6z91+pc9h9W9vOetHzBoAAAAAAAAQlAMgAQAAAAAAMsPDm22HEz6Q6sPo68+OYr9ZBxt2Xy1r+CNvinu/8AVjg5ClfF2p8+72dXoDRlsrWnh3njMt4AAAAANWYwK3jS/wApjvhtAU2Yydqb98c4/PJzPROfGyVLcNJ512+gKYduJ0baP45ifXsy5cXCtX+SJj7e4MAAAAEJQDIAEAAITWJnau8ztC3ymTim94ibc++I9AV+DlL28MaRzttDuwejqx/JM2n2h2AIrWI2rERHKI0SAAAAAAAAAAAAABMa9+/qAOTG6PpbwdmfLu9nDjZK9eHWjnXf6LkB54XWZytbxvtPxR+eanxKTWZi/fAMUJQDIAEAA7uisHWZvPDaPXj++azaMjTq0r5xr7t4AAAAAAAAAAAAAAAAAAAADh6VwtYi8cNp9OH75u5hjU61ZrziYBQoSgGQAITSusxEcZiEOno6mt48tZ/fcFxEcgAAAAAAAAAAAAAAAAAAAAAAAUebp1b2jz1992l3dK00tE84+37DhBkACFh0TTxW9I/M/hXLjo2mlI85mfx+AdQAAAAAAAAAAAAAAAAAAAAAAAOLpWmtYnlP3/YVS8zlNaWjy19t/wAKMGQAC7yfgr/bAA3AAAAAAAAAAAAAAAAAAAAAAAAxxO6fSfsoABkAD//Z"
          alt="avatar"
          className={styles.avatar}
        />
        <button className={styles.login_BTN}>Log in</button>
      </div>
      <input
        className={styles.search}
        placeholder="Search or start new chat"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </header>
  );
};

export default Header;
