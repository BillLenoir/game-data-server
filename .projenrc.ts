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
project.package.addPackageResolutions("projen@^0.79.3");

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

apollo.addDeps(
  "@tsconfig/node18",
  "@apollo/server",
  "graphql",
  "zod",
  "@prisma/client",
);
apollo.addDevDeps(
  "nodemon",
  "@graphql-codegen/cli",
  "@graphql-codegen/typescript-resolvers",
  "@graphql-codegen/typescript",
  "prisma",
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

const dataPrep = new TmsTypeScriptAppProject({
  parent: project,
  name: "data-prep",
  defaultReleaseBranch: "main",
  outdir: "data-prep",
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
  gitignore: ["src/data/*", "src/.env"],
});

dataPrep.addDeps("node-fetch", "xml-js", "@aws-sdk/client-s3", "zod");

const hydrateData = new TmsTypeScriptAppProject({
  parent: project,
  name: "hydrate-data",
  defaultReleaseBranch: "main",
  outdir: "hydrate-data",
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

hydrateData.addDeps("zod", "@prisma/client");
hydrateData.addDevDeps("prisma");

project.synth();
