/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 */

module.exports = {
  presets: [
    require('babel-preset-react-native'),
  ],
  plugins: [
    [require('babel-plugin-react-native-css-class'), {module: 'react-native-theme'}],
    require('babel-plugin-react-native-layout'),
    require('./transforms/transform-apentle-modules'),
  ],
};
