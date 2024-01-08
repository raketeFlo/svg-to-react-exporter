import { transform } from '@svgr/core';
import { config } from '../svgr.config';

export function optimizeSVG(svg: string, name: string): string {
  // Run SVGO to optimize the content of the SVG
  let optimizedSVG = transform.sync(svg, config, { componentName: name });

  return optimizedSVG;
}
