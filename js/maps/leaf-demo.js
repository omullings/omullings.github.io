// See post: http://asmaloney.com/2014/01/code/creating-an-interactive-map-with-leaflet-and-openstreetmap/

var map = L.map( 'applicationMap', {
    center: [24.7251918, 46.8225288],
    minZoom: 2,
    zoom: 6
});

L.tileLayer( 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );


for ( var i=0; i < markers.length; ++i )
{
  var application_status = markers[i]['application_status'];

  var online_status = "online" ;
  var down_status = "down" ;
  var offline_status = "offline" ;


    if( application_status === online_status ){
    var myIcon = L.icon({
        iconUrl: myURL + 'images/up.svg',
        iconRetinaUrl: myURL + 'images/up.svg',
        iconSize: [ 24, 24],
        iconAnchor: [12, 21],
        popupAnchor: [ 0 , -14]
    });
  } else if (application_status ===  down_status ) {
    var myIcon = L.icon({
        iconUrl: myURL + 'images/down.svg',
        iconRetinaUrl: myURL + 'images/down.svg',
        iconSize: [24, 24],
        iconAnchor: [12, 21],
        popupAnchor: [ 0 , -14]
    });
  } else if (application_status ===  offline_status ) {
    var myIcon = L.icon({
        iconUrl: myURL + 'images/offline.svg',
        iconRetinaUrl: myURL + 'images/offline.svg',
        iconSize: [24, 24],
        iconAnchor: [12, 21],
        popupAnchor: [ 0 , -14]
    });
  } else {

  }

   L.marker( [markers[i].lat, markers[i].lng], {icon: myIcon} )
      .bindPopup( '<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>' )
      .addTo( map );
}
