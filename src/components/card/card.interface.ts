export type CardStatus = 'Alive' | 'Dead';
export type CardGender = 'Male' | 'Female' | 'unknown';
export type CardVariant =
  | 'vertical-normal'
  | 'vertical-small'
  | 'horizontal-normal';

export interface CardProps {
  id: string | number;
  name: string;
  image: string;
  species: string;
  location: string;
  status: CardStatus;
  variant?: CardVariant;
  gender?: CardGender;
  onFavoriteChange?: (id: string | number, isFavorite: boolean) => void;
}
