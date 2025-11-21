import { useState, useEffect } from 'react';
import { Box, InputBase, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  placeholder?: string;
  maxWidth?: string | number;
  minWidth?: string | number;
  debounceTime?: number;
  onChange?: (value: string) => void;
}

export const InputSearch = ({
  placeholder = 'Buscar personaje por nombre',
  onChange,
  maxWidth = '1040px',
  debounceTime = 500,
}: SearchInputProps) => {
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timerHandler = setTimeout(() => {
      onChange?.(value);
    }, debounceTime);

    return () => {
      clearTimeout(timerHandler);
    };
  }, [value, debounceTime, onChange]);

  return (
    <Box
      sx={{
        border: `1px solid ${
          focused
            ? theme.palette.secondary[400]
            : theme.palette.custom.whiteAlpha30
        }`,
        borderRadius: '8px',
        backdropFilter: 'blur(1px)',
        backgroundColor: theme.palette.custom.blackAlpha75,
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        width: '96%',
        maxWidth,
        height: '56px',
      }}
    >
      <InputBase
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: theme.palette.primary[500],
                fontSize: 20,
                mr: 1,
              }}
            />
          </InputAdornment>
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          color: theme.palette.secondary.main,
          fontSize: '14px',
          fontFamily: 'Montserrat',
          '& input::placeholder': {
            color: theme.palette.custom.whiteAlpha60,
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};
