import moment from 'moment';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CabinetImg from '../../assets/images/thought_cabinet.webp';
import { StyledThought } from './StartMenu';
import ContextMenu from '../util/ContextMenu';
import { scaleCoordinate } from '../../services/helpers';

const StyledGameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
  justify-content: center;
  width: 100%;
`;

const CheckableStyledThought = styled(StyledThought)`
  position: relative;
  color: ${({ $checked }) => ($checked ? `green` : 'white')};
  overflow: hidden;

  ${({ $checked }) =>
    $checked
      ? `
  &:before,
  &:after {
    position: absolute;
    content: '';
    background: white;
    display: block;
    width: 100%;
    height: 10px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg); 
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  &:after {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`
      : ``};

  ${({ $shaking }) =>
    $shaking &&
    `
    animation: shake .5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    @keyframes shake {

    40% {
      translate: -4px 0;
    }

    55% {
      translate: 4px 0;
    }

    70% {
      translate: -2px 0;
    }

    85% {
      translate: 2px 0;
    }
  }
    `}
`;

const StyledThoughts = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  @media (min-width: 1000px) {
    flex-direction: column;
  }
  gap: 5px;
`;

const StyledTimer = styled.div`
  position: absolute;
  top: 5vh;
  right: 5vw;
`;

const StyledSearchArea = styled.main`
  flex: auto;
  height: 100%;
  max-height: 50vh;
  cursor: crosshair;
  overflow: auto;

  @media (min-width: 768px) {
    width: 80%;
    overflow-x: auto;
    max-height: 80vh;
  }

  img {
    width: 1200px;

    @media (min-width: 768px) {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`;

const FIVE_MINUTES_MS = 1000 * 60 * 5;

function Game({ onGameComplete, thoughts }) {
  const [gameEnded, setGameEnded] = useState(false);
  const [foundThoughts, setFoundThoughts] = useState(new Set());
  const [duration, setDuration] = useState(
    moment.duration(FIVE_MINUTES_MS, 'milliseconds'),
  );
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [coords, setCoords] = useState({});
  const [shakingThought, setShakingThought] = useState(null);

  const areaRef = useRef();

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
        onGameComplete(false);
      }
      return () => clearInterval(intervalId);
    }
  }, [gameEnded, duration, onGameComplete]);
  const minutes = String(duration.minutes()).padStart(2, '0');
  const seconds = String(duration.seconds()).padStart(2, '0');

  const timeLeftString = `${minutes}:${seconds}`;

  const handleGameAreaClick = (event) => {
    if (event.target.tagName === 'BUTTON') return false;
    setContextMenuOpen((prev) => !prev);
    event.offsetX = event.nativeEvent.offsetX;
    event.offsetY = event.nativeEvent.offsetY;

    setCoords((prev) => ({
      ...prev,
      offsetX: event.offsetX,
      offsetY: event.offsetY,
      pageX: event.nativeEvent.pageX,
      pageY: event.nativeEvent.pageY,
    }));
  };

  const handleImageLoad = (e) => {
    const { naturalHeight, naturalWidth } = e.target;
    setCoords((prev) => ({
      ...prev,
      height: naturalHeight,
      width: naturalWidth,
    }));
  };

  const handleGuessSelect = (thought) => {
    setContextMenuOpen(false);
    const relativeX = scaleCoordinate(
      coords.offsetX,
      areaRef.current?.scrollWidth,
      coords.width,
    );
    const relativeY = scaleCoordinate(
      coords.offsetY,
      areaRef.current?.scrollHeight,
      coords.height,
    );

    const isWithinBounds =
      relativeX >= thought.x &&
      relativeX <= thought.x + thought.width &&
      relativeY >= thought.y &&
      relativeY <= thought.y + thought.height;

    if (isWithinBounds) setFoundThoughts((prev) => prev.add(thought.name));
    else {
      setShakingThought(thought);
      setTimeout(() => setShakingThought(null), 500);
    }
  };

  useEffect(() => {
    if (foundThoughts.size === 3) {
      setGameEnded(true);
      onGameComplete(true, duration.asMilliseconds());
    }
  }, [foundThoughts, setGameEnded, duration, onGameComplete]);

  return (
    <StyledGameContainer>
      <StyledThoughts>
        {thoughts.map((t) => (
          <CheckableStyledThought
            $checked={foundThoughts.has(t.name)}
            $shaking={t.name === shakingThought?.name}
            key={t.name}
          >
            <img src={t.image} alt={t.name} />
            <span>{t.name}</span>
          </CheckableStyledThought>
        ))}
      </StyledThoughts>

      <StyledSearchArea
        data-testid="search-area"
        aria-haspopup="menu"
        ref={areaRef}
        onClick={handleGameAreaClick}
      >
        <img
          src={CabinetImg}
          onLoad={handleImageLoad}
          onError={() => {
            throw new Error('Missing search area');
          }}
          alt="Search area"
        ></img>
        {contextMenuOpen && (
          <ContextMenu
            thoughts={thoughts}
            coords={{
              x: coords.pageX,
              y: coords.pageY,
            }}
            onSelect={handleGuessSelect}
          ></ContextMenu>
        )}
      </StyledSearchArea>
      <StyledTimer data-testid="game-timer">{timeLeftString}</StyledTimer>
    </StyledGameContainer>
  );
}

Game.propTypes = {
  onGameComplete: PropTypes.func,
  thoughts: PropTypes.array.isRequired,
};

export default Game;
