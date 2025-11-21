import { Button as ButtonMui } from '@mui/material';

interface ButtonProps {
  backgroundColor: string;
  color?: string;
  text: string;
  fontSize?: string;
  onClick: () => void;
}

export const Button = ({
  backgroundColor,
  text,
  color = 'primary',
  fontSize = '14px',
  onClick,
}: ButtonProps) => {
  return (
    <ButtonMui
      sx={{
        backgroundColor,
        color,
        fontSize,
        fontFamily: 'Montserrat',
        fontWeight: 700,
        borderRadius: '24px',
        paddingX: '22px',
        paddingY: '16px',
        height: '44px',
        minWidth: '95px',
        textTransform: 'capitalize',
        '&:focus, &:focus-visible': {
          outline: 'none',
          boxShadow: 'none',
        },
      }}
      onClick={onClick}
    >
      {text}
    </ButtonMui>
  );
};
