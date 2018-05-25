/**
 * Created by oleksiy.konkin on 5/17/2018.
 */

function WeatherRequester(anUrl, aLat, aLon, aUnits, aKey){
    this.url = anUrl;
    this.lat = aLat;
    this.lon = aLon;
    this.units = aUnits;
    this.APPID = aKey;
    this.position = {};
}


WeatherRequester.prototype.requestWeather = function(){
    var self = this;

    return $.ajax({
        url: this.url,
        data: {"lat": this.lat,
                "lon": this.lon,
                "units": this.units,
                "APPID": this.APPID
        },
        dataType: 'json',
        async: true,
        accept: {
            json: "application/json"
        },
        success: function(data){
            self.position = data;

            var icon_name = "wi-owm-";
            $("#temp").text(Math.round(self.position.list[0].main.temp * 10)/10);
            $("#location").text(self.position.city.name+","+self.position.city.country);
            $("#descr").text(self.position.list[0].weather[0].description);

            switch(self.position.list[0].sys.pod){
                case "d":
                    icon_name += "day"+"-"+self.position.list[0].weather[0].id;
                    break;
                case "n":
                    icon_name += "night"+"-"+self.position.list[0].weather[0].id;
                    break;
            }

            $("#wIcon").addClass(icon_name);
        }
    });
}

WeatherRequester.prototype.getResult = function(){
    return this.data;
}

function getCoordinates(position){
    var wr = new WeatherRequester("https://api.openweathermap.org/data/2.5/forecast",
                                    position.coords.latitude,
                                    position.coords.longitude,
                                    "metric",
                                    "ae8b41a14cc901f66facc96e63d0c792"
                                    );
    wr.requestWeather();
}

function errorCoordinates(){
    console.log("error retrieving coordinates");
}

function changeMeasurement(){
    if($("#unit").hasClass("wi-celsius")){
        $("#unit").removeClass("wi-celsius").addClass("wi-fahrenheit");
        $("#temp").text(Math.round((($("#temp").text()*9)/5 + 32)*10)/10);
    } else {
        $("#unit").removeClass("wi-fahrenheit").addClass("wi-celsius");
        $("#temp").text( Math.round(((($("#temp").text()-32)*5)/9)*10)/10);
    }
}

function getLocation(){
    if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(getCoordinates, errorCoordinates, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function test(){
    getLocation();
}

window.document.onload = getLocation();
