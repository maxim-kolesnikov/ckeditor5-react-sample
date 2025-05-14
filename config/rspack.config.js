const path = require('path');
const { rspack } = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const fs = require('fs');


const isProduction = process.env.NODE_ENV === 'production';
/** @type {import('@rspack/cli').Configuration} */
const config = function () {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  return {
    mode: process.env.NODE_ENV,
    entry: { main: './src/index.tsx' },
    devtool: 'source-map',
    resolve: {
      extensions: ['...', '.ts', '.tsx', '.jsx'],
    },
    devServer: {
      host: 'localhost',
      port: 3000,
    },
    output: {
      path: path.resolve(fs.realpathSync(process.cwd()), "dist"),
      filename: "[name].js",
      chunkFilename: "[name].[contenthash].js",
      clean: true,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            chunks: "all",
            priority: 20,
          }
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                  decorators: true,
                  dynamicImport: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    pragma: 'React.createElement',
                    pragmaFrag: 'React.Fragment',
                    throwIfNamespace: true,
                    development: false,
                    useBuiltins: false,
                  },
                },
                target: 'es2016',
                loose: false,
                externalHelpers: false,
                keepClassNames: true,
              },
              minify: true,
            },
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          exclude: [
            /node_modules/,
            /.(js|mjs|jsx|ts|tsx)$/,
            /.html$/,
            /.json$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
            /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
            /.svg$/
          ],
          options: {
            name: 'assets/images/[name].[ext]',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: [/node_modules/]
        },
        {
          oneOf: [
            {
              test: /\.svg$/,
              use: [ 'raw-loader' ]
            },
            {
              test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
              use: [
                {
                  loader: 'style-loader',
                  options: {
                    injectType: 'singletonStyleTag',
                    attributes: {
                      'data-cke': true
                    }
                  }
                },
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: styles.getPostCssConfig( {
                      themeImporter: {
                        themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                      },
                      minify: true
                    } )
                  }
                }
              ]
            },
          ]
        },
      ],
    },
    plugins: [
      new rspack.HtmlRspackPlugin({ template: './public/index.html' }),
      !isProduction && new ReactRefreshPlugin(),
    ].filter(Boolean),
  };
};

module.exports = config;