export default {
  target: 'browser',
  esm: { type: 'babel', minify: true },
  cjs: { type: 'babel', minify: true },
  umd: { file: 'index', minFile: true },
  runtimeHelpers: true,
  extraBabelPlugins: [],
};
