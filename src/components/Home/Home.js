import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Post from '../Post/Post';
import Container from '@mui/material/Container';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "center",
        alignItems : "center",
        backgroundColor: '#f0f5ff',    
        height: '100vh',
        padding: 5
    },
    post: {
    }
});

function Home() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error !!!</div>;
    } else if (!isLoaded) {
        return <div>Loading... </div>;
    } else {
        return (
            <Container fixed className={classes.container}>
                {postList.map(post => (
                    
                        <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                    
                ))}
            </Container>
        );
    }
}

export default Home;
