import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import {
  SegmentedButton,
  SegmentedItem,
  SegmentedButtonProps,
} from './SegmentedButton';
import theme from '../../theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockTabs: SegmentedItem[] = [
  { label: 'All', value: 'all' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
];

const defaultProps: SegmentedButtonProps = {
  tabs: mockTabs,
  onChange: vi.fn(),
};

describe('SegmentedButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the segmented button component', () => {
      renderWithTheme(<SegmentedButton {...defaultProps} />);
      expect(screen.getByRole('tablist')).toBeDefined();
    });

    it('should render all tabs provided', () => {
      renderWithTheme(<SegmentedButton {...defaultProps} />);
      expect(screen.getByRole('tab', { name: 'All' })).toBeDefined();
      expect(screen.getByRole('tab', { name: 'Alive' })).toBeDefined();
      expect(screen.getByRole('tab', { name: 'Dead' })).toBeDefined();
    });

    it('should render tabs with correct labels', () => {
      renderWithTheme(<SegmentedButton {...defaultProps} />);
      mockTabs.forEach((tab) => {
        expect(screen.getByRole('tab', { name: tab.label })).toBeDefined();
      });
    });

    it('should have correct number of tabs', () => {
      renderWithTheme(<SegmentedButton {...defaultProps} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(mockTabs.length);
    });
  });

  // describe('Default Selection', () => {
  //   it('should select first tab by default when no value is provided', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const firstTab = screen.getByRole('tab', { name: 'All' });
  //     expect(firstTab).toHaveAttribute('aria-selected', 'true');
  //   });

  //   it('should select first tab when tabs array has items', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const tabs = screen.getAllByRole('tab');
  //     expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  //   });

  //   it('should not have multiple tabs selected by default', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const selectedTabs = screen.getAllByRole('tab', { selected: true });
  //     expect(selectedTabs).toHaveLength(1);
  //   });
  // });

  // describe('Controlled Component', () => {
  //   it('should select the tab matching the provided value', () => {
  //     renderWithTheme(
  //       <SegmentedButton
  //         {...defaultProps}
  //         value="alive"
  //       />
  //     );
  //     const aliveTab = screen.getByRole('tab', { name: 'Alive' });
  //     expect(aliveTab).toHaveAttribute('aria-selected', 'true');
  //   });

  //   it('should update selection when value prop changes', () => {
  //     const { rerender } = renderWithTheme(
  //       <SegmentedButton
  //         {...defaultProps}
  //         value="all"
  //       />
  //     );
  //     const allTab = screen.getByRole('tab', { name: 'All' });
  //     expect(allTab).toHaveAttribute('aria-selected', 'true');

  //     rerender(
  //       <ThemeProvider theme={theme}>
  //         <SegmentedButton
  //           {...defaultProps}
  //           value="dead"
  //         />
  //       </ThemeProvider>
  //     );

  //     const deadTab = screen.getByRole('tab', { name: 'Dead' });
  //     expect(deadTab).toHaveAttribute('aria-selected', 'true');
  //   });

  //   it('should accept numeric values', () => {
  //     const numericTabs: SegmentedItem[] = [
  //       { label: 'Tab 1', value: 1 },
  //       { label: 'Tab 2', value: 2 },
  //       { label: 'Tab 3', value: 3 },
  //     ];
  //     renderWithTheme(
  //       <SegmentedButton
  //         tabs={numericTabs}
  //         value={2}
  //         onChange={vi.fn()}
  //       />
  //     );
  //     const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
  //     expect(tab2).toHaveAttribute('aria-selected', 'true');
  //   });
  // });

  // describe('Uncontrolled Component', () => {
  //   it('should manage internal state when value prop is not provided', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const allTab = screen.getByRole('tab', { name: 'All' });
  //     expect(allTab).toHaveAttribute('aria-selected', 'true');
  //   });

  //   it('should update internal state when tab is clicked', async () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const deadTab = screen.getByRole('tab', { name: 'Dead' });

  //     await userEvent.click(deadTab);

  //     expect(deadTab).toHaveAttribute('aria-selected', 'true');
  //   });

  //   it('should use initial value from tabs array when no value provided', () => {
  //     const initialValue = mockTabs[0]?.value;
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const firstTab = screen.getByRole('tab', { name: mockTabs[0]?.label });
  //     expect(firstTab).toHaveAttribute('aria-selected', 'true');
  //   });
  // });

  describe('Tab Selection', () => {
    it('should call onChange when a tab is clicked', async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <SegmentedButton
          {...defaultProps}
          onChange={onChange}
        />
      );
      const aliveTab = screen.getByRole('tab', { name: 'Alive' });

      fireEvent.click(aliveTab);

      expect(onChange).toHaveBeenCalledWith('alive');
    });

    it('should call onChange with correct value', async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <SegmentedButton
          {...defaultProps}
          onChange={onChange}
        />
      );
      const deadTab = screen.getByRole('tab', { name: 'Dead' });

      fireEvent.click(deadTab);

      expect(onChange).toHaveBeenCalledWith('dead');
    });

    it('should call onChange once per click', async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <SegmentedButton
          {...defaultProps}
          onChange={onChange}
        />
      );
      const aliveTab = screen.getByRole('tab', { name: 'Alive' });

      fireEvent.click(aliveTab);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple tab clicks', async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <SegmentedButton
          {...defaultProps}
          onChange={onChange}
        />
      );

      fireEvent.click(screen.getByRole('tab', { name: 'Alive' }));
      fireEvent.click(screen.getByRole('tab', { name: 'Dead' }));

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenNthCalledWith(1, 'alive');
      expect(onChange).toHaveBeenNthCalledWith(2, 'dead');
    });

    it('should handle clicking the same tab multiple times', async () => {
      const onChange = vi.fn();
      renderWithTheme(
        <SegmentedButton
          {...defaultProps}
          onChange={onChange}
        />
      );
      const aliveTab = screen.getByRole('tab', { name: 'Alive' });

      fireEvent.click(aliveTab);
      fireEvent.click(aliveTab);

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  // describe('Props Configuration', () => {
  //   it('should render with centered prop set to true by default', () => {
  //     const { container } = renderWithTheme(
  //       <SegmentedButton
  //         {...defaultProps}
  //         centered={true}
  //       />
  //     );
  //     const tabsElement = container.querySelector('[role="tablist"]');
  //     expect(tabsElement).toBeInTheDocument();
  //   });

  //   it('should render with centered prop set to false', () => {
  //     const { container } = renderWithTheme(
  //       <SegmentedButton
  //         {...defaultProps}
  //         centered={false}
  //       />
  //     );
  //     const tabsElement = container.querySelector('[role="tablist"]');
  //     expect(tabsElement).toBeInTheDocument();
  //   });

  //   it('should handle empty tabs array gracefully', () => {
  //     const { container } = renderWithTheme(
  //       <SegmentedButton
  //         tabs={[]}
  //         onChange={vi.fn()}
  //       />
  //     );
  //     const tabs = screen.queryAllByRole('tab');
  //     expect(tabs).toHaveLength(0);
  //   });

  //   it('should handle single tab', () => {
  //     const singleTab: SegmentedItem[] = [{ label: 'Single', value: 'single' }];
  //     renderWithTheme(
  //       <SegmentedButton
  //         tabs={singleTab}
  //         onChange={vi.fn()}
  //       />
  //     );
  //     const tab = screen.getByRole('tab', { name: 'Single' });
  //     expect(tab).toBeInTheDocument();
  //   });
  // });

  // describe('Edge Cases', () => {
  //   it('should handle tabs with numeric values', () => {
  //     const numericTabs: SegmentedItem[] = [
  //       { label: 'One', value: 1 },
  //       { label: 'Two', value: 2 },
  //       { label: 'Three', value: 3 },
  //     ];
  //     const onChange = vi.fn();
  //     renderWithTheme(
  //       <SegmentedButton
  //         tabs={numericTabs}
  //         onChange={onChange}
  //       />
  //     );

  //     const twoTab = screen.getByRole('tab', { name: 'Two' });
  //     fireEvent.click(twoTab);

  //     expect(onChange).toHaveBeenCalledWith(2);
  //   });

  //   it('should handle tabs with special characters in labels', () => {
  //     const specialTabs: SegmentedItem[] = [
  //       { label: 'All & More', value: 'all' },
  //       { label: 'Test (1)', value: 'test' },
  //     ];
  //     renderWithTheme(
  //       <SegmentedButton
  //         tabs={specialTabs}
  //         onChange={vi.fn()}
  //       />
  //     );

  //     expect(
  //       screen.getByRole('tab', { name: 'All & More' })
  //     ).toBeInTheDocument();
  //     expect(screen.getByRole('tab', { name: 'Test (1)' })).toBeInTheDocument();
  //   });

  //   it('should handle value not matching any tab (gracefully defaults to first)', () => {
  //     renderWithTheme(
  //       <SegmentedButton
  //         {...defaultProps}
  //         value="nonexistent"
  //       />
  //     );
  //     // Should still render without errors
  //     expect(screen.getByRole('tablist')).toBeInTheDocument();
  //   });

  //   it('should handle rapid tab switching', async () => {
  //     const onChange = vi.fn();
  //     renderWithTheme(
  //       <SegmentedButton
  //         {...defaultProps}
  //         onChange={onChange}
  //       />
  //     );

  //     await userEvent.click(screen.getByRole('tab', { name: 'Alive' }));
  //     await userEvent.click(screen.getByRole('tab', { name: 'Dead' }));
  //     await userEvent.click(screen.getByRole('tab', { name: 'All' }));

  //     expect(onChange).toHaveBeenCalledTimes(3);
  //   });
  // });

  // describe('Accessibility', () => {
  //   it('should have proper ARIA attributes', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const tablist = screen.getByRole('tablist');
  //     expect(tablist).toBeInTheDocument();
  //   });

  //   it('should have aria-selected attribute on tabs', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const tabs = screen.getAllByRole('tab');
  //     tabs.forEach((tab) => {
  //       expect(tab).toHaveAttribute('aria-selected');
  //     });
  //   });

  //   it('should have only one selected tab at a time', () => {
  //     renderWithTheme(<SegmentedButton {...defaultProps} />);
  //     const selectedTabs = screen.getAllByRole('tab', { selected: true });
  //     expect(selectedTabs).toHaveLength(1);
  //   });
  // });
});
