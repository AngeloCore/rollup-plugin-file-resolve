import { Plugin } from "rollup";
import { readFileSync } from "node:fs";

export const loaders = {
  text: (code: string) => `export default ${JSON.stringify(code)};`
} as const;

type LoaderType = (code: string) => string | Promise<string>;

type LoaderOption = keyof typeof loaders | LoaderType;

interface FileOption {
  loader: LoaderOption;
  path: string;
}

interface Options {
  [key: string]: string | FileOption;
}

export default function plugin(options: Options = {}): Plugin {
  const cachedLoaders: Map<string, LoaderType> = new Map();

  return {
    name: "file-resolve",
    resolveId(source) {
      const file = options[source];

      if (!file) return null;

      if (typeof file === "object") {
        const loader =
          typeof file.loader === "string" ? loaders[file.loader] : file.loader;

        cachedLoaders.set(file.path, loader);

        return file.path;
      } else return file;
    },
    async load(source) {
      const loader = cachedLoaders.get(source);

      if (typeof loader !== "function") return null;

      return await loader(readFileSync(source, "utf-8"));
    }
  };
}
