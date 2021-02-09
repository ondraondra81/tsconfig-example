/* global require process */

import dotenv from 'dotenv';
import webpackMerge from 'webpack-merge';
import loadPresets from './assets/build/loadPresets.babel';
import commonSettings from './assets/build/webpack.common.babel';

// read your .env file, parse the contents, assign it to process.env
dotenv.config();

const modeConfig = env =>
    require(`./assets/build/modes/webpack.${env.mode}.babel.js`)(env);

const webpackConfiguration = (
    { mode, presets } = { mode: 'development', presets: [] },
) => {
    console.log('mode', mode, presets);

    return webpackMerge(
        commonSettings(__dirname),
        modeConfig({ mode, presets }),
        loadPresets({ mode, presets }),
    );
};

export default webpackConfiguration;
