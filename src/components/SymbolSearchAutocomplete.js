/* eslint-disable no-use-before-define */
import React from "react";
import axios from "axios";
import { isEqual } from "lodash";
import Chip from "@material-ui/core/Chip";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function FixedTags({ value, onChange }) {
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    async function getOptions() {
      if (query.length) {
        const {
          data: options,
        } = await axios.get(
          `symbolsearch/${query}`
          // { params: { token: process.env.REACT_APP_IEX_TOKEN } }
        );
        setOptions(
          options.filter(
            (option) =>
              option.region.match(/us/i) && option.securityType.match(/cs/i)
          )
        );
      }
    }
    setLoading(true);
    getOptions();
    setLoading(false);
  }, [query]);

  const updateOptions = function (_, query) {
    setQuery(query);
  };

  const updateValue = function (event, value) {
    onChange(event, value);
  };

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={updateValue}
      options={options}
      getOptionLabel={(option) => option.symbol}
      getOptionSelected={(option, value) => isEqual(option, value)}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Badge badgeContent={4} key={index} color="secondary">
            <Chip label={`$${option.symbol}`} {...getTagProps({ index })} />
          </Badge>
        ))
      }
      loading={loading}
      renderOption={(option) => <span>${option.symbol}</span>}
      fullWidth
      onInputChange={updateOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Symbol Lookup"
          variant="filled"
          size="small"
          placeholder="Add symbol"
        />
      )}
    />
  );
}
