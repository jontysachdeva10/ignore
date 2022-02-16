import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  pageHeader: {
    // marginBottom: '-15px'
    marginLeft: '2rem',
    paddingTop: '2rem',
    display: 'inline-block'
  },
  subtitle: {
    marginLeft: '5px'
  }
}));

const Header = (props) => {

  const classes = useStyles();
  const { title, subtitle } = props;

  return (
      <div className={classes.pageHeader}>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" component="div" className={classes.subtitle}>
          {subtitle}
        </Typography>
      </div>
  );
};

export default Header;
