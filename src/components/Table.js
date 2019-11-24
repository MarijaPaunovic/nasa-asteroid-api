import React from 'react';

const tableStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(5, 1fr)',
	gridGap: 5,
	gridAutoRows: '50px 200px',
	textAlign: 'center',
	alignItems: 'center',
	padding: '0 20px',
};

const Table = ({ filteredAsteroids }) => {
	
	const displayAsteroids = () => {
		if (filteredAsteroids.length) {
			return filteredAsteroids.map( singleAsteroid => 
				<div key={singleAsteroid.id} style={tableStyle}>
					<div>{singleAsteroid.close_approach_data[0].close_approach_date}</div>
					<div>{singleAsteroid.name}</div>
					<div>{singleAsteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}</div>
					<div>{singleAsteroid.estimated_diameter.kilometers.estimated_diameter_min}</div>
					<div>{singleAsteroid.estimated_diameter.kilometers.estimated_diameter_max}</div>
				</div>
			);
		} else {
			return (
				<div style={{margin: '40px', textAlign: 'center'}}>
					<em>No selected asteroids</em>
				</div>
			)
		}
	};

	return (
		<div>
			<div style={{border: '1px solid grey'}}>
				<div style={tableStyle}>
					<h6>Date</h6>
					<h6>Name</h6>
					<h6>Speed (km/h)</h6>
					<h6>Min. Diameter (m)</h6>
					<h6>Max. Diameter (m)</h6>
				</div>
			{displayAsteroids()}
			</div>

		</div>
	);
};

export default Table;
