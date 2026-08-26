import { useCallback, useEffect, useState } from 'react';
import Modal from '../components/util/Modal';
import './App.css';
import CabinetImg from '../assets/images/thought_cabinet.webp';
import StartMenu from '../components/game/StartMenu';
import styled from 'styled-components';
import { getThoughts } from '../services/store/db';
import { shuffle } from '../services/helpers';
import Game from '../components/game/Game';
import EndGameScreen from '../components/game/EndGameScreen';
import {
  endGameSession,
  getLeaderboard,
  startGameSession,
} from '../services/store/__mocks__/db';

const StyledBackdrop = styled.img`
  object-fit: cover;
  filter: blur(5px);
  max-height: 80vh;
`;

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [currentGameSession, setCurrentGameSession] = useState(null);
  const [modalContent, setModalContent] = useState(
    <i data-testid="loading-message" style={{ padding: '2em' }}>
      Be patient...
    </i>,
  );

  const startGame = useCallback(async (name) => {
    const gameSession = await startGameSession(name);
    setCurrentGameSession(gameSession);
  }, []);

  const endGame = useCallback(
    async (isGameWon, time) => {
      setCurrentGameSession(null);
      setModalContent(
        <i style={{ padding: '2em' }}>Archiving thought cabinet...</i>,
      );

      try {
        let gameSession = null;
        let leaderboardScores = [];

        if (isGameWon) {
          gameSession = await endGameSession(
            currentGameSession.id,
            time,
            isGameWon,
          );
          leaderboardScores = await getLeaderboard();
        }

        setModalContent(
          <EndGameScreen
            thoughts={thoughts}
            isGameWon={isGameWon}
            gameDetails={gameSession}
            scores={leaderboardScores}
          />,
        );
      } catch (error) {
        console.error('Failed to sync :', error);
        setModalContent(<p>Error reaching the thought cabinet.</p>);
      }
    },
    [currentGameSession, thoughts],
  );

  useEffect(() => {
    getThoughts().then((thoughts) => {
      const shuffledThoughts = shuffle([...thoughts]);
      setThoughts(shuffledThoughts.slice(0, 3));
    });
  }, []);

  useEffect(() => {
    if (thoughts && thoughts.length > 0 && startGame)
      setModalContent(
        <StartMenu onStart={startGame} thoughts={thoughts}></StartMenu>,
      );
  }, [thoughts, startGame]);

  return (
    <>
      {!currentGameSession && <Modal>{modalContent}</Modal>}

      {!currentGameSession ? (
        <StyledBackdrop src={CabinetImg}></StyledBackdrop>
      ) : (
        <Game thoughts={thoughts} onGameComplete={endGame}></Game>
      )}
      <footer style={{ maxWidth: 'max(300px, 80vw)' }}>
        DISCLAIMER: This is a fan game. All rights reserved by Za/Um Studios.
        Buy the original Disco Elysium to support the developers!
      </footer>
    </>
  );
}

export default App;
