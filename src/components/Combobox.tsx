import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface ComboboxProps {
  label: string;
  id: string;
  onChange?: (evt: unknown, value: string | null, reason: string) => void;
  options: string[];
  value?: string | null;
}

export function Combobox({
  id,
  label,
  onChange,
  options,
  value,
}: ComboboxProps) {
  return (
    <Autocomplete
      disablePortal
      filterOptions={createFilterOptions({ matchFrom: 'start' })}
      fullWidth
      id={id}
      onChange={onChange}
      options={options}
      renderInput={params => <TextField {...params} label={label} name={id} />}
      value={value}
    />
  );
}
