import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 3000;

const uri =
  "mongodb+srv://mota:GDo9HL3vnLMBd18u@chat.ub6gt.mongodb.net/?retryWrites=true&w=majority&appName=Chat";
const client = new MongoClient(uri);

let db;
let usersCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("Chat");
    usersCollection = db.collection("users");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

connectToDatabase();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//Отримати всі дані про користувачів
app.get("/users", async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//Отримати користувача за його id
app.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });
    const { _id, ...userData } = user;
    res.status(200).json(userData);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

//Отримати чат користувача за його id
app.get("/users/:id/:chatid", async (req, res) => {
  try {
    const userId = req.params.id;
    const Id = req.params.chatid;
    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });
    const { _id, first_name, last_name, ...userData } = user;
    const filteredData = Object.values(userData).flatMap((usersArray) =>
      usersArray.filter((user) => user.id === Id)
    );

    res.status(200).json(filteredData[0]);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.use(express.json());

//Оновити повідомлення
app.patch("/updateMSG/:id/:chatid", async (req, res) => {
  try {
    const userId = req.params.id;
    const chatId = req.params.chatid;
    const newMessage = req.body;

    const objectId = new ObjectId(userId);

    const user = await usersCollection.findOne({ _id: objectId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userToUpdate = user.users.find((u) => u.id === chatId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "Chat not found" });
    }
    userToUpdate.message.push(newMessage);
    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { users: user.users } }
    );

    res.status(200).json({
      message: "Message added successfully",
      updatedMessages: userToUpdate.message,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ message: "Error adding message" });
  }
});

//Оновити імя і прізвище
app.patch("/updateName/:id/:chatid", async (req, res) => {
  try {
    const userId = req.params.id;
    const chatId = req.params.chatid;
    const { first_name: firstName, last_name: lastName } = req.body;
    console.log(req.body);
    console.log(firstName);
    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required" });
    }
    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userToUpdate = user.users.find((u) => u.id === chatId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Chat not found" });
    }
    userToUpdate.first_name = firstName;
    userToUpdate.last_name = lastName;
    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { users: user.users } }
    );
    res.status(200).json({
      message: "Name updated successfully",
      updatedUser: userToUpdate,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
});

//Видалити чат
app.delete("/deleteChat/:id/:chatid", async (req, res) => {
  try {
    const userId = req.params.id;
    const chatId = req.params.chatid;
    if (!userId || !chatId) {
      return res
        .status(400)
        .json({ message: "User ID and Chat ID are required" });
    }

    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUsers = user.users.filter((u) => u.id !== chatId);

    if (updatedUsers.length === user.users.length) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { users: updatedUsers } }
    );

    res.status(200).json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Error deleting chat" });
  }
});

//Додавання нового чату
app.post("/addChat/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { chatId, first_name, last_name, avatar } = req.body;
    console.log(req.body);
    if (!userId || !chatId || !first_name || !last_name || !avatar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newChat = {
      id: chatId,
      first_name,
      last_name,
      avatar,
      message: [],
    };

    user.users.push(newChat);
    await usersCollection.updateOne(
      { _id: objectId },
      { $set: { users: user.users } }
    );

    res.status(201).json({
      message: "Chat added successfully",
      newChat,
    });
  } catch (error) {
    console.error("Error adding chat:", error);
    res.status(500).json({ message: "Error adding chat" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
