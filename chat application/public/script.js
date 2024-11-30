const ws = new WebSocket("ws://localhost:8080");

let currentRoom = null;
let username = null;

document.getElementById("join-chat").addEventListener("click", () => {
  username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Username is required!");
    return;
  }
  document.getElementById("username-section").style.display = "none";
  document.getElementById("chat-section").style.display = "block";
  ws.send(JSON.stringify({ type: "join", username }));
});

document.getElementById("create-room").addEventListener("click", () => {
  const roomName = document.getElementById("new-room").value.trim();
  if (!roomName) {
    alert("Room name is required!");
    return;
  }
  ws.send(JSON.stringify({ type: "create-room", roomName }));
});

document.getElementById("send-message").addEventListener("click", () => {
  const message = document.getElementById("message").value.trim();
  if (!message) {
    alert("Message cannot be empty!");
    return;
  }
  ws.send(JSON.stringify({ type: "message", room: currentRoom, username, message }));
  document.getElementById("message").value = "";
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "room-list") {
    const roomList = document.getElementById("room-list");
    roomList.innerHTML = "";
    data.rooms.forEach(room => {
      const li = document.createElement("li");
      li.textContent = room;
      li.addEventListener("click", () => joinRoom(room));
      roomList.appendChild(li);
    });
  }

  if (data.type === "message") {
    const messageDisplay = document.getElementById("message-display");
    const messageElement = document.createElement("p");
    messageElement.textContent = `[${data.timestamp}] ${data.username}: ${data.message}`;
    messageDisplay.appendChild(messageElement);
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
  }
};

function joinRoom(room) {
  currentRoom = room;
  document.getElementById("room-title").textContent = `Room: ${room}`;
  document.getElementById("chat-room").style.display = "block";
  ws.send(JSON.stringify({ type: "join-room", room, username }));
}
