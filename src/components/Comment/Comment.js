import React from "react";
import { makeStyles } from "@mui/styles";
import { InputAdornment, OutlinedInput, CardContent, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  comment: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  small: {
    width: 32,  // Fixed width value
    height: 32, // Fixed height value
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
});

function Comment(props) {
  const { text, userId, userName } = props;
  const classes = useStyles();

  return (
    <CardContent className={classes.comment}>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 25 }}
        fullWidth
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link className={classes.link} to={{ pathname: "/users/" + userId }}>
              <Avatar aria-label="recipe" className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        style={{ color: "black", backgroundColor: "white" }}
      />
    </CardContent>
  );
}

export default Comment;
