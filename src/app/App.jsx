import { useState } from 'react';
import Modal from '../components/util/Modal';
import './App.css';
import CabinetImg from '../assets/images/thought_cabinet.webp';
import StartMenu from '../components/game/StartMenu';
import styled from 'styled-components';

const StyledBackdrop = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: blur(5px);
`;

const FIVE_MINUTES_MS = 1000 * 60 * 5;

function App() {
  const [isGameSessionActive, setIsGameSessionActive] = useState(false);
  const [modalContent, setModalContent] = useState(
    <StartMenu onStart={startGame}></StartMenu>,
  );
  const [username, setUsername] = useState('');

  function startGame(name) {
    setUsername(name);
    setIsGameSessionActive(true);
    console.log(username);
    setTimeout(endGame, FIVE_MINUTES_MS);
  }

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
