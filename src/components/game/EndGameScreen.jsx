import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StyledThought } from './StartMenu';
import { StyledThoughts } from './Game';
import { formatDurationBetweenDates } from '../../services/helpers';
import Leaderboard from './Leaderboard';

const Container = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const HeaderWrapper = styled.div`
  background: ${(props) =>
    props.$isWon
      ? 'linear-gradient(135deg, #091a14 0%, #0d291e 50%, #06130e 100%)'
      : 'linear-gradient(135deg, #1c0505 0%, #2b0a0a 50%, #120303 100%)'};
  border: 3px solid ${(props) => (props.$isWon ? '#7cfbe3' : '#ff4a4a')};
  padding: 0.6em 1.8em;
  transform: skewX(-10deg);
  border-radius: 0.2em;
  filter: drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.8));
`;

const Title = styled.h1`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  transform: skewX(10deg);
  -webkit-text-stroke: 1.5px
    ${(props) => (props.$isWon ? '#7cfbe3' : '#ff4a4a')};
`;

const Subtitle = styled.p`
  font-family: 'Courier New', monospace;
  font-style: italic;
  color: ${(props) => props.theme.text.secondary};
  margin: 0;
  text-align: center;
`;

const RetryButton = styled.button`
  background: #000104;
  color: ${(props) => (props.$isWon ? '#7cfbe3' : '#ff4a4a')};
  border: 2px solid ${(props) => (props.$isWon ? '#7cfbe3' : '#ff4a4a')};
  padding: 0.8em 2em;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);

  &:hover {
    background: ${(props) => (props.$isWon ? '#7cfbe3' : '#ff4a4a')};
    color: #000104;
    transform: translateY(-2deg);
    box-shadow: 0px 6px 15px
      ${(props) => (props.$isWon ? 'rgba(124, 251, 227, 0.4)' : 'rgba(255, 74, 74, 0.4)')};
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: start;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CustomThoughtsGrid = styled(StyledThoughts)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledThoughtWithContent = styled(StyledThought)`
  flex-direction: row;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  gap: 1.5rem;
  border: 2px solid ${(props) => props.theme.border?.primary || '#333842'};
  background: rgba(12, 15, 20, 0.85);
  padding: 1.2rem;
  align-items: flex-start;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);

  img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .thought-body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  h4 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.4rem;
  }

  .tag {
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: ${(props) => (props.$isWon ? '#7cfbe3' : '#ff8585')};
    margin-bottom: 0.2rem;
    display: inline-block;
  }

  p {
    font-size: 0.9rem;
    color: #c5cbd3;
    margin: 0;
    text-align: justify;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      max-width: 250px;
      height: 140px;
    }

    .thought-body {
      width: 100%;
    }
  }
`;

function EndGameScreen({ isGameWon, thoughts = [], scores = [], gameDetails }) {
  const timeResult =
    isGameWon && gameDetails
      ? formatDurationBetweenDates(gameDetails.startTime, gameDetails.endTime)
      : '05:00';
  return (
    <Container>
      <HeaderWrapper $isWon={isGameWon}>
        <Title $isWon={isGameWon}>
          {isGameWon ? 'Cabinet Complete' : 'Time Ran Out'}
        </Title>
        {isGameWon && <span>{timeResult}</span>}
      </HeaderWrapper>

      <Subtitle>
        {isGameWon
          ? 'All internal echoes categorized. The noise subsides into coherent understanding.'
          : 'The thought cabinet collapses back into static. The train of thought slipped past you.'}
      </Subtitle>

      <RetryButton
        $isWon={isGameWon}
        onClick={() => {
          window.location.reload();
        }}
      >
        {isGameWon ? 'Internalize Again?' : 'Try Again?'}
      </RetryButton>

      <StyledInnerContainer>
        <CustomThoughtsGrid>
          {thoughts.map((t) => (
            <StyledThoughtWithContent key={t.name} $isWon={isGameWon}>
              <img src={t.image} alt={t.name} />
              <div className="thought-body">
                <h4>{t.name}</h4>
                <details>
                  <summary className="tag">
                    {isGameWon
                      ? '▶ SOLUTION / INTERNALIZED'
                      : '▶ UNRESOLVED PROBLEM'}
                  </summary>
                  <p>{isGameWon ? t.solution || t.problem : t.problem}</p>
                </details>
              </div>
            </StyledThoughtWithContent>
          ))}
        </CustomThoughtsGrid>

        {isGameWon && <Leaderboard scores={scores}></Leaderboard>}
      </StyledInnerContainer>
    </Container>
  );
}

EndGameScreen.propTypes = {
  isGameWon: PropTypes.bool,
  thoughts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      problem: PropTypes.string,
      solution: PropTypes.string,
    }),
  ),
  gameDetails: PropTypes.shape({
    name: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
  scores: PropTypes.array,
};

export default EndGameScreen;
