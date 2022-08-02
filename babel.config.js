module.exports = {
  presets: [
      '@vue/cli-plugin-babel/preset',
      ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
      [
          "component",
          {
              libraryName: "element-ui",
              //   styleLibraryName: "~src/style/theme/index.css"
                styleLibraryName: "theme-chalk"
              // styleLibraryName:'~element-#8064A9'
          }
      ]
  ]
}
