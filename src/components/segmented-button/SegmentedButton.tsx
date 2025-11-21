import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

export interface SegmentedItem {
  label: string;
  value: string | number;
}

export interface SegmentedButtonProps {
  tabs: SegmentedItem[];
  value?: string | number;
  centered?: boolean;
  onChange: (value: string | number) => void;
}

export const SegmentedButton = ({
  tabs,
  value,
  onChange,
  centered = true,
}: SegmentedButtonProps) => {
  const [selectedValue, setSelectedValue] = useState(value ?? tabs[0]?.value);

  const isControlled = value !== undefined;
  const effectiveValue = isControlled ? value : selectedValue;

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number
  ) => {
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setSelectedValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        height: 44,
        borderRadius: '32px',
        p: '4px',
        gap: '8px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Tabs
        value={effectiveValue}
        onChange={handleTabChange}
        centered={centered}
        sx={{
          minHeight: 36,
          '& .MuiTabs-flexContainer': { gap: '8px' },
          '& .MuiTab-root': {
            textTransform: 'capitalize',
            fontFamily: 'Montserrat',
            fontWeight: 700,
            minHeight: 36,
            borderRadius: '24px',
            px: '22px',
          },
          '& .Mui-selected': {
            backgroundColor: 'primary.300',
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
    </Box>
  );
};
