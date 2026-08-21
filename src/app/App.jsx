import { useCallback, useEffect, useState } from 'react';
import Modal from '../components/util/Modal';
import './App.css';
import CabinetImg from '../assets/images/thought_cabinet.webp';
import StartMenu from '../components/game/StartMenu';
import styled from 'styled-components';
import { getThoughts } from '../services/store/db';
import { shuffle } from '../services/helpers';

const StyledBackdrop = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: blur(5px);
`;

const FIVE_MINUTES_MS = 1000 * 60 * 5;

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [isGameSessionActive, setIsGameSessionActive] = useState(false);
  const [modalContent, setModalContent] = useState(
    <i data-testid="loading-message" style={{ padding: '2em' }}>
      Be patient...
    </i>,
  );
  const [username, setUsername] = useState('');

  const startGame = useCallback((name) => {
    setUsername(name);
    setIsGameSessionActive(true);
    setTimeout(endGame, FIVE_MINUTES_MS);
  }, []);

  if (username) console.log(username);

  useEffect(() => {
    getThoughts().then((thoughts) => {
      const shuffledThoughts = shuffle([...thoughts]);
      setThoughts(shuffledThoughts.slice(0, 3));
    });
  }, []);

  useEffect(() => {
    if (thoughts && thoughts.length > 0)
      setModalContent(
        <StartMenu onStart={startGame} thoughts={thoughts}></StartMenu>,
      );
  }, [thoughts, startGame]);

  function endGame() {
    setModalContent(
      <Modal>
        <h1>Game over</h1>
      </Modal>,
    );
  }

  return (
    <>
      {!isGameSessionActive && <Modal>{modalContent}</Modal>}
      <main>
        {!isGameSessionActive && (
          <StyledBackdrop src={CabinetImg}></StyledBackdrop>
        )}
      </main>
      <footer>
        DISCLAIMER: This is a fan game. All rights reserved by Za/Um Studios.
        Buy the original Disco Elysium to support the developers!
      </footer>
    </>
  );
}

export default App;
