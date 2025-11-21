import { Chip } from '@mui/material';
import { Tick } from '../tick/Tick';
import { Close } from '../close/Close';
import theme from '../../theme/theme';
import type { CardStatus } from '../card/card.interface';

interface ChipProps {
  status: CardStatus;
}

export const ChipComponent = ({ status }: ChipProps) => {
  const backgroundColor =
    status === 'Alive'
      ? theme.palette.primary.main
      : status === 'Dead'
      ? theme.palette.secondary.main
      : theme.palette.grey[500];

  return (
    <Chip
      icon={
        status === 'Alive' ? (
          <Tick color={`${theme.palette.primary[900]}`} />
        ) : (
          <Close color={`${theme.palette.secondary[800]}`} />
        )
      }
      label={status}
      className="Chip"
      sx={{
        gap: '8px',
        height: '32px',
        fontSize: '14px',
        paddingX: '8px',
        backgroundColor: backgroundColor,
        color:
          status === 'Alive'
            ? theme.palette.primary[900]
            : theme.palette.secondary[800],
      }}
    />
  );
};
