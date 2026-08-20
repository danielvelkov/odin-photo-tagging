// import { useState } from 'react';
import Modal from '../components/util/Modal';
import './App.css';
import CabinetImg from '../assets/images/thought_cabinet.webp';
// import styled from 'styled-components';

function App() {
  // const [isGameSessionActive, setIsGameSessionActive] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <Modal>
        <h1>Hello world</h1>
      </Modal>
      <header></header>
      <main>
        <img src={CabinetImg}></img>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
