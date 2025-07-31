import PropTypes from "prop-types";
import GoogleMapReact from 'google-map-react';

const GoogleMap = ({
    lat=121,
    lng=23.5,
    zoom=12,
    options,
    apiKey
}) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey||"AIzaSyB2D8wrWMY3XZnuHO6C31uq90JiuaFzGws" }}
                defaultCenter={{lat, lng}}
                defaultZoom={zoom}
            >
                <Marker
                    lat={lat}
                    lng={lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
};

GoogleMap.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    zoom: PropTypes.number,
    options: PropTypes.shape({}) 
}

// GoogleMap.defaultProps = {
//     lat: 121,
//     lng: 23.5,
//     zoom: 12,
// };

export default GoogleMap;
const Marker = ({ text }) => <div >
            <img style={{position:'absolute', transform: 'translate(-50%, -100%)', 
            width:'20px',
            height:'25px',
            color:'red'
        }} src={`/img/icon-img/2.png`} alt={text}/>
        </div>;
// const Marker = ({ text }) => <div className="map-marker"><img src={`/img/icon-img/2.png`} alt={text}/></div>;