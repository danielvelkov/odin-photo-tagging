import PropTypes from 'prop-types';
import styled from 'styled-components';

const LedgerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: rgba(12, 15, 20, 0.9);
  border: 2px solid ${(props) => props.theme.border?.primary || '#7cfbe3'};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
`;

const LedgerHeader = styled.div`
  padding: 0.8rem 1rem;
  border-bottom: 2px solid
    ${(props) => props.theme.border?.primary || '#7cfbe3'};

  h3 {
    margin: 0;
    color: #7cfbe3;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const ScrollableList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 400px; /* Limits height and enables scrolling */
  overflow-y: auto;
`;

const ScoreRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  border-bottom: 1px dashed rgba(124, 251, 227, 0.2);

  /* Subtle highlight on hover */
  &:hover {
    background: rgba(124, 251, 227, 0.05);
    color: #ffffff;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const RankAndName = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Rank = styled.span`
  color: #7cfbe3;
  font-weight: bold;
  min-width: 2.5rem; /* Keeps names aligned regardless of rank digits */
`;

const Name = styled.span`
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Time = styled.span`
  color: #a0aab5;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  font-family: 'Courier New', monospace;
  color: #ff8585;
  font-style: italic;
`;

function Leaderboard({ scores = [] }) {
  const topScores = scores.slice(0, 100);

  return (
    <LedgerContainer>
      <LedgerHeader>
        <h3>Rankings</h3>
      </LedgerHeader>

      {topScores.length === 0 ? (
        <EmptyState>No records found.</EmptyState>
      ) : (
        <ScrollableList>
          {topScores.map((score, index) => (
            <ScoreRow key={`${score.name}-${index}`}>
              <RankAndName>
                <Rank>{index + 1}.</Rank>
                <Name>{score.name}</Name>
              </RankAndName>
              <Time>{score.time}</Time>
            </ScoreRow>
          ))}
        </ScrollableList>
      )}
    </LedgerContainer>
  );
}

Leaderboard.propTypes = {
  scores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ),
};

export default Leaderboard;
