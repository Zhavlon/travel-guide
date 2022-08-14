import { React, useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";

import { getPlacesData } from "./api";

const App = () => {
	const [places, setPlaces] = useState([]);
	const [coordinates, setCoordinates] = useState({});
	const [bounds, setBounds] = useState(null);

	const [childClicked, setChildClicked] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				setCoordinates({ lat: latitude, lng: longitude });
			}
		);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getPlacesData(bounds?.sw, bounds?.ne).then(data => {
			setPlaces(data);
			setIsLoading(false);
		});
	}, [coordinates, bounds]);

	return (
		<>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: "100%" }}>
				<Grid item xs={12} md={4}>
					<List
						isLoading={isLoading}
						childClicked={childClicked}
						places={places}
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<Map
						coordinates={coordinates}
						setBounds={setBounds}
						setCoordinates={setCoordinates}
						places={places}
						setChildClicked={setChildClicked}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default App;
