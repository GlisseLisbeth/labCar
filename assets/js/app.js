function initMap() {
    var ubicacion;
    var mapLabcar = {lat: -12.1191427, lng: -77.0349046};
    var map = new google.maps.Map(document.getElementById("map"),{
        zoom: 18, 
        center: mapLabcar,
    });
    var markLabCar = new google.maps.Marker({
        position: mapLabcar,
        map: map
    });

    function geolocalizar(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(encontrado, noEncontrado);
        }
    }

    window.addEventListener("load",geolocalizar);  
    var latitud, longitud;
    var encontrado = function(posicion){
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;
        var miIcon = new google.maps.MarkerImage('assets/img/user.png',
            new google.maps.Size(100,50),
            new google.maps.Point(0,0),
            new google.maps.Point(50,50)
        );
            ubicacion = new google.maps.Marker({
            position: {lat: latitud, lng: longitud},
            map: map,
            icon: miIcon,
            title:"Estoy aqui"
        });

        map.setZoom(15);
        map.setCenter({lat: latitud, lng: longitud});
    }
    var noEncontrado = function(error){
        alert("Tenemos un problema con encontrar tu ubicacion");
    }
    
    var inputPartida = document.getElementById("input-partida");
    var inputDestino = document.getElementById("input-destino");
   
    new google.maps.places.Autocomplete(inputPartida);
    new google.maps.places.Autocomplete(inputDestino);
    var directionsService = new google.maps. DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
   }