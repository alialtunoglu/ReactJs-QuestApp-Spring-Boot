import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, InputAdornment } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles({
    root: {
        width: 950,
        textAlign: "left",
        margin: 20,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
    },
    avatar: {
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white",
    },
});

function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const classes = useStyles();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);
    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();
    };
    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    };
    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setIsSent(false);
    };

    return (
        <div>
            <Snackbar
                open={isSent}
                autoHideDuration={1200}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Your post is sent !
                </Alert>
            </Snackbar>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Link
                            className={classes.link}
                            to={{ pathname: "/users/" + userId }}
                        >
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Title"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}
                        />
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Text"
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        style={{
                                            background:
                                                "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                            color: "white",
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        ></OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default PostForm;
