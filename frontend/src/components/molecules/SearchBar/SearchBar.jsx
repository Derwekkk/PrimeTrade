import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Input from "../../atoms/Input/Input";

const SearchBar = ({ onSearch, placeholder = "Search...", debounce = 300 }) => {
  const [value, setValue] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      onSearch(newValue);
    }, debounce);

    setTimeoutId(newTimeoutId);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
