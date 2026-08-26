import { useCallback, useEffect, useState } from 'react';
import Modal from '../components/util/Modal';
import './App.css';
import CabinetImg from '../assets/images/thought_cabinet.webp';
import StartMenu from '../components/game/StartMenu';
import styled from 'styled-components';
import { getThoughts } from '../services/store/db';
import { shuffle } from '../services/helpers';
import Game from '../components/game/Game';

const StyledBackdrop = styled.img`
  object-fit: cover;
  filter: blur(5px);
  max-height: 80vh;
`;

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [isGameSessionActive, setIsGameSessionActive] = useState(false);
  const [modalContent, setModalContent] = useState(
    <i data-testid="loading-message" style={{ padding: '2em' }}>
      Be patient...
    </i>,
  );
  const [username, setUsername] = useState('');

  const endGame = useCallback(() => {
    setIsGameSessionActive(false);
    setModalContent(
      <Modal>
        <h1>Game over</h1>
      </Modal>,
    );
  }, []);

  const startGame = useCallback((name) => {
    setUsername(name);
    setIsGameSessionActive(true);
  }, []);

  if (username) console.log(username);

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
      {!isGameSessionActive && <Modal>{modalContent}</Modal>}

      {!isGameSessionActive ? (
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
