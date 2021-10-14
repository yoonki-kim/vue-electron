import { ipcMain } from 'electron'
import net from 'net'
import ExSocket from './ex-socket'

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

let server: net.Server | null = null
const exSockets = []

ipcMain.on('server-open', (event, port) => {
  // console.log(server)
  if (server) return event.reply('server', !!server)
  server = net.createServer((socket: net.Socket) => {
    console.log(socket)
    console.log('socket opened')
    event.reply('socket', 'opened', null)

    const exSocket = new ExSocket(socket)
    console.log(exSocket)
    exSockets.push(exSocket)
    event.reply('socket-opened', exSocket.info)

    socket.on('data', (data) => {
      console.log(data)
      console.log('received data: ', data.toString())
      event.reply('socket', 'data', data.toString().trim(), socket.remoteAddress)
    })

    socket.on('close', () => {
      console.log('socket closed')
      event.reply('socket', 'closed', null)
      event.reply('socket-closed', exSocket.info)
    })
  })
  server.listen(port)
  console.log(`server listening: ${port}`)
  event.reply('server', !!server)
})

ipcMain.on('server-close', (event) => {
  // console.log(server)
  if (!server) return event.reply('server', !!server)
  server.close()
  server = null
  console.log('server closed')
  event.reply('server', !!server)
})
