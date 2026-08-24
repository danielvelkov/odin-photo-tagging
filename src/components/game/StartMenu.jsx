import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledStartMenu = styled.div`
  display: grid;
  place-items: center;

  .title-wrapper {
    rotate: -2.5deg;
    display: inline-block;
    padding: 0.5em 1em;
    background-color: black;
    border: 3px solid #7cfbe3;
    border-radius: 0.2em;
    transform: skewX(-3.5deg);
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.6));

    h1 {
      text-transform: uppercase;
      margin: 0;
      transform: skewX(5deg);

      /* Text outline effect */
      -webkit-text-stroke: 1.5px #7cfbe3;
    }

    h3 {
      margin: 0.2em auto;
      padding: 0.2em 1em;
      background-color: #f96021;
      max-width: fit-content;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;

    input {
      border: 2px solid ${(props) => props.theme.border.primary};
      padding: 0.5em;
    }
  }

  .thoughts {
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
`;

const StyledBlockquote = styled.blockquote`
  font-family: 'Courier New', monospace;
  font-size: small;
  max-width: 600px;
  text-align: left;
  padding: 1em 1.5em;
  border-left: 3px solid ${(props) => props.theme.border?.primary || '#7cfbe3'};
  background: ${(props) => props.theme.background.surface || '#7cfbe3'};
`;

export const StyledThought = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid ${(props) => props.theme.border.primary};
  padding: 0.5em;
  max-width: 125px;
  width: 100%;

  img {
    object-fit: cover;
  }
  span {
    font-size: small;
    word-break: break-word;
    width: fit-content;
  }
`;

export function StartMenu({ thoughts, onStart }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    onStart(formJson['name']);
  }

  return (
    <StyledStartMenu>
      <div className="title-wrapper">
        <h1>
          Disco Elysium
          <br />
          Cabinet Search
        </h1>
        <h3>a fan game</h3>
      </div>

      <StyledBlockquote>
        <b>SHIVERS - </b>
        <i>
          **A whisper in the back of your skull: <br />
          A sprawling image. Faces, objects, secrets. <br />
          Each one begging to be named. <br />
          <br />
          You hover over the chaos, hunting meaning in the noise. <br />
          Tag the thought before it slips away.**
        </i>
      </StyledBlockquote>

      <p style={{ margin: '0' }}>Find all the thoughts:</p>

      <div className="thoughts">
        {thoughts?.map((t) => (
          <StyledThought key={t.name}>
            <img src={t.image} height={'100px'} width={'100px'} alt={t.name} />
            <span>{t.name}</span>
          </StyledThought>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label id="name-label">Do you remember your name?</label>
        <input
          name="name"
          defaultValue="Raphaël Ambrosius Costeau"
          required
          maxLength={25}
          pattern="^\w.*"
          aria-labelledby="name-label"
          aria-label="Name"
        />
        <button type="submit">Start</button>
      </form>
    </StyledStartMenu>
  );
}

StartMenu.propTypes = {
  thoughts: PropTypes.arrayOf(PropTypes.object),
  onStart: PropTypes.func,
};

export default StartMenu;
