import { dataPrepConfigs } from "./config-data-preparation.js";
import { hydrateData } from "./data-hydraton.js";
import { prepareData } from "./data-preparation.js";

const gameDataPromise = await prepareData(dataPrepConfigs.BggUser);

const gameData = JSON.stringify(gameDataPromise);

if (dataPrepConfigs.WhereToSave !== "Locally") {
  void hydrateData(gameData).then(() => void 0);
}
