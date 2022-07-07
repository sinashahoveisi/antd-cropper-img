import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import postCSS from 'rollup-plugin-postcss';
import pkg from './package.json';

const input = 'src/CropperImage.tsx';
const exports = 'auto';
const deps = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
const external = (id) => deps.includes(id) || id.startsWith('antd');
const plugins = (isESM) => [
  typescript(),
  !isESM && replace({ preventAssignment: true, '/es/': '/lib/' }),
  postCSS({
    plugins: [require('autoprefixer')],
  }),
];

export default [
  { input, output: { file: pkg.main, format: 'cjs', exports }, external, plugins: plugins(false) },
  { input, output: { file: pkg.module, format: 'es' }, external, plugins: plugins(true) },
];