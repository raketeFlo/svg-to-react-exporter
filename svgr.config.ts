import { Config } from "@svgr/core";

export const config: Config = {
  memo: true,
  ref: true,
  expandProps: 'end',
  svgProps: {
    className: 'sev-icon',
  },
  replaceAttrValues: {
    black: 'currentColor',
  },
  titleProp: true,
  typescript: true,
  plugins: ['@svgr/plugin-jsx'],
};  
