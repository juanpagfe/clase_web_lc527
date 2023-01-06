const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('¿Cuál es tu nombre?')
appendMessage('Te uniste', 'message')
socket.emit('new-user', name)

socket.on('chat-message', data =>
{
  appendMessage(`${data.name}: ${data.message}`, 'incoming')
})

socket.on('user-connected', name =>
{
  appendMessage(`${name} se unió`, 'message')
})

socket.on('user-disconnected', name =>
{
  appendMessage(`${name} se desconectó`, 'message')
})

messageForm.addEventListener('submit', e =>
{
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`Tú: ${message}`, 'own')
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message, className)
{
  const messageElement = document.createElement('div')
  messageElement.className = className
  messageElement.innerText = message
  messageContainer.append(messageElement)
}