import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    title: {
      flex: "1 1 100%",
    },
    filterBtn: {
      color: theme.palette.secondary.main,
    },
    filterGroup: {
      "& .MuiFormControlLabel-root": {
        margin: 0,
        paddingLeft: theme.spacing(2), // 8 * 2
        paddingRight: theme.spacing(2),
        "&:hover": {
          backgroundColor: grey[100],
        },
      },
    },
  })
);

export const MenuBar: React.FC = () => {
  // styling
  const classes = useStyles();

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
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.title} variant="h6" component="div">
        Next to go
      </Typography>
      <Button
        onClick={handleClick}
        className={classes.filterBtn}
        startIcon={<FilterListIcon />}
      >
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
          <FormGroup className={classes.filterGroup}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={greyhound}
                  onChange={handleChange}
                  name="greyhound"
                  data-testid="greyhound"
                  color="primary"
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
                  color="primary"
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
                  color="primary"
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
