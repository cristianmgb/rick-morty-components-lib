import './App.css';
import { Tarjeta } from './';
import { Box } from '@mui/material';
import type { CardVariant } from './components/card/card.interface';
import { Button } from './components/button/Button';
import theme from './theme/theme';
import { InputSearch } from './components/input-search/InputSearch';
import { SegmentedButton } from './components/segmented-button/SegmentedButton';

const cardVariants: CardVariant[] = [
  'vertical-small',
  'vertical-normal',
  'horizontal-normal',
];

function App() {
  return (
    <Box
      className="container-card-main"
      sx={{
        display: 'flex',
        gap: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {cardVariants.map((variant) => (
        <Tarjeta
          key={variant}
          id={1}
          name="Morty Smith"
          species="Humano"
          status="Alive"
          location="Story Train"
          gender="Male"
          image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          variant={variant}
        />
      ))}
      <Button
        text="Click Me"
        backgroundColor={theme.palette.primary['500']!}
        color={theme.palette.primary['900']!}
        onClick={() => alert('Clicked!')}
      />
      <InputSearch
        maxWidth={'600px'}
        onChange={(value) => console.log('Search input value:', value)}
      />
      <SegmentedButton
        tabs={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        onChange={(value) => console.log('SegmentedButton value:', value)}
      />
    </Box>
  );
}

export default App;
