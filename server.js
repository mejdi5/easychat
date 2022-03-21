const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors')
const morgan = require("morgan");
const path = require('path')
const colors = require("colors");
const dotenv = require("dotenv");



app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}))
app.use(express.json());
app.use(morgan("common"));

app.use('/public', express.static('public'));

app.use("/api/users", require('./routes/userRoute'));
app.use("/api/messages", require('./routes/messageRoute'));
app.use("/api/conversations", require('./routes/conversationRoute'));
app.use("/api/pictures", require('./routes/pictureRoute'));
app.use("/api/groupConversations", require('./routes/groupConversationRoute'));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

//connect database
dotenv.config({ path: './config/.env' });
  try {
    mongoose.connect('mongodb+srv://mejdi:abcdefgh@cluster0.s6ks3.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected...`.blue.bold);
  } catch (error) {
    console.log(`Database is not connected...`.red.bold);
  }

const port = process.env.PORT || 5000
const server = app.listen(port, () => 
  console.log(`server is running on port ${port}`.yellow) 
  )

//socket
const io = require("socket.io")(server, {
  cors: {
    origin: "*", //http://localhost:3000 
  },
});

let Users = [];

const addUser = (userId, socketId) => {
    !Users.some((user) => user.userId === userId) &&
    Users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    Users = Users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.", Users);

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", Users);
    });

    //send and get message
    socket.on("sendMessage", ({
        newMessage,
        conversation,
        senderId, 
        receiverId,
        text}) => {
    const user = Users?.find(u => u.userId === receiverId);
    io.to(user?.socketId).emit("getMessage", newMessage)
    io.to(user?.socketId).emit("getNotification", {
        chatId: conversation,
        from: senderId,
        content: text
    })
    });

    //send and get public message
    socket.on("sendPublicMessage", ({ 
        conversation,
        senderId,
        members,
        text }) => {
    const onlineMembers = Users?.filter(user => members.includes(user.userId))
    onlineMembers.filter(m => m !== senderId).map(m => 
        io.to(m.socketId).emit("getPublicMessage", {
        conversation,
        senderId,
        members,
        text
        })
    )
    onlineMembers.filter(m => m !== senderId).map(m => 
        io.to(m.socketId).emit("getPublicNotification", {
        chatId: conversation,
        from: senderId,
        content: text
        })
    )}
    );

    //disconnect
    socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", Users);
    });
});
