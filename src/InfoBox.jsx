import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
    return (
        <Card //TERNARY CHAMP
            onClick={props.onClick} 
            className={ 
                props.isActive ?
                props.casesType === 'cases' ? "infoBox_c" : 
                props.casesType === "recovered" ? "infoBox_r" : 
                props.casesType === "deaths" ? "infoBox_d" : "infoBox_c"
                : "infoBox_default"}>

            <CardContent>
            {/* title */}
            <Typography className="infoBox__title" color="textSecondary">
                {title}
            </Typography>

            {/* number of cases */}
            <h2 className="infoBox__cases"> { cases } </h2>

            {/* total */}
            <Typography className="infoBox__total" color="textSecondary">
                {total} Total
            </Typography>

            </CardContent>

        </Card>
    )
}

export default InfoBox;
