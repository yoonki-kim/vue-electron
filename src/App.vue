<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      tester
      <v-spacer />
      <v-btn @click="!serverActive ? serverOpen() : serverClose()">
        {{ serverActive ? 'opened' : 'closed' }}
      </v-btn>
      <v-btn icon>
        <v-icon>{{ serverActive ? 'mdi-lan-connect' : 'mdi-lan-disconnect' }} </v-icon>
      </v-btn>
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
            <v-textarea
              v-model="text"
              outlined
              label="packet"
            />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const ipcRenderer = window.ipcRenderer

  @Component
export default class App extends Vue {
  serverActive = false
  text = ''

  created () {
    this.init()
  }

  fileSave () {
    //
  }

  init () {
    // eslint-disable-next-line no-undef
    ipcRenderer.on('server', (event: Electron.IpcRendererEvent, active: boolean) => {
      console.log(active)
      this.serverActive = active
    })
    // eslint-disable-next-line no-undef
    ipcRenderer.on('socket', (event: Electron.IpcRendererEvent, status: string, data: string, ip: string) => {
      console.log('status: ', status)
      console.log('data: ', data)
      console.log('ip: ', ip)
      // this.text = status + ' ' + data + ' ' + ip + '\n' + this.text
      this.text = `${status} ${data} ${ip}\n${this.text}`
    })
  }

  serverOpen () {
    // window.ipcRenderer.send('asynchronous-message', 'ping')
    ipcRenderer.send('server', 'open')
  }

  serverClose () {
    ipcRenderer.send('server', 'close')
  }
}
</script>

<style scoped>

</style>
