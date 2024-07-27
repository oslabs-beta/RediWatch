/**
 * @module TTLDropdown
 * @description dropdown component for selecting cache key TTL
 */

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const times = [
  '5 seconds',
  '10 seconds',
  '15 seconds',
  '20 seconds',
  '25 seconds',
  '30 seconds',
  '35 seconds',
  '40 seconds',
  '45 seconds',
  '50 seconds',
  '55 seconds',
  '60 seconds',
  '65 seconds',
];

function getStyles(time: string, TTLtime: string, theme: Theme) {
  return {
    fontWeight:
      TTLtime.indexOf(time) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [TTLtime, setTTLtime] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<typeof TTLtime>) => {
    const {
      target: { value },
    } = event;
    setTTLtime(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value : '60',
    );

    alert(value);

    // post request to "update config"
    // fetch('/api/update-policy', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(value),
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log('Successfully updated:', data);
    //   alert('Updated cache configuration');
    // })
    // .catch((err) => {
    //   console.error('Error updating config:', err);
    //   alert('Failed to update cache configuration');
    // });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Time-To-Live</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={TTLtime}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Time-To-Live" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip key={selected} label={selected} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {times.map((time) => (
            <MenuItem
              key={time}
              value={time}
              style={getStyles(time, TTLtime, theme)}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}