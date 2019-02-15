function initMap() {
  let options = {
    zoom: 6,
    center: { lat: 55.605, lng: 13.0038 }
  };

  let map = new google.maps.Map(
    document.getElementById("map"),
    options
  );

  google.maps.event.addListener(map, "click", () => {
    infoWindow.close();
  });

  let markers = [
    {
      coords: { lat: 57.7089, lng: 11.9746 },
      info: "Resident: 2.5 years"
    },
    {
      coords: { lat: 55.605, lng: 13.0038 },
      info: "Resident: 1 year"
    },
    {
      coords: { lat: 55.6761, lng: 12.5683 },
      info: "Tourist: 10 days"
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

    let infoWindow = new google.maps.InfoWindow({
      content: props.info
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  }
}
