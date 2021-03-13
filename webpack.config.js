const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const resolve = item => {
  return path.join(__dirname, item)
}
const ExtensionReloader = require('webpack-extension-reloader')
const config = {
  entry: {
    popup: path.join(__dirname, 'src/popup.tsx'),
    inject: path.join(__dirname, 'src/scripts/inject.ts'),
    background: path.join(__dirname, 'src/scripts/background.ts'),
    content: path.join(__dirname, 'src/scripts/content.ts')
  },
  output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|gif)$/,
        use: 'file-loader'
      },
      // {
      //   test: /\.(png|jpe?g|gif|jp2|webp)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: 'images/[name].[ext]'
      //   }
      // },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  resolve: {
    // fallback: {
    //   crypto: require.resolve('crypto-browserify'),
    //   stream: require.resolve('stream-browserify')
    // },
    fallback: {
      fs: false
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@sb': resolve('.storybook'),
      '@static': resolve('src/static'),
      '@components': resolve('src/components'),
      '@containers': resolve('src/containers'),
      '@pages': resolve('src/pages'),
      '@web3': resolve('src/web3'),
      '@reducers': resolve('src/store/reducers'),
      '@selectors': resolve('src/store/selectors'),
      '@sagas': resolve('src/store/sagas'),
      '@consts': resolve('src/store/consts')
    }
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    // Does not work when injecting
    // Uncaught Error: This script should only be loaded in a browser extension
    // new ExtensionReloader(),
    new NodePolyfillPlugin(),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser'
    // }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' },
        { from: 'buildStatic/prod', to: '.' }
      ]
    })
  ]
}
const configDev = {
  entry: {
    popup: path.join(__dirname, 'src/popup.tsx'),
    inject: path.join(__dirname, 'src/scripts/inject.ts'),
    background: path.join(__dirname, 'src/scripts/background.ts'),
    content: path.join(__dirname, 'src/scripts/content.ts')
  },
  output: { path: path.join(__dirname, 'dist'), filename: '[name].js' },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/react',
            {
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.(svg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  resolve: {
    // fallback: {
    //   crypto: require.resolve('crypto-browserify'),
    //   stream: require.resolve('stream-browserify')
    // },
    fallback: {
      fs: false
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@sb': resolve('.storybook'),
      '@static': resolve('src/static'),
      '@components': resolve('src/components'),
      '@containers': resolve('src/containers'),
      '@pages': resolve('src/pages'),
      '@web3': resolve('src/web3'),
      '@reducers': resolve('src/store/reducers'),
      '@selectors': resolve('src/store/selectors'),
      '@sagas': resolve('src/store/sagas'),
      '@consts': resolve('src/store/consts')
    }
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    // Does not work when injecting
    // Uncaught Error: This script should only be loaded in a browser extension
    new ExtensionReloader(),
    new NodePolyfillPlugin(),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser'
    // }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' },
        { from: 'buildStatic/dev', to: '.' }
      ]
    })
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    console.log(argv)

    return configDev
  } else {
    return config
  }
}
