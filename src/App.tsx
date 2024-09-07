import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import PercentageControl from './Pourcentage.tsx';
import CountryAutocomplete from './Autocomplete.tsx';

const schema = {
  type: "object",
  properties: {
    name: { type: "string", title: "Nom" },
    countries: {
      type: "array",
      title: "Pays",
      items: {
        type: "object",
        properties: {
          country: { type: "string", title: "Pays" },
          percentage: { type: "number", title: "Pourcentage" }
        },
        required: ["country", "percentage"]
      }
    }
  },
  required: ["name", "countries" ]
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/name"
    },
    {
      type: "Control",
      scope: "#/properties/countries",
      options: {
        elementLabelProp: "country",
        detail: {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              scope: "#/properties/country",
              options: {
                autocomplete: true
              }
            },
            {
              type: "Control",
              scope: "#/properties/percentage",
              options: {
                format: "percentage"
              }
            }
          ]
        }
      }
    }
  ]
};

const initialData = {
  name: "",
  countries: []
};

const validate = (data: any) => {
  const total = data.countries?.reduce((acc: number, item: any) => acc + item.percentage, 0) || 0;
  return total === 100;
};

const App = () => {
  const handleChange = (state: any) => {
    const isValid = validate(state.data);
    console.log("Form data:", state.data);
    console.log("Is valid:", isValid);
  };

  const renderers = [
    ...materialRenderers,
    { tester: (uischema, schema) => schema?.format === 'percentage' ? 10 : -1, renderer: PercentageControl },
    { tester: (uischema, schema) => uischema?.options?.autocomplete ? 10 : -1, renderer: CountryAutocomplete }
  ];

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={initialData}
      renderers={renderers}
      cells={materialCells}
      onChange={handleChange}
    />
  );
};

export default App;
