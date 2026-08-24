import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const StyledSelectedArea = styled.div`
  width: 48px;
  height: 48px;
  border: 3px dashed black;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: white;
  opacity: 0.5;
`;

const StyledMenu = styled.div`
  position: absolute;
  pointer-events: auto;

  /* Position the menu to the right of the target 10px gap */
  left: ${({ $flipX }) => ($flipX ? 'auto' : 'calc(100% + 10px)')};
  right: ${({ $flipX }) => ($flipX ? 'calc(100% + 10px)' : 'auto')};
  top: ${({ $flipY }) => ($flipY ? 'auto' : '0')};
  bottom: ${({ $flipY }) => ($flipY ? '0' : 'auto')};

  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: 180px;
  border: 1px solid #ccc;

  button {
    border: none;
    padding: 0.6em 1em;
    font-size: 0.75rem;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    border-radius: 0;

    &:last-child {
      border-bottom: none;
    }
  }
`;

function ContextMenu({ thoughts, coords }) {
  const [placement, setPlacement] = useState({ flipX: false, flipY: false });

  const callBackRef = useCallback((domNode) => {
    if (domNode) {
      const rect = domNode.getBoundingClientRect();
      const flipX = rect.right > window.innerWidth;
      const flipY = rect.bottom > window.innerHeight;

      setPlacement({ flipX, flipY });
    }
  }, []);

  if (!coords) return null;

  return (
    <Container $x={coords.x} $y={coords.y}>
      <StyledSelectedArea />
      <StyledMenu
        ref={callBackRef}
        $flipX={placement.flipX}
        $flipY={placement.flipY}
        role="menu"
      >
        {thoughts.map((t) => (
          <button key={t.name} role="menuitem">
            {t.name}
          </button>
        ))}
      </StyledMenu>
    </Container>
  );
}

ContextMenu.propTypes = {
  thoughts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  coords: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default ContextMenu;
