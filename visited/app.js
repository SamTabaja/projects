let latInput = document.querySelector("#latInput");
let longInput = document.querySelector("#longInput");
function initMap() {
  let options = {
    zoom: 4,
    center: { lat: 41.5027, lng: 18.1454 }
  };

  let map = new google.maps.Map(
    document.getElementById("map"),
    options
  );

  google.maps.event.addListener(map, "click", event => {
    let latitude = event.latLng.lat();
    let longitude = event.latLng.lng();
    latInput.value = latitude;
    longInput.value = longitude;
    //console.log(event);
  });

  let markers = [
    {
      coords: { lat: 57.7089, lng: 11.9746 }
    },
    {
      coords: { lat: 55.605, lng: 13.0038 }
    },
    {
      coords: { lat: 55.6761, lng: 12.5683 }
    },
    {
      coords: { lat: 33.8938, lng: 35.5018 }
    },
    {
      coords: { lat: 31.9454, lng: 35.9284 }
    },
    {
      coords: { lat: 31.9454, lng: 35.9284 }
    },
    {
      coords: { lat: 29.3117, lng: 47.4818 }
    },
    {
      coords: { lat: 33.5138, lng: 36.2765 }
    },
    {
      coords: { lat: 52.52, lng: 13.405 }
    },
    {
      coords: { lat: 48.1351, lng: 11.582 }
    },
    {
      coords: { lat: 51.2277, lng: 6.7735 }
    },
    {
      coords: { lat: 51.1886, lng: 7.4992 }
    },
    {
      coords: { lat: 52.368, lng: 4.9036 }
    },
    {
      coords: { lat: 41.3851, lng: 2.1734 }
    },
    {
      coords: { lat: 48.8566, lng: 2.3522 }
    },
    {
      coords: { lat: 41.9028, lng: 12.4964 }
    },
    {
      coords: { lat: 59.3293, lng: 18.0686 }
    },
    {
      coords: { lat: 40.4168, lng: -3.7038 }
    },
    {
      coords: { lat: 38.7198, lng: -9.1406 }
    },
    {
      coords: { lat: 37.0212, lng: -7.9271 }
    },
    {
      coords: { lat: 37.0841, lng: -8.2456 }
    }
  ];

  markers.forEach(e => {
    addCityMarker(e);
  });

  function addCityMarker(props) {
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });

    // let infoWindow = new google.maps.InfoWindow({
    //   content: props.info
    // });

    // marker.addListener("click", () => {
    //   infoWindow.open(map, marker);
    // });
  }
}
