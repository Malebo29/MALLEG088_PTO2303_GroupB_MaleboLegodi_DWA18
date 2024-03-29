import { ChangeEvent } from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useShowsContext } from '../../context/ShowsContext';

const Filter = () => {
    const { setSort, setSearch } = useShowsContext();

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        setSort(e.target.value as string);
    };

    const handleSearchChange = (e: ChangeEvent<{ value: unknown }>) => {
        setSearch(e.target.value as string);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6"
                sx={{ color: "#000", mb: 1, fontSize: 15, textAlign: 'center', fontStyle: 'italic' }}
                >Check out our available shows!</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap'}}>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' }}}>
                    <InputLabel id="sort-label" sx={{color: '#000'}}>Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        value=""
                        onChange={handleSortChange}
                        label="Sort By"
                        sx={{color: '#000'}}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="titleAZ">Title (A-Z)</MenuItem>
                        <MenuItem value="titleZA">Title (Z-A)</MenuItem>
                        <MenuItem value="dateAsc">Date Updated (Ascending)</MenuItem>
                        <MenuItem value="dateDesc">Date Updated (Descending)</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Search"
                    sx={{ color: '#000', minWidth: 200, width: { xs: '100%', sm: 'auto' } }}
                    onChange={handleSearchChange}
                    InputProps={{
                        style: {
                            color: '#000'
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default Filter;