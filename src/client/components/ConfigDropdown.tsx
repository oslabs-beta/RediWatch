/**
 * @module ConfigDropdown
 * @description dropdown component for selecting cache eviction policy
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

const policies = [
  'noeviction',
  'allkeys-lru',
  'allkeys-lfu',
  'volatile-lru',
  'volatile-lfu',
  'allkeys-random',
  'volatile-random',
  'volatile-ttl',
];

function getStyles(policy: string, evictionPolicy: string, theme: Theme) {
  return {
    fontWeight:
      evictionPolicy.indexOf(policy) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [evictionPolicy, setEvictionPolicy] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<typeof evictionPolicy>) => {
    const {
      target: { value },
    } = event;
    setEvictionPolicy(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value : 'noeviction',
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
        <InputLabel id="demo-multiple-chip-label">Eviction Method</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={evictionPolicy}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Eviction Method" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip key={selected} label={selected} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {policies.map((policy) => (
            <MenuItem
              key={policy}
              value={policy}
              style={getStyles(policy, evictionPolicy, theme)}
            >
              {policy}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}