const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      // 부모 컴파일러에서 ESLint와 fork-ts-checker 플러그인을 완전히 제거
      webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
        const name = plugin.constructor && plugin.constructor.name;
        return (
          name !== 'ESLintWebpackPlugin' &&
          name !== 'ForkTsCheckerWebpackPlugin'
        );
      });

      return webpackConfig;
    },
  },
};
