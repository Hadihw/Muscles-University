const dotenv = require("dotenv");
const express = require("express");
const admin = require("firebase-admin");
const https = require("https");
const fs = require("fs");
const cookieParser = require('cookie-parser');
const socket = require('./config/socket');

dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase_admin_SDK.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const messagesCollection = firestore.collection('messages');

// Read the SSL certificate files
const privateKey = fs.readFileSync("../config/development/server.key", "utf8");
const certificate = fs.readFileSync("../config/development/server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();

// Middleware to capture raw body or parse as JSON based on route
app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api/stripe/stripeWebhook')) {
    req.rawBody = '';
    req.on('data', (chunk) => {
      req.rawBody += chunk;
    });
    req.on('end', next);
  } else {
    express.json()(req, res, next);
  }
});

// Other Middleware
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
  next();
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/auth/google', require('./routes/googleAuthRoutes'));
app.use('/api/stripe', require('./routes/stripeRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messagesRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));

let server;

if (process.env.NODE_ENV === 'development') {
  server = app.listen(process.env.PORT || 8080, () => {
    console.log(`HTTP server listening on port ${process.env.PORT || 8080}!`);
  });
} else {
  server = https.createServer(credentials, app);
  server.listen(process.env.PORT || 8080, () => {
    console.log(`HTTPS server listening on port ${process.env.PORT || 8080}!`);
  });
}

// Initialize socket.io using the socket module
const io = socket.init(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  messagesCollection.onSnapshot((snapshot) => {
    const allMessages = snapshot.docs.map(doc => doc.data());
    const sortedMessages = allMessages.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
    socket.emit('messagesUpdate', sortedMessages);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});