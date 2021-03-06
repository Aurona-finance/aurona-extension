const path = require('path')

const resolve = item => {
  return path.join(__dirname, '../', item)
}
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    // '@storybook/preset-create-react-app',
    // '@storybook/addon-actions/register',
    // '@storybook/addon-knobs/register',
    // '@storybook/addon-viewport/register',
    // '@storybook/addon-storysource'
  ],

  core: {
    builder: 'webpack5'
  },
  webpackFinal: config => {
    console.log(config.resolve.alias)
    Object.assign(config.resolve.alias, {
      '@static': resolve('src/static'),
      '@components': resolve('src/components'),
      '@containers': resolve('src/containers'),
      '@pages': resolve('src/pages'),
      '@web3': resolve('src/web3'),
      '@reducers': resolve('src/store/reducers'),
      '@selectors': resolve('src/store/selectors'),
      '@sagas': resolve('src/store/sagas'),
      '@consts': resolve('src/store/consts')
    })
    console.log(config.resolve.alias)

    // config.node = {
    //   fs: 'empty',
    //   tls: 'empty',
    //   net: 'empty',
    //   module: 'empty',
    //   console: true
    // }
    return config
  }
}
