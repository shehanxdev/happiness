module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          '@vs/components': './src/components/index',
          '@vs/constants': './src/constants/index',
          '@vs/data': './src/data/index',
          '@vs/assets': './src/assets/index',
          '@vs/screens': './src/screens/index'
        }
      }
    ]
  ]
};
