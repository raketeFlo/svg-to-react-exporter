/**
 * Main configuration of the exporter - type interface.
 * Default values for it can be set through `config.json`
 * Users can override the behavior when creating the pipelines or by creating `config.local.json` file specifying actual values.
 */
export type ExporterConfiguration = {
  /**
   * Ignored asset paths. By default, all icons will be exported, however, you can specify which paths should be excluded.
   * If you include partial path fragments, all paths matching will be ignored (such as `icons` will ignore all icons in `icons/` folder and its subfolders)
   * */
  ignoredAssetPaths: Array<string>;
  /** Folder to write the components to */
  componentFolder: string;
};
