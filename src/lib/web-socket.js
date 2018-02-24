import socketIO from 'socket.io'

let io = {}

export function getIO () {
  return io
}

export function initSocketIO (server) {
  io = socketIO(server)
}
