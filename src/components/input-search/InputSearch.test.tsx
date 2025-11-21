import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { InputSearch } from './InputSearch';
import theme from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('InputSearch Component', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render the input search component', () => {
      renderWithTheme(<InputSearch />);
      const input = screen.getByPlaceholderText('Buscar personaje por nombre');
      expect(input).toBeDefined();
    });

    it('should render with default placeholder text', () => {
      renderWithTheme(<InputSearch />);
      expect(
        screen.getByPlaceholderText('Buscar personaje por nombre')
      ).toBeDefined();
    });

    it('should render with custom placeholder text', () => {
      const customPlaceholder = 'Search for characters';
      renderWithTheme(<InputSearch placeholder={customPlaceholder} />);
      expect(screen.getByPlaceholderText(customPlaceholder)).toBeDefined();
    });

    it('should render the search icon', () => {
      const { container } = renderWithTheme(<InputSearch />);
      const searchIcon = container.querySelector('[data-testid="SearchIcon"]');
      expect(searchIcon).toBeDefined();
    });
  });

  describe('User Input', () => {
    it('should update input value when user types', async () => {
      renderWithTheme(<InputSearch />);
      const input = screen.getByPlaceholderText(
        'Buscar personaje por nombre'
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Rick' } });
      expect(input.value).toBe('Rick');
    });

    it('should clear input value when user clears text', async () => {
      renderWithTheme(<InputSearch />);
      const input = screen.getByPlaceholderText(
        'Buscar personaje por nombre'
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Rick' } });
      expect(input.value).toBe('Rick');

      fireEvent.change(input, { target: { value: '' } });
      expect(input.value).toBe('');
    });

    it('should handle multiple character inputs', async () => {
      renderWithTheme(<InputSearch />);
      const input = screen.getByPlaceholderText(
        'Buscar personaje por nombre'
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'Rick and Morty' } });
      expect(input.value).toBe('Rick and Morty');
    });
  });
});
