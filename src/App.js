
//todo: finish tut min 3:52:31

import { useState, useEffect } from "react";
//custom components
import InfoBox from "./InfoBox.jsx";
import Map from "./Map.jsx";
import Table from "./Table.jsx";
import LineGraph from "./LineGraph.jsx";
import "leaflet/dist/leaflet.css";
import { sortData } from "./util";

// material ui components
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import './App.css';

function App() {

  const [ countries, setCountries ] = new useState([]);
  const [ country, setCountry ] = new useState('worldwide');
  const [ countryInfo, setCountryInfo ] = new useState({});
  const [ tableData, setTableData ] = new useState([]);
  const [ mapCenter, setMapCenter ] = new useState({ lat: 51.509865, lng: -0.118092 });
  const [ mapZoom, setMapZoom ] = new useState(3);
  const [ mapCountries, setMapCountries ] = new useState([]);

  //This use effect is triggered always to populate worldwide at load.
  // Then onCountryChange can override the data if form is changed.
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((res, err) => err ? console.log(err) : res.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);

  const onCountryChange = async (event) => {

    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {

      setCountry(countryCode);
      setCountryInfo(data);
      
      setMapCenter( [ data.countryInfo.lat, data.countryInfo.long ] );
      setMapZoom(5);
    });
  };

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const countries = data.map(country => (
          { 
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag
          }));
          
          const sortedData = sortData(data)
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);

      });

    }; //async closing bracket

    getCountriesData();
  } /* useEffect closing bracket */, []);

  // console.log("DATA PREVIEW HERE: ===>>> ", mapCountries);
  return (
    <div className="app">
      <div className="app__left">
            <div className="app__header">

              <h1> Covid-19  Tracker </h1>

              <div>
              <FormControl>
                <Select
                  onChange={onCountryChange}
                  variant="outlined"
                  value={country}>

                  <MenuItem value="worldwide"> Worldwide </MenuItem>

                  {countries.map(country => (
                  <MenuItem key={country.name} value={country.value}> 
                     <img src={country.flag} width="30px" height="20px" alt="" /> {'\xa0\xa0' + country.name}  
                  </MenuItem>
                  ))}
        
                </Select>
              </FormControl>
              </div>

            </div>

            <div className="app__stats">

              <InfoBox 
                title="Coronavirus cases"
                cases={countryInfo.todayCases}
                total={countryInfo.cases}>
              </InfoBox>

              <InfoBox 
                title="Recovered" 
                cases={countryInfo.todayRecovered} 
                total={countryInfo.recovered}>
              </InfoBox>

              <InfoBox 
                title="Deaths" 
                cases={countryInfo.todayDeaths} 
                total={countryInfo.deaths}>
              </InfoBox>
            </div>
        
          <Map 
          countries={ mapCountries } 
          center={ mapCenter } 
          zoom={ mapZoom } />

      </div>
  
      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country </h3>
          <Table tableData={tableData} />

          <h3> Worldwide new cases </h3>
          <LineGraph />
        </CardContent>

      </Card>

    </div>
  );
}

export default App;
