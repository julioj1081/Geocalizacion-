function mapa(lati, long) {
    //pocisiones de google maps 
    let latitud = lati; //19.658955
    let longitud = long; //-99.138241
    console.log("latidud => ", latitud, " longitud => ", longitud);
    var map = L.map('map').setView([latitud, longitud], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }).addTo(map);

    var circle = L.circle([latitud, longitud], {
        color: '#368AB4',
        fillColor: '#fff333', //#f03
        fillOpacity: 0.5,
        radius: 30
    }).addTo(map);
    //circle.bindPopup("Peligro zona infectada de programadores.");


    L.marker([latitud, longitud]).addTo(map)
        .bindPopup('Hey !! <br>Estas en esta area ?')
        .openPopup();
}

$(document).ready(function () {
    const btn = document.querySelector("#find_btn");
    $("#find_btn").toggle(function () {
        if (!!navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (posicion) {
                    let latitud = posicion.coords.latitude;
                    let longitud = posicion.coords.longitude; 
                    mapa(latitud.toFixed(6), longitud.toFixed(6));
            //hora y fecha
            var today = new Date();

            var m = today.getMonth() + 1;

            var mes = (m < 10) ? 0 + m : m;
            $("#result").html(`
            <p class='cordenadas'>Lat: ${latitud.toFixed(6)}, 
            Long: ${longitud.toFixed(6)}
            </p>
            <hr>
            <br>
            <b><h1>Estamos a </h1>
            <p class='hora'>${today.getDate()} / ${mes} / ${today.getFullYear()}</p>`);
            btn.classList.add("oculta");
                },
                function () {
                    window.alert("nav no permitido");
                }
            )
        }
    })
})




