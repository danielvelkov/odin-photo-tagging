import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CabinetImg from '../../assets/images/thought_cabinet.webp';
import { StyledThought } from './StartMenu';
import ContextMenu from '../util/ContextMenu';

const StyledGameContainer = styled.main`
  display: flex;
  align-items: center;
  gap: 5px;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
  justify-content: center;
`;

const StyledThoughts = styled.div`
  display: flex;
  @media (min-width: 1000px) {
    flex-direction: column;
  }
  gap: 5px;

  ${StyledThought} {
    display: inline-block;
    img {
      height: fit-content;
      width: 100%;
    }
  }
`;

const StyledTimer = styled.div`
  position: absolute;
  top: 5vh;
  right: 5vw;
`;

const StyledSearchArea = styled.img`
  flex: auto;
  height: 100%;
  width: 80%;
  object-fit: contain;
  flex-basis: minmax(80vw, 300px);
  cursor: crosshair;
`;

function Game({ onTimerRunOut, thoughts }) {
  const [gameEnded, setGameEnded] = useState(false);
  //   const [foundThoughts, setFoundThoughts] = useState([]);
  const [duration, setDuration] = useState(
    moment.duration(5 * 60 * 1000, 'milliseconds'),
  );
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [coords, setCoords] = useState({});

  const imgRef = useRef();

  useEffect(() => {
    if (!gameEnded) {
      const intervalId = setInterval(
        () =>
          setDuration((prev) => moment.duration(prev - 1000, 'milliseconds')),
        1000,
      );
      if (duration.asMilliseconds() <= 0) {
        clearInterval(intervalId);
        setGameEnded(true);
        onTimerRunOut();
      }
      return () => clearInterval(intervalId);
    }
  }, [gameEnded, duration, onTimerRunOut]);
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  const timeLeftString = `${minutes}:${seconds}`;

  const handleGameAreaClick = (event) => {
    setContextMenuOpen((prev) => !prev);
    console.log(event.nativeEvent.pageX, event.nativeEvent.pageY);
    event.offsetX = event.nativeEvent.offsetX;
    event.offsetY = event.nativeEvent.offsetY;

    // Alternative: Using getBoundingClientRect()
    const rect = imgRef.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left; // X relative to box's left edge
    const relativeY = event.clientY - rect.top; // Y relative to box's top edge
    // console.log(
    //   'Relative to box (getBoundingClientRect):',
    //   relativeX,
    //   relativeY,
    // );
    setCoords({
      offsetX: event.offsetX,
      offsetY: event.offsetY,
      relativeX,
      relativeY,
      pageX: event.nativeEvent.pageX,
      pageY: event.nativeEvent.pageY,
    });
  };

  const handleImageLoad = (e) => {
    const { naturalHeight, naturalWidth } = e.target;
    setCoords((prev) => ({
      ...prev,
      height: naturalHeight,
      width: naturalWidth,
    }));
  };

  return (
    <StyledGameContainer>
      <StyledThoughts>
        {thoughts.map((t) => (
          <StyledThought key={t.name}>
            <img src={t.image} alt={t.name} />
            <span>{t.name}</span>
          </StyledThought>
        ))}
      </StyledThoughts>

      <StyledSearchArea
        aria-haspopup="menu"
        ref={imgRef}
        onClick={handleGameAreaClick}
        src={CabinetImg}
        onLoad={handleImageLoad}
        alt="Search area"
      ></StyledSearchArea>
      {contextMenuOpen && (
        <ContextMenu
          thoughts={thoughts}
          coords={{
            x: coords.pageX,
            y: coords.pageY,
          }}
        ></ContextMenu>
      )}
      <StyledTimer data-testid="game-timer">{timeLeftString}</StyledTimer>
      <StyledTimer style={{ marginTop: '20px' }}>
        <span>{JSON.stringify(coords)}</span>
      </StyledTimer>
    </StyledGameContainer>
  );
}

Game.propTypes = {
  onTimerRunOut: PropTypes.func,
  thoughts: PropTypes.array.isRequired,
};

export default Game;
