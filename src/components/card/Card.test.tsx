import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CardComponent } from './Card';

const mockProps: React.ComponentProps<typeof CardComponent> = {
  id: 1,
  name: 'Morty Smith',
  species: 'Humano',
  status: 'Alive',
  location: 'Story Train',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  variant: 'vertical-normal',
};

describe('Card Component', () => {
  it('should render without errors', () => {
    render(<CardComponent {...mockProps} />);
    expect(screen.getByText('Morty Smith')).toBeDefined();
  });
  it('should render card horizontal-normal variant', () => {
    render(
      <CardComponent
        {...mockProps}
        variant="horizontal-normal"
      />
    );
    expect(screen.getByText('Morty Smith')).toBeDefined();
  });
  it('should toggle favorite state on multiple clicks', () => {
    const onFavoriteChange = vi.fn();
    render(
      <CardComponent
        {...mockProps}
        onFavoriteChange={onFavoriteChange}
      />
    );
    const favoriteBtn = screen.getByRole('favorite-btn');

    fireEvent.click(favoriteBtn);
    fireEvent.click(favoriteBtn);

    expect(onFavoriteChange).toHaveBeenCalledTimes(2);
    expect(onFavoriteChange).toHaveBeenNthCalledWith(1, mockProps.id, true);
    expect(onFavoriteChange).toHaveBeenNthCalledWith(2, mockProps.id, false);
  });
});
