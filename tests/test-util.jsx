import { render as rtlRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

const Providers = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const render = (ui, options) =>
  rtlRender(ui, { wrapper: Providers, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { render };

Providers.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
