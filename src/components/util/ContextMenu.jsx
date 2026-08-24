import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const StyledMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  max-width: 150px;

  left: ${({ $leftValue }) => ($leftValue ? `${$leftValue}px` : '0px')};
  top: ${({ $topValue }) => ($topValue ? `${$topValue}px` : '0px')};
  transform: ${({ $flipped }) => ($flipped ? 'translateX(-100%)' : 'none')};

  button {
    border-radius: 0px;
    border: 1px solid;
    font-size: small;
  }
`;

function ContextMenu({ thoughts, coords }) {
  const [flipped, setFlipped] = useState(false);
  const callBackRef = useCallback((domNode) => {
    const windowWidth = window.innerWidth;
    if (domNode) {
      const { x, width } = domNode.getBoundingClientRect();
      if (x + width > windowWidth) setFlipped(true);
    }
  }, []);

  return (
    <StyledMenu
      ref={callBackRef}
      $leftValue={coords.x}
      $topValue={coords.y}
      $flipped={flipped}
      role="menu"
    >
      {thoughts.map((t) => (
        <button key={t.name} role="menuitem">
          {t.name}
        </button>
      ))}
    </StyledMenu>
  );
}

ContextMenu.propTypes = {
  thoughts: PropTypes.array,
  coords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default ContextMenu;
