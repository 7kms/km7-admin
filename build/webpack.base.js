'use strict';

const path = require('path')
const pathConfig = require('./pathConfig')
const isProduct = process.env.NODE_ENV === 'production'
const resolve = path.resolve
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


// https://webpack.js.org/configuration/
const config = {
    target: 'electron-renderer',
    resolve:{
        extensions: [".js", ".json", ".jsx", ".ts"],
        alias: {
            '~lib': `${pathConfig.appSrc}/lib`,
            '~utils': `${pathConfig.appSrc}/utils`,
            '~service': `${pathConfig.appSrc}/service`,
            '~config': `${pathConfig.appSrc}/config`,
            '~data': `${pathConfig.appSrc}/data`,
            '~actions': `${pathConfig.appSrc}/redux/actions`,
            '~components': `${pathConfig.appSrc}/components`,
            '~less': `${pathConfig.appSrc}/assets/less`,
            "~images": `${pathConfig.appSrc}/assets/images`
          },
    },
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                include: pathConfig.appSrc,
                enforce: 'pre',
                loader: require.resolve('eslint-loader')
            },
            {
                oneOf: [
                  {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/,/\.ico$/],
                    loader: require.resolve('url-loader'),
                    options: {
                      limit: 512,
                      name: pathConfig.generageStaticPath('img/[name].[hash:6].[ext]'),
                    },
                  },
                  {
                    test: [/manifest.json$/],
                    loader: require.resolve('file-loader'),
                    options: {
                      publicPath: '/',
                      name: pathConfig.generageStaticPath('[name].[ext]?v=[hash:6]'),
                    }
                  },
                  {
                    test: /.css$/,
                    include: /node_modules/,
                    // resourceQuery: 'inline',
                    use: [
                        MiniCssExtractPlugin.loader,
                        require.resolve('css-loader')
                    ]
                  },
                  {
                    test: /.less$/,
                    include: /node_modules/,
                    // resourceQuery: 'inline',
                    use: [
                        MiniCssExtractPlugin.loader,
                        require.resolve('css-loader'),
                        {
                          loader: require.resolve('postcss-loader'),
                          options: {
                            ident: 'postcss',
                            plugins: () => [
                              require('autoprefixer')({
                                browsers: [
                                  '>10%',
                                  'last 2 versions',
                                  'Firefox ESR',
                                  'not ie < 9', // React doesn't support IE8 anyway
                                ]
                              })
                            ]
                          }
                        },
                        
                        require.resolve('less-loader'),
                    ]
                  },
                  // Process JS with Babel.
                  {
                    test: /\.(js|jsx|mjs)$/,
                    include: pathConfig.appSrc,
                    loader: require.resolve('babel-loader'),
                    options: isProduct ? {
                      compact: true,
                    } : {
                      // This is a feature of `babel-loader` for webpack (not Babel itself).
                      // It enables caching results in ./node_modules/.cache/babel-loader/
                      // directory for faster rebuilds.
                      cacheDirectory: true,
                    },
                  },
                  {
                    loader: require.resolve('file-loader'),
                    // Exclude `js` files to keep "css" loader working as it injects
                    // it's runtime that would otherwise processed through "file" loader.
                    // Also exclude `html` and `json` extensions so they get processed
                    // by webpacks internal loaders.
                    exclude: [/\.jsx?$/,/\.json$/,/\.(css|less)$/, /\.html$/],
                    options: {
                      name: pathConfig.generageStaticPath('media/[name].[hash:6].[ext]') ,
                    },
                  },
                  // ** STOP ** Are you adding a new loader?
                  // Make sure to add the new loader(s) before the "file" loader.
                ],
              }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: pathConfig.generageStaticPath("css/[name].css") ,
        chunkFilename: pathConfig.generageStaticPath("css/[id].css") 
      })
    ],
    stats: "errors-only"
}

module.exports = config