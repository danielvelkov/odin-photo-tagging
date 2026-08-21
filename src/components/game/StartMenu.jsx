import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledStartMenu = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  gap: 10px;

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
    display: flex;
    gap: 10px;
  }
`;

const StyledBlockquote = styled.blockquote`
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  max-width: 600px;
  text-align: left;
  padding: 1em 1.5em;
  border-left: 3px solid ${(props) => props.theme.border?.primary || '#7cfbe3'};
  background: ${(props) => props.theme.background.surface || '#7cfbe3'};
`;

const StyledThought = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid ${(props) => props.theme.border.primary};
  padding: 0.5em;

  img {
    object-fit: cover;
  }
`;

export function StartMenu({ thoughts, startGame }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    startGame(formJson['name']);
  }

  return (
    <StyledStartMenu>
      <div className="title-wrapper">
        <h1>
          Disco Elysium
          <br /> Cabinet
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

      <p>Find all the thoughts:</p>

      <div className="thoughts">
        {thoughts?.map((t) => (
          <StyledThought key={t.name}>
            <img src={t.image} height={'100px'} width={'125px'} alt={t.name} />
            <b>{t.name}</b>
          </StyledThought>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label>Do you remember your name?</label>
        <input
          name="name"
          defaultValue={'Raphaël Ambrosius Costeau'}
          required
          maxLength={50}
          pattern="^\w.*"
        />
        <button type="submit">Start</button>
      </form>
    </StyledStartMenu>
  );
}

StartMenu.propTypes = {
  thoughts: PropTypes.arrayOf(PropTypes.object),
  startGame: PropTypes.func,
};

export default StartMenu;
