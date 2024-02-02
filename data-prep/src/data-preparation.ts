import fs from "fs/promises";
import convert from "xml-js";
import { dataPrepConfigs } from "./config-data-preparation.js";
import { fetchData } from "./fetch-data.js";
import { BggGameData, GameOnlyData } from "./interfaces.js";
import { prepareEntityGameData } from "./prepare-entity-game-data.js";
import { prepareGameOnlyData } from "./prepare-game-only-data.js";

export async function prepareData(username: string) {
  // Fetch the data from BGG.
  const rawResponse = await fetchData("collection", username);

  if (rawResponse === undefined) {
    throw new Error("There was no response from BGG");
  }

  if (
    rawResponse.includes(
      "Your request for this collection has been accepted and will be processed",
    ) === true
  ) {
    throw new Error(
      "Your request for this collection has been accepted and will be processed.  Please try again later for access.",
    );
  }

  // Save the response.
  const rawResponseFile = "./src/data/rawResponse.xml";
  if (rawResponse != undefined) {
    await fs.writeFile(rawResponseFile, rawResponse);
  } else {
    throw new Error("The raw response is undefined");
  }
  console.log(
    "\x1b[32m%s\x1b[0m",
    "I wrote the raw response XML file for the collection data!",
  );

  // Sometimes BGG does weird things. This is a quick way to see what BGG returned so you can start troubleshooting.
  console.log(rawResponse.substring(0, 100));

  // Transform the response
  const convertedResponse = convert.xml2json(rawResponse, {
    compact: true,
    spaces: 2,
  });
  const collectionData: BggGameData = JSON.parse(convertedResponse);
  console.log("\x1b[32m%s\x1b[0m", "I transformed the collection data!");

  // Process the returned list of games
  if (dataPrepConfigs.SavedDataFormat === "GameOnly") {
    const parsedGameOnlyDataFile = "./src/data/GameOnlyData.json";
    const parsedGameOnlyData: GameOnlyData[] =
      await prepareGameOnlyData(collectionData);

    // Save the final output. Still need to tigger hydration.
    const writeableGameData = JSON.stringify(parsedGameOnlyData);
    await fs.writeFile(parsedGameOnlyDataFile, writeableGameData);
    console.log(
      "\x1b[32m%s\x1b[0m",
      "I wrote the parsed game-only data file for the collection data!",
    );
    return parsedGameOnlyData;
  } else if (dataPrepConfigs.SavedDataFormat === "EntityGame") {
    const parsedGameDataFile = "./data/entitygame-gameData.json";
    const parsedEntityGameData = await prepareEntityGameData(collectionData);
    const writableEntityGameData = JSON.stringify(parsedEntityGameData);
    await fs.writeFile(parsedGameDataFile, writableEntityGameData);
    console.log(
      "\x1b[32m%s\x1b[0m",
      "I wrote the parsed entity-game data file for the collection data!",
    );
    return parsedEntityGameData;
  } else {
    console.log(dataPrepConfigs);
    throw new Error(
      "Did not correclty specify how to save the data in the dotenv file.",
    );
  }
}
