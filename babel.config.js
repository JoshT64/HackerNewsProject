// // babel.config.js
// module.exports = {
//   presets: [
//     [
//       '@babel/preset-env',
//       '@babel/preset-react',
//       {
//         targets: {
//           esmodules: true,
//         },
//       },
//     ],
//   ],
// };

module.exports = {
  presets: [
    [
      '@babel/preset-env',

      {
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-react',
    'next/babel',
  ],
};
