/**
 * Created by oleksiy.konkin on 5/17/2018.
 */
/*
 ae8b41a14cc901f66facc96e63d0c792
*/

/*
"http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=imperial"
*/

function WeatherRequester(anUrl, aLat, aLon, aUnits, aKey){
    this.url = anUrl;
    this.lat = aLat;
    this.lon = aLon;
    this.units = aUnits;
    this.APPID = aKey;
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
            console.log(self.position);
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
    console.log("position "+position);
    /*
    $.when(wr.requestWeather()).done(function() {
        console.log(wr.getResult());
    });
    */
    console.log(JSON.stringify(wr.requestWeather()));
}

function errorCoordinates(){
    console.log("error retrieving coordinates");
}

function getLocation(){
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition()
        navigator.geolocation.getCurrentPosition(getCoordinates, errorCoordinates, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function test(){
    getLocation();
}

