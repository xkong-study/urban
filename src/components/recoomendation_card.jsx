/* jshint esversion: 6 */
import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {Pagination} from "antd";
import {Link,useNavigate} from 'react-router-dom';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
    root: {
        minWidth: 150,
    },
    bullet: {
        display: 'inline-block',
        margin: '10 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function Recommend_Card(props) {
    const navigate=useNavigate();
    const classes = useStyles();
    console.log(props);
    setTimeout(()=> navigate('/GoogleMap_?position='+Object.values(props)),1500);
    return (
        <div>
            <Card className={classes.root} style={{marginTop:"50px"}}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         See more detail in searched shop
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Want to know more about nearby stores
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        show more detail
                    </Button>
                    <Button size="small" color="primary">
                        share
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
