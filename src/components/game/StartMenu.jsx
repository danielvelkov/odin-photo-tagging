import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledStartMenu = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  gap: 5px;

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    input {
      border: 2px solid ${(props) => props.theme.border.primary};
    }
  }

  .thoughts {
    display: flex;
    gap: 10px;
  }
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
      <h1>Disco Thought Cabinet</h1>
      <p>Find all the thoughts on the image.</p>
      <div className="thoughts">
        {thoughts?.map((t) => (
          <StyledThought key={t.name}>
            <img src={t.image} height={'100px'} width={'125px'}></img>
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
        ></input>
        <button>Start</button>
      </form>
    </StyledStartMenu>
  );
}

StartMenu.propTypes = {
  thoughts: PropTypes.arrayOf(PropTypes.object),
  startGame: PropTypes.func,
};

export default StartMenu;
