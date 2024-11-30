const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const rooms = {};
const users = {};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "join") {
      users[ws] = data.username;
      ws.send(JSON.stringify({ type: "room-list", rooms: Object.keys(rooms) }));
    }

    if (data.type === "create-room") {
      rooms[data.roomName] = [];
      broadcast({ type: "room-list", rooms: Object.keys(rooms) });
    }

    if (data.type === "join-room") {
      rooms[data.room].push(ws);
      ws.room = data.room;
    }

    if (data.type === "message") {
      const roomUsers = rooms[data.room];
      roomUsers.forEach(userWs => {
        userWs.send(JSON.stringify({ 
          type: "message", 
          username: data.username, 
          message: data.message, 
          timestamp: new Date().toLocaleTimeString() 
        }));
      });
    }
  });

  ws.on("close", () => {
    delete users[ws];
    if (ws.room) {
      rooms[ws.room] = rooms[ws.room].filter(userWs => userWs !== ws);
    }
  });
});

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
