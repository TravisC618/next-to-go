import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { useAppSelector, useRace } from "../../hooks";
import { RootState } from "../../redux/store";

export const MenuBar: React.FC = () => {
  // menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // filter checkbox
  const { updateFilter } = useRace();
  const { greyhound, harness, horse } = useAppSelector(
    (state: RootState) => state.races.categoryFilter
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    updateFilter({ [event.target.name]: event.target.checked });

  return (
    <Toolbar>
      <Typography variant="h6" component="div">
        Next to go
      </Typography>
      <Button onClick={handleClick} startIcon={<FilterListIcon />}>
        Filter
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        elevation={0}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={greyhound}
                  onChange={handleChange}
                  name="greyhound"
                  data-testid="greyhound"
                />
              }
              label="Greyhound Racing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={harness}
                  onChange={handleChange}
                  name="harness"
                />
              }
              label="Harness Racing"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={horse}
                  onChange={handleChange}
                  name="horse"
                />
              }
              label="Horse Racing"
            />
          </FormGroup>
        </FormControl>
      </Menu>
    </Toolbar>
  );
};
