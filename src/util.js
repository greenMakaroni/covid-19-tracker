import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { rgbToHex } from "@material-ui/core";

//Sort the data by number of total cases: descending
export const sortData = data => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if(a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }})
        return sortedData;
}

//3 types of circles
const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 300,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 600,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 1300,
    }
}

//Draw circles on the map with tooltip
export const showDataOnMap = (data, casesType='cases') => (
    data.map((country) => (
        <Circle 
            center={ [ country.countryInfo.lat, country.countryInfo.long ] }
            fillOpacity={0.3}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
            >
                <Popup>
                    <h1> <img src={ country.countryInfo.flag } height="20px" width="30px"/> { country.country } </h1>
                    <table className="popup__table">
                        <tr>
                            {/* 1ST ROW, KEYS */}
                            <td>
                                
                            </td>
                            <td>
                                <b>TODAY</b>
                            </td>
                            <td>
                                <b>TOTAL</b>
                            </td>
                        </tr>

                        <tr>
                            {/* 2ND ROW CASES */}
                            <td className="tr__key">
                                Cases
                            </td>
                            <td>
                                {country.todayCases}
                            </td>
                            <td>
                                {country.cases}
                            </td>
                        </tr>

                        <tr>
                            {/* 3RD ROW RECOVERED */}
                            <td className="tr__key">
                                Recovered
                            </td>
                            <td>
                                {country.todayRecovered}
                            </td>
                            <td>
                                {country.recovered}
                            </td>
                        </tr>

                        <tr>
                            {/* 4TH ROW DEATHS */}
                            <td className="tr__key">
                                Deaths
                            </td>
                            <td>
                                {country.todayDeaths}
                            </td>
                            <td>
                                {country.deaths}
                            </td>
                        </tr>
                    </table>
                </Popup>
            </Circle>
    ))
);