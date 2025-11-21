import './App.css';
import { Tarjeta } from './';
import { Box } from '@mui/material';
import type { CardVariant } from './components/card/card.interface';

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
    </Box>
  );
}

export default App;
