const chats = [
  { id: 1, name: '  Tushar', message: 'Hello, I need help with my order.', time: '10:30 AM' },
  { id: 2, name: 'Virat', message: 'Can you assist me?', time: '9:15 AM' },
  { id: 3, name: 'Aryan', message: 'Issue with the product.', time: 'Yesterday' },
];

let activeChat = null;

const contentArea = document.getElementById('contentArea');
const profileModal = document.getElementById('profileModal');

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggleSidebar');
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  toggleBtn.textContent = sidebar.classList.contains('collapsed') ? '→' : '←';
});

// Profile modal
document.getElementById('profileBtn').addEventListener('click', () => {
  profileModal.style.display = 'flex';
});
document.getElementById('closeProfile').addEventListener('click', () => {
  profileModal.style.display = 'none';
});
profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) {
    profileModal.style.display = 'none';
  }
});

// Function to render chat list
function renderChatList() {
  contentArea.innerHTML = '';
  const listDiv = document.createElement('div');
  listDiv.className = 'chat-list';

  chats.forEach(chat => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'chat-item';

    itemDiv.innerHTML = `
      <div class="chat-info">
        <div class="chat-name">${chat.name}</div>
        <div class="chat-message">${chat.message}</div>
      </div>
      <div class="chat-time">${chat.time}</div>
    `;

    itemDiv.onclick = () => {
      renderChatWindow(chat);
    };

    listDiv.appendChild(itemDiv);
  });

  contentArea.appendChild(listDiv);
}

// Function to render chat window
function renderChatWindow(chat) {
  activeChat = chat;
  contentArea.innerHTML = '';

  const chatDiv = document.createElement('div');
  chatDiv.className = 'chat-window';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'chat-header';

  const backBtn = document.createElement('button');
  backBtn.textContent = '← Back';
  backBtn.onclick = renderChatList;

  const title = document.createElement('h3');
  title.textContent = chat.name;

  headerDiv.appendChild(backBtn);
  headerDiv.appendChild(title);
  chatDiv.appendChild(headerDiv);

  const messagesDiv = document.createElement('div');
  messagesDiv.className = 'messages';

  const messages = [
    { sender: 'user', text: 'Hi, I need help.' },
    { sender: 'bot', text: 'Sure! How can I assist you today?' }
  ];

  function renderMessages() {
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'message ' + (msg.sender === 'user' ? 'user' : 'bot');
      msgDiv.innerText = msg.text;
      messagesDiv.appendChild(msgDiv);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  renderMessages();

  const inputArea = document.createElement('div');
  inputArea.className = 'input-area';

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.placeholder = 'Type your message...';

  const sendBtn = document.createElement('button');
  sendBtn.innerHTML = '&#9658;';
  sendBtn.title = 'Send';

  inputArea.appendChild(inputField);
  inputArea.appendChild(sendBtn);

  function sendMessage() {
    const text = inputField.value.trim();
    if (text !== '') {
      messages.push({ sender: 'user', text });
      renderMessages();
      inputField.value = '';
      setTimeout(() => {
        messages.push({ sender: 'bot', text: 'Thanks for your message!' });
        renderMessages();
      }, 1000);
    }
  }

  sendBtn.onclick = sendMessage;
  inputField.onkeydown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  chatDiv.appendChild(messagesDiv);
  chatDiv.appendChild(inputArea);

  contentArea.appendChild(chatDiv);
}

// Initial render
renderChatList();
