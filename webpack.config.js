resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      global: require.resolve("global")
    })
  ]
  