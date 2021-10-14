<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      tester
      <v-spacer />
      <!-- <v-btn @click="!serverActive ? serverOpen() : serverClose()">
        {{ serverActive ? 'opened' : 'closed' }}
      </v-btn> -->
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
          >
            {{ serverActive ? 'opened' : 'closed' }}
          </v-btn>
        </template>

        <v-card
          v-if="!serverActive"
          @click="serverOpen"
        >
          <v-card-title>
            서버 연결
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="port"
              outlined
              label="포트"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="success"
              @click="serverOpen"
            >
              연결
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else
        >
          <v-card-title>
            서버 종료
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              @click="serverClose"
            >
              종료
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          <v-card-text>
            <v-list-item
              v-for="item in socketInfos"
              :key="item.id"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.id }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.ip }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SocketInfo } from '@/models/socket-info'

const ipcRenderer = window.ipcRenderer

  @Component
export default class App extends Vue {
  serverActive = false
  text = ''
  dialog = false
  port = 3000
  socketInfos: SocketInfo[] = []

  created () {
    this.init()
  }

  init () {
    // eslint-disable-next-line no-undef
    ipcRenderer.on('server', (event: Electron.IpcRendererEvent, active: boolean) => {
      this.serverActive = active
      console.log(active)
    })
    // eslint-disable-next-line no-undef
    ipcRenderer.on('socket', (event: Electron.IpcRendererEvent, status: string, data: string, ip: string) => {
      console.log('status: ', status)
      console.log('data: ', data)
      console.log('ip: ', ip)
      // this.text = status + ' ' + data + ' ' + ip + '\n' + this.text
      this.text = `${status} ${data} ${ip}\n${this.text}`
    })
    // eslint-disable-next-line no-undef
    ipcRenderer.on('socket-opened', (event: Electron.IpcRendererEvent, info: SocketInfo) => {
      console.log('socket-opened', info)
      this.socketInfos.push(info)
    })
    // eslint-disable-next-line no-undef
    ipcRenderer.on('socket-closed', (event: Electron.IpcRendererEvent, info: SocketInfo) => {
      console.log('socket-closed', info)
      const index = this.socketInfos.findIndex(s => s.id === info.id)
      this.socketInfos.splice(index, 1)
    })
  }

  serverOpen () {
    // window.ipcRenderer.send('asynchronous-message', 'ping')
    ipcRenderer.send('server-open', this.port)
    this.dialog = false
  }

  serverClose () {
    ipcRenderer.send('server-close')
    this.dialog = false
  }
}
</script>

<style scoped>

</style>
