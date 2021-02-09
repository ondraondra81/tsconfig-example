import path from 'path';
import config from './config.json';
import ManifestPlugin from 'webpack-manifest-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

const plugins = (rootDirectory, isProd) => {
    const cssFilename = isProd ? '[name].[contenthash].css' : '[name].css';

    return [
        new MiniCssExtractPlugin({
            filename: cssFilename,
        }),
        new StylelintPlugin(),
        new ManifestPlugin({
            basePath: config.basePath,
            publicPath: config.basePath,
        }),
        new AssetsPlugin({
            useCompilerPath: true,
            filename: 'entrypoints.json',
            includeAllFileTypes: true,
            prettyPrint: true,
            // processOutput: processOutput(),
        }),
        new CopyPlugin([
            {
                from: path.resolve(rootDirectory, config.staticFilesPath),
                to: path.resolve(rootDirectory, config.outputPath),
            },
        ]),
        new webpack.ProvidePlugin({
            Preact: 'preact',
        }),
        new ESLintPlugin(
            {
                extensions: ['ts', 'js','tsx']
            }
        ),
    ];
};

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        use: [
            {
                loader: 'babel-loader',
            },
        ],
    },
    {
        test: /\.ts(x)?$/,
        exclude: /node_modules|vendor/,
        use: [
            {
                loader: 'babel-loader',
            },
            {
                loader: 'ts-loader',
            },
        ],
    },
    {
        test: /\.scss$/,
        exclude: /node_modules|vendor/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
            },
            {
                loader: 'postcss-loader',
            },
            {
                loader: 'sass-loader',
            },
        ],
    },
    {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
            },
        ],
    },
];

const commonWebpackSettings = (rootDirectory, mode) => {
    const isProd = mode === 'production';
    const jsFilename = isProd ? '[name].[contenthash].js' : '[name].js';
    const chunkFilename = isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js';
    return {
        entry: config.entry,
        output: {
            filename: jsFilename,
            chunkFilename: chunkFilename,
            path: path.resolve(rootDirectory, config.outputPath),
        },
        plugins: plugins(rootDirectory, isProd),
        resolve: {
            extensions: ['.js', 'jsx', '.ts', '.tsx', '.mjs', '.json'],
            plugins: [
                new TsconfigPathsPlugin({
                    /* options: */
                }),
            ],
            alias: {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat',
            },
        },
        module: {
            rules: rules,
        },
    };
};

export default commonWebpackSettings;
