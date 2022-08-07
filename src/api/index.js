import axios from "axios";

const URL =
	"https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlacesData = async (sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(URL, {
			params: {
				bl_latitude: sw.lat,
				tr_latitude: ne.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
			},
			headers: {
				"X-RapidAPI-Key": "e4785e2529msh0dca32bddf3cc13p1f4909jsnc417f253e639",
				"X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
			},
		});

		return data;
	} catch (e) {
		console.log(e);
	}
};
