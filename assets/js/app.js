function initMap() {
    var miUbicacion;
    var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};
    var map = new google.maps.Map(document.getElementById("map"),{
        zoom: 18, 
        center: laboratoriaLima,
    });
    var markadorLaboratoria = new google.maps.Marker({
        position: laboratoriaLima,
        map: map
    });

    function buscar(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
        }
    }

    window.addEventListener("load",buscar);  
    var latitud, longitud;
    var funcionExito = function(posicion){
        latitud = posicion.coords.latitude;
        longitud = posicion.coords.longitude;
        var miIcon = new google.maps.MarkerImage('assets/img/user.png',
            new google.maps.Size(100,50),
            new google.maps.Point(0,0),
            new google.maps.Point(50,50)
        );
            miUbicacion = new google.maps.Marker({
            position: {lat: latitud, lng: longitud},
            map: map,
            icon: miIcon,
            title:"Estoy aqui"
        });

        map.setZoom(18);
        map.setCenter({lat: latitud, lng: longitud});
    }
    var funcionError = function(error){
        alert("Tenemos un problema con encontrar tu ubicacion");
    }
    
    var inputPartida = document.getElementById("input-partida");
    var inputDestino = document.getElementById("input-destino");
    var tarifa = document.getElementById("tarifa");
    new google.maps.places.Autocomplete(inputPartida);
    new google.maps.places.Autocomplete(inputDestino);
    var directionsService = new google.maps. DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
        directionsService.route({
           origin: inputPartida.value,
            destination: inputDestino.value,
            travelMode: 'DRIVING'
        }, function(response, status){
            if( status === "OK"){
                var distancia = Number((response.routes[0].legs[0].distance.text.replace("km", "")).replace(",","."));
                tarifa.classList.remove("none");
                
                var costo = distancia * 1.75;
                
                if(costo < 4){
                    tarifa.innerHTML = "S/. 4";
                }
                tarifa.innerHTML = "S/. "+ parseInt(costo);
                
                console.log(tarifa);
                directionsDisplay.setDirections(response);
                /*miUbicacion.setMap(null);*/
            }
            else{
                window.alert("No encontramos una ruta");
            }
        });
    }
    
    directionsDisplay.setMap(map);
    var trazarRuta = function(){
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);
}