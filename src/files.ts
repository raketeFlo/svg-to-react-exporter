import { NetworkHelper, FileHelper } from "@supernovaio/export-helpers"
import { AnyOutputFile, OutputTextFile, RenderedAsset, Supernova } from "@supernovaio/sdk-exporters"
import { ExporterConfiguration } from "../config"
import { exportReactDefinitionDestination, exportAssetDestination } from "./paths"
import { optimizeSVG } from "./svg"

export async function convertRenderedAssetToComponent(
  asset: RenderedAsset,
  sdk: Supernova,
  exportConfiguration: ExporterConfiguration
): Promise<AnyOutputFile> {
  const destination = exportReactDefinitionDestination(asset, exportConfiguration.componentFolder)
  let svg = await NetworkHelper.fetchAsText(sdk, asset.sourceUrl)
  svg = optimizeSVG(svg, destination.className)
  const component = FileHelper.createTextFile({
    content: svg,
    relativePath: destination.path,
    fileName: destination.name,
  })
  return component
}

export async function convertRenderedAssetsToComponentsInBatches(
  renderedAssets: Array<RenderedAsset>,
  sdk: Supernova,
  exportConfiguration: ExporterConfiguration
): Promise<Array<AnyOutputFile>> {
  const resultingFiles: Array<AnyOutputFile> = []
  const chunks = chunkArray(renderedAssets, 20)

  for (const chunk of chunks) {
    const batchPromises = chunk.map((asset) => convertRenderedAssetToComponent(asset, sdk, exportConfiguration))
    const batchResults = await Promise.all(batchPromises)
    resultingFiles.push(...batchResults)
  }

  return resultingFiles
}

export async function convertRenderedAssetsToIndexFile(
  renderedAssets: Array<RenderedAsset>,
  exportConfiguration: ExporterConfiguration
): Promise<OutputTextFile> {
  const indexFile = FileHelper.createTextFile({
    content: renderedAssets
      .map((a) => {
        const destination = exportReactDefinitionDestination(a, exportConfiguration.componentFolder)
        return `export { default as Icon${destination.className} } from "./${destination.path}/${destination.className}"`
      })
      .join("\n"),
    relativePath: "./",
    fileName: "index.ts",
  })

  return indexFile
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error("Chunk size should be greater than 0.")
  }

  const result: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}