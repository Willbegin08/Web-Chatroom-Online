const socket = io();
const form = document.querySelector("#form")
const username = document.querySelector("#username")
const input = document.querySelector("#input")

function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(username.value != '' && input.value != '') {
        socket.emit('message', {username: username.value, message: input.value})
        input.value = ""
    }
})

socket.on('message', (msg) => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.classList.add("username")
    span.style.color = getRandomHexColor()
    span.textContent = msg.username
    li.appendChild(span)
    li.append(`: ${msg.message}`)
    document.querySelector("#messages").appendChild(li)
})

