module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@types': './src/types',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@features': './src/features',
          '@services': './src/services',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
