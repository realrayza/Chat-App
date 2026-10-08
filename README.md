# Chat App

# MERN Chat App

A real-time private messaging application built with the **MERN stack** and **Socket.IO**.

The app allows users to create accounts, connect with contacts using unique user IDs, exchange private messages in real time, view conversation history, track unread messages, and receive browser notifications.

## 🚀 Features

* 🔐 User authentication with JWT
* 👤 Unique user ID for each account
* 💬 Private one-to-one messaging
* ⚡ Real-time messaging with Socket.IO
* 💾 Persistent message storage with MongoDB
* 👥 Contact-based conversations
* 📖 Conversation history
* 📬 Read/unread message status
* 🔔 Browser notifications
* 📱 Responsive interface
* 🌐 Local network support for testing across devices
* 🔒 Password hashing with bcrypt
* 🛡️ Protected API routes
* 🔄 Real-time message delivery to sender and receiver

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Context API
* `useReducer`
* Socket.IO Client
* Fetch API
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JSON Web Token (JWT)
* bcrypt
* CORS

## 📁 Project Structure

```text
chat-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
dbURL=mongodb://localhost:27017/chatapp
SECRET=your_jwt_secret
frontEnd=http://localhost:5173
```

For development across devices on the same local network, the frontend URL can use your computer's local IP:

```env
frontEnd=http://YOUR_LOCAL_IP:5173
```

For example:

```env
frontEnd=http://192.168.1.10:5173
```

> Never commit your `.env` file to GitHub.

Add it to `.gitignore`:

```gitignore
.env
node_modules
```

## ▶️ Running the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:4000
```

## 🔄 Real-Time Messaging

The application uses **Socket.IO** to deliver messages without requiring the user to refresh the page.

When a user sends a message:

```text
Sender
   │
   │ HTTP request
   ▼
Express API
   │
   ├── Save message to MongoDB
   │
   └── Emit Socket.IO event
            │
            ▼
       Receiver's room
            │
            ▼
       New message
```

Each user joins a private Socket.IO room based on their unique user ID.

For example:

```text
I234@chat.io
```

This allows the server to send a private message directly to the intended user.

## 💬 Message Flow

Messages are stored in MongoDB with information such as:

```js
{
  senderId: String,
  receiverId: String,
  text: String,
  isUnknownContact: Boolean,
  readAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

The application stores user IDs rather than names in messages. This prevents messages from becoming outdated if a user's display name changes.

## 👥 Contacts

Users can communicate with contacts using their unique user ID.

The backend verifies the relationship between the sender and receiver before treating a message as a known contact conversation.

Messages can also be identified as belonging to an unknown contact.

## 📖 Read Status

Messages support read/unread tracking.

When a user opens a conversation, the application can update messages between the two users as read.

This allows the interface to display unread message counts before a conversation is opened.

## 🔔 Browser Notifications

The application supports browser notifications for incoming messages.

Notification permission must be granted by the user before notifications can be displayed.

For production deployments, browser notification features require a secure origin such as HTTPS.

## 📱 Testing on a Phone

During local development, the application can be accessed from another device connected to the same Wi-Fi network.

Instead of:

```text
http://localhost:5173
```

use your computer's local IP address:

```text
http://YOUR_LOCAL_IP:5173
```

The backend must also be reachable through the computer's local IP.

For example:

```env
frontEnd=http://192.168.1.10:5173
```

Your firewall may also need to allow connections to the development ports.

## 🌐 Production

For production deployment, configure separate environment variables for the frontend and backend.

Example:

```env
dbURL=your_mongodb_connection_string
SECRET=your_secure_jwt_secret
frontEnd=https://your-frontend-domain.com
```

Make sure:

* MongoDB is accessible by the backend
* CORS allows the production frontend
* Socket.IO connects to the production backend
* HTTPS is enabled
* Secrets are stored as environment variables
* `.env` is not committed to GitHub

## 🔒 Security

The application uses several security mechanisms:

* JWT authentication
* Password hashing with bcrypt
* Protected API endpoints
* CORS configuration
* Environment variables for secrets
* Contact validation
* Server-side message ownership checks

### Important

Do not place secrets directly inside the source code.

Bad:

```js
const SECRET = "my-secret";
```

Good:

```js
const SECRET = process.env.SECRET;
```

## 🧪 Development

The project was developed with a focus on understanding the complete flow of a real-time MERN application:

```text
React
  ↓
Express API
  ↓
MongoDB
  ↑
Socket.IO
  ↑
React
```

HTTP requests are used for operations such as authentication, fetching message history, and saving messages, while Socket.IO handles real-time delivery.

## 🗺️ Future Improvements

Potential improvements include:

* [ ] Typing indicators
* [ ] Online/offline presence
* [ ] Last seen status
* [ ] Message delivery status
* [ ] Message editing
* [ ] Message deletion
* [ ] Image/file sharing
* [ ] Voice messages
* [ ] Group conversations
* [ ] Push notifications
* [ ] End-to-end encryption
* [ ] Message search
* [ ] Pagination/infinite scrolling
* [ ] Improved notification controls

## 📄 License

This project is currently available for learning and development purposes.

---

Built with **React, Node.js, Express, MongoDB, and Socket.IO**.


