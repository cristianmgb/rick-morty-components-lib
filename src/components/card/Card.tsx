import { useState } from 'react';
import './styles.css';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Button,
} from '@mui/material';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { CardProps } from './card.interface';
import { ChipComponent } from '../chip/Chip';
import { Favorite } from '../favorite/Favorite';

export const CardComponent = ({
  id,
  name,
  species,
  location,
  gender,
  image,
  status,
  variant = 'vertical-normal',
  onFavoriteChange,
}: CardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isMobile = useIsMobile();

  const theme = useTheme();

  return (
    <Card
      className={`${variant} card`}
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box className={`card-image-container-${variant}`}>
        <Button
          role="favorite-btn"
          sx={{
            position: 'absolute',
            top: 0,
            ...(variant === 'horizontal-normal' ? { left: 0 } : { right: 0 }),
            '&:focus, &:focus-visible': {
              outline: 'none',
              boxShadow: 'none',
            },
          }}
          onClick={() => {
            const newValue = !isFavorite;
            setIsFavorite(newValue);
            onFavoriteChange?.(id, newValue);
          }}
        >
          <Favorite
            color={
              isFavorite
                ? theme.palette.primary.light
                : theme.palette.background.paper
            }
            colorStar={
              isFavorite
                ? theme.palette.primary.dark
                : theme.palette.secondary['400']!
            }
          />
        </Button>
        <img
          src={image}
          alt={name}
          className="card-image"
        />
      </Box>
      <CardContent
        style={
          variant === 'horizontal-normal'
            ? { width: '100%' }
            : { width: 'auto' }
        }
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textTransform: 'capitalize',
            }}
          >
            <Typography
              fontFamily="Montserrat"
              sx={{ fontSize: '18px', fontWeight: 600 }}
            >
              {name}
            </Typography>
            {!isMobile && <ChipComponent status={status} />}
          </Box>
          <Typography
            fontFamily="Montserrat"
            fontWeight={500}
            color={theme.palette.secondary['600']!}
            fontSize={14}
          >
            {species}
          </Typography>
        </Box>

        {!isMobile && (
          <Box
            mt={1}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box width="50%">
              <Typography
                color={theme.palette.secondary['400']!}
                fontWeight="bold"
                fontSize="12px"
                letterSpacing="2%"
                lineHeight="100%"
                fontFamily="Montserrat"
              >
                Last known location
              </Typography>
              <Typography
                fontFamily="Montserrat"
                fontSize="14px"
                lineHeight="20px"
                letterSpacing=" 0%"
                color={theme.palette.secondary['500']!}
                fontWeight={500}
                mt="8px"
              >
                {location}
              </Typography>
            </Box>
            <Box width="50%">
              <Typography
                color={theme.palette.secondary['400']}
                fontWeight="bold"
                fontSize="12px"
                letterSpacing="2%"
                lineHeight="100%"
                fontFamily="Montserrat"
              >
                gender
              </Typography>
              <Typography
                fontFamily="Montserrat"
                fontSize="14px"
                lineHeight="20px"
                letterSpacing=" 0%"
                color={theme.palette.secondary['500']!}
                fontWeight={500}
                mt="8px"
              >
                {gender}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
