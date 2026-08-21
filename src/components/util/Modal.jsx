import PropTypes from 'prop-types';
import { useRef } from 'react';
import styled from 'styled-components';

const StyledDialog = styled.dialog`
  padding: 0;
  margin: 0;
  inset: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: transparent;
  display: grid;
  place-items: center;
  z-index: 99;
  border: none;

  &::backdrop {
    display: none;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

const ModalWrapper = styled.div`
  position: relative;
  z-index: 10;
  padding: 1.5rem;
  border: 2px solid ${(props) => props.theme.border.primary};
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.background.elevated};
`;

const ModalContent = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  place-content: center;
`;

export function Modal({ children, ...rest }) {
  const dialogRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) e.stopPropagation();
  };

  return (
    <StyledDialog ref={dialogRef} {...rest}>
      <Backdrop onClick={handleBackdropClick} />

      <ModalWrapper>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {children}
        </ModalContent>
      </ModalWrapper>
    </StyledDialog>
  );
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  onClose: PropTypes.func,
};

export default Modal;
