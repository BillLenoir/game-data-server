import { TmsTypeScriptAppProject } from "@10mi2/tms-projen-projects";
import { monorepo } from "@aws/pdk";
import { javascript, web } from "projen";

const project = new monorepo.MonorepoTsProject({
  devDeps: ["@aws/pdk"],
  eslint: true,
  github: true,
  name: "game-data-server",
  packageManager: javascript.NodePackageManager.NPM,
  prettier: true,
  projenrcTs: true,
  gitignore: ["src/data/*", "src/.env"],
});

project.addDevDeps("@10mi2/tms-projen-projects");

const apollo = new TmsTypeScriptAppProject({
  parent: project,
  name: "apollo-server",
  defaultReleaseBranch: "main",
  outdir: "apollo",
  packageManager: project.package.packageManager,
  esmSupportConfig: true,
  tsconfigBaseStrictest: true,
  tsconfig: {
    compilerOptions: {
      // exactOptionalPropertyTypes is too heavy handed, conflicts with prisma and pothos generated code
      exactOptionalPropertyTypes: false,
      // noPropertyAccessFromIndexSignature is too heavy handed as well
      noPropertyAccessFromIndexSignature: false,
    },
  },
  tsconfigDev: {
    compilerOptions: {
      esModuleInterop: true,
      exactOptionalPropertyTypes: false,
      noPropertyAccessFromIndexSignature: false,
    },
  },
});

apollo.addDeps("@tsconfig/node18", "@apollo/server", "graphql", "zod");
apollo.addDevDeps(
  "nodemon",
  "@graphql-codegen/cli",
  "@graphql-codegen/typescript-resolvers",
  "@graphql-codegen/typescript",
);
apollo.tasks.addTask("start:dev", {
  description: "Start the server in development mode",
  exec: "nodemon src/index.ts",
});

const react = new web.ReactTypeScriptProject({
  parent: project,
  name: "react-server",
  defaultReleaseBranch: "main",
  outdir: "react",
  packageManager: project.package.packageManager,
});

react.addDeps("urql", "graphql", "react-router-dom");
react.addDevDeps("@babel/plugin-proposal-private-property-in-object");

project.synth();
