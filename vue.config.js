module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'com.andantesys.vue-electron',
        nsis: {
          shortcutName: 'myFirstApp'
        },
        win: {
          target: [
            {
              target: 'nsis',
              arch: [
                'x64',
                'ia32'
              ]
            }
          ]
        }
      },
      // nodeIntegration: true, // Be Careful!! SECURITY
      preload: 'src/preload.ts'
    }
  }
}
