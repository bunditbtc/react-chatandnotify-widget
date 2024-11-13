module.exports = {
  plugins: [
    require('postcss-import')({
      functions: {
        myCustomFunction(color) {
          return (root, result) => {
            root.walkRules(rule => {
              rule.style.color = color;
            });
          };
        }
      }
    })
  ]
};