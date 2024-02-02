import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Client,
  Provider,
  cacheExchange,
  fetchExchange,
  gql,
  useQuery,
} from 'urql';

import ListHeader from './components/listHeader';
import Pagination from './components/pagination';

interface GamesProps {
  cursor: string;
}

let totalCount: number;
let from: number = 1;
let to: number = 50;
let firstCursor: string | null = null;
let prevCursor: string | null = null;
let nextCursor: string | null = null;
let lastCursor: string | null = null;
let limit: number = 50;

const client = new Client({
  url: 'http://localhost:4000/',
  exchanges: [cacheExchange, fetchExchange],
});

const GamesQuery = gql`
query FindGamesV2($cursor: String!) {
  findGamesV2(cursor: $cursor) {
    totalCount
    gameNumber
    firstCursor
    prevCursor
    nextCursor
    lastCursor
    games {
      game {
        id
        title
        yearpublished
        thumbnail
        publisher
        designer
        description
        gameown
        gamewanttobuy
        gameprevowned
        gamefortrade
      }
      cursor
    }
  }
}`;

const sendGamesQuery = (cursor: string) => {
  const [result, _reexecuteQuery] = useQuery({
    query: GamesQuery,
    variables: { cursor },
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  }
  if (error) {
    return (
      <tr>
        <td>Oh no... {error.message}</td>
      </tr>
    );
  }

  const returnedGames = data.findGamesV2;
  console.log(returnedGames);

  totalCount = returnedGames.totalCount;
  from = returnedGames.gameNumber + 1;
  to =
    from + limit - 1 <= totalCount
      ? returnedGames.gameNumber + limit
      : totalCount;
  firstCursor = returnedGames.firstCursor;
  prevCursor = returnedGames.prevCursor;
  nextCursor = returnedGames.nextCursor;
  lastCursor = returnedGames.lastCursor;

  let gamesToDisplay = [];
  const bggBaseURL = 'https://boardgamegeek.com/boardgame/';
  console.log(returnedGames.games.length);
  for (let i = 0; i < returnedGames.games.length; i++) {
    let gameImage;
    if (returnedGames.games[i].game.thumbnail !== null) {
      gameImage = (
        <td>
          <img
            src={returnedGames.games[i].game.thumbnail}
            alt={'Cover image for' + returnedGames.games[i].game.title}
          />
        </td>
      );
    } else {
      gameImage = <td className="noImage">No image for this game</td>;
    }
    const gamePublisher = returnedGames.games[i].game.publisher.map((publisher: string) => {
      return (<li>{publisher}</li>);
    });

    const gameDesigner = returnedGames.games[i].game.designer.map((designer: string) => {
      return (<li>{designer}</li>);
    });

    const gameDescription = returnedGames.games[i].game.description
      ? returnedGames.games[i].game.description
      : '';
    const gameURL = bggBaseURL + returnedGames.games[i].game.id;
    const gameTitle = returnedGames.games[i].game.title;
    const gameYearPublished = returnedGames.games[i].game.yearpublished
      ? returnedGames.games[i].game.yearpublished
      : '';

    let gameStatusArray: string[] = [];
    if (returnedGames.games[i].game.gameown === true) {
      gameStatusArray.push('OWN');
    }
    if (returnedGames.games[i].game.gamewanttobuy === true) {
      gameStatusArray.push('WANT');
    }
    if (returnedGames.games[i].game.gameprevowned === true) {
      gameStatusArray.push('SOLD');
    }
    if (returnedGames.games[i].game.gamefortrade === true) {
      gameStatusArray.push('FOR SALE');
    }
    const gameStatus = gameStatusArray.join(', ');

    gamesToDisplay.push(
      <tr key={returnedGames.games[i].game.id}>
        {gameImage}
        <td>
          <h3>
            <a href={gameURL}>{gameTitle}</a> &mdash; {gameYearPublished}{' '}
            &mdash; {gameStatus}
          </h3>
          <p>{gameDescription}</p>
        </td>
        <td className="orgs">
          <h4>Publisher(s)</h4>
          <ul>{gamePublisher}</ul>
        </td>
        <td className="people">
          <h4>Designers(s)</h4>
          <ul>{gameDesigner}</ul>
        </td>
      </tr>,
    );
  }
  return gamesToDisplay;
};

const getEncodedCursor = (
  cursorId: number | null,
  cursorLimit: number,
  cursorSort: string,
  cursorFilter: string,
) => {
  let rawCursor = '{ ';
  if (cursorId !== null) {
    rawCursor += `"i": ${cursorId}, `;
  }
  rawCursor += `"l": ${cursorLimit}, "s": "${cursorSort}", "f": "${cursorFilter}" } `;
  const encodedCursor = btoa(rawCursor);
  return encodedCursor;
};

export default function AppV2() {
  const cursor = getEncodedCursor(null, limit, 'ID', 'OWN');
  return (
    <BrowserRouter>
      <Provider value={client}>
        <Routes>
          <Route path="/" element={<Games cursor={cursor} />} />
        </Routes>
        <Routes>
          <Route path="/:cursor" element={<Games cursor={cursor} />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

const Games = (props: GamesProps) => {
  let cursor = props.cursor;
  const [current, setCurrent] = useState(cursor);
  function handlePageButtonClick(newCursor: string): void {
    setCurrent(newCursor);
  }
  let tableRows = sendGamesQuery(current);

  return (
    <Provider value={client}>
      <div>
        <ListHeader text="Sorted by ID" />
        <Pagination
          location="top"
          handlePageButtonClick={handlePageButtonClick}
          first={firstCursor}
          prev={prevCursor}
          next={nextCursor}
          last={lastCursor}
          totalCount={totalCount}
          from={from}
          to={to}
        />
        <table cellSpacing="0" cellPadding="0" id="gameDataTable">
          <tbody>{tableRows}</tbody>
        </table>
        <Pagination
          location="bottom"
          handlePageButtonClick={handlePageButtonClick}
          first={firstCursor}
          prev={prevCursor}
          next={nextCursor}
          last={lastCursor}
          totalCount={totalCount}
          from={from}
          to={to}
        />
      </div>
    </Provider>
  );
};
