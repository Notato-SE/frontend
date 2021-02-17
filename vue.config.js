module.exports = {
  transpileDependencies: ["vuetify"],
  
  devServer: {
    proxy: {
      'http://converter.doxxie.live': {
        target: 'http://converter.doxxie.live',
        ws: true,
        changeOrigin: true
      }
    }
  },
};
