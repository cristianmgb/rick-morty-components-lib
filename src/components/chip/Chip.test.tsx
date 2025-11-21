import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChipComponent } from './Chip';

describe('ChipComponent', () => {
  it('should render chip with Alive status', () => {
    render(<ChipComponent status="Alive" />);
    expect(screen.getByText('Alive')).toBeDefined();
  });

  it('should render chip with Dead status', () => {
    render(<ChipComponent status="Dead" />);
    expect(screen.getByText('Dead')).toBeDefined();
  });

  it('should render Tick icon when status is Alive', () => {
    const { container } = render(<ChipComponent status="Alive" />);
    const icon = container.querySelector('[class*="MuiChip-icon"]');
    expect(icon).toBeDefined();
  });

  it('should render Close icon when status is Dead', () => {
    const { container } = render(<ChipComponent status="Dead" />);
    const icon = container.querySelector('[class*="MuiChip-icon"]');
    expect(icon).toBeDefined();
  });

  it('should have correct className', () => {
    const { container } = render(<ChipComponent status="Alive" />);
    const chip = container.querySelector('.Chip');
    expect(chip).toBeDefined();
  });
});
