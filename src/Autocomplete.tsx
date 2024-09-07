import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Autocomplete, TextField } from '@mui/material';

const countries = [
  "France", "Belgique", "Allemagne", "Inconnu", "Espagne", "Maroc", "Italie", "Russie", "Suisse", "Qatar",
  "Canada", "États-Unis", "Japon", "Chine", "Brésil", "Australie"
  // Ajoutez ici les pays que vous souhaitez inclure
];

const CountryAutocomplete = ({ data, handleChange, path }: any) => {
  return (
    <Autocomplete
      options={countries}
      value={data || ''}
      onChange={(_, value) => handleChange(path, value)}
      renderInput={(params) => <TextField {...params} label="Pays" variant="outlined" />}
    />
  );
};

export default withJsonFormsControlProps(CountryAutocomplete);
