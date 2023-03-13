module.exports = {
    plugins: {
      'postcss-pxtorem': {
        //以iphone6作为标准屏
        rootValue: 37.5,
        propList: ['*']
      },
    },
};