const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env) => {

    const production = env.production;

    return {

        entry: { main: './src/pages/index.js' },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: production ? "scripts/[name].[contenthash].js"
                : "scripts/[name].js",
            // publicPath: production ? './' : '',
        },
        mode: 'development',
        devServer: {
            static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
            compress: true, // это ускорит загрузку в режиме разработки
            port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
            hot: true,
            open: true // сайт будет открываться сам при запуске npm run dev
        },
        module: {
            rules: [ // rules — это массив правил
                // добавим в него объект правил для бабеля
                {
                    // регулярное выражение, которое ищет все js файлы
                    test: /\.js$/,
                    // при обработке этих файлов нужно использовать babel-loader
                    use: 'babel-loader',
                    // исключает папку node_modules, файлы в ней обрабатывать не нужно
                    exclude: '/node_modules/'
                },
                {
                    // регулярное выражение, которое ищет все файлы с такими расширениями
                    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                    type: 'asset/resource'
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html' // путь к файлу index.html
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: production ? "pages/[name].[contenthash].css"
                    : "pages/[name].css",
            }),
        ],
        module: {
            rules: [
                // правила для обработки js, html и других файлов

                // добавьте ещё одно правило:
                {
                    // применять это правило только к CSS-файлам
                    test: /\.css$/,
                    // при обработке этих файлов нужно использовать
                    // MiniCssExtractPlugin.loader и css-loader
                    use: [production ? MiniCssExtractPlugin.loader : 'style-loader', {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: "images/[hash][ext][query]"
                    }
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: "fonts/[hash][ext][query]"
                    }
                },
            ]
        }
    };
};
