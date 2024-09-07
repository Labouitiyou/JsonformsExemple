import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Input } from '@mui/material';

const PercentageControl = ({ data, handleChange, path }: any) => {
  return (
    <Input
      type="number"
      value={data || ''}
      onChange={(ev) => handleChange(path, Number(ev.target.value))}
      endAdornment="%"
    />
  );
};

export default withJsonFormsControlProps(PercentageControl);
