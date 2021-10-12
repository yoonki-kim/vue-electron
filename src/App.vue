<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      tester
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-card>
          <v-toolbar
            color="accent"
            dark
            dense
          >
            connect
          </v-toolbar>
          <v-card-text>
            text
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"
              @click="serverOpen"
            >
              열기
            </v-btn>
            <v-btn
              color="error"
              @click="serverClose"
            >
              닫기
            </v-btn>
            <v-btn @click="fileSave">
              File Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import net from 'net'
import fs from 'fs'
import { ipcRenderer } from 'electron'

  @Component
export default class App extends Vue {
  server: net.Server | null = null

  created () {
    // this.server = net.createServer((socket: net.Socket) => {
    //   console.log('connected')
    //   socket.on('data', (data) => {
    //     console.log(data)
    //   })
    //   socket.on('close', () => {
    //     console.log('closed')
    //   })
    // })

    // this.server.on('error', (err) => {
    //   throw err
    // })
    // this.server.listen(8124, () => {
    //   console.log('server bound')
    // })

    console.log(window.ipcRenderer)
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   console.log(arg) // prints "pong"
    // })
  }

  fileSave () {
    fs.writeFileSync('test.txt', 'yoonki.kim')
  }

  serverOpen () {
    ipcRenderer.send('asynchronous-message', 'ping')
  }

  serverClose () {
    //
  }
}
</script>

<style scoped>

</style>
