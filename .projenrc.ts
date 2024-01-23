import { javascript } from "projen";
import { monorepo } from "@aws/pdk";
const project = new monorepo.MonorepoTsProject({
  devDeps: ["@aws/pdk"],
  eslint: true,
  github: true,
  name: "game-data-server",
  packageManager: javascript.NodePackageManager.NPM,
  prettier: true,
  projenrcTs: true,
});
project.synth();