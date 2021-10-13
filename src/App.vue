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

  @Component
export default class App extends Vue {
  created () {
    console.log('debug here...', window.ipcRenderer)
  }

  fileSave () {
    //
  }

  serverOpen () {
    //
  }

  serverClose () {
    //
  }
}
</script>

<style scoped>

</style>
