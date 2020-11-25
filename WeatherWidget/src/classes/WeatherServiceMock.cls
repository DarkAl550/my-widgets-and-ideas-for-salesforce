@isTest
global with sharing class WeatherServiceMock implements HttpCalloutMock {
    global HTTPresponse respond(HTTPrequest request){
        Httpresponse response = new Httpresponse();
        response.setStatusCode(200);
        response.setBody('{"coord":{"lon":27.57,"lat":53.9},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":280.15,"feels_like":276.42,"temp_min":280.15,"temp_max":280.15,"pressure":1017,"humidity":93},"visibility":10000,"wind":{"speed":4,"deg":290},"clouds":{"all":75},"dt":1606306704,"sys":{"type":1,"id":8939,"country":"BY","sunrise":1606283742,"sunset":1606312697},"timezone":10800,"id":625144,"name":"Minsk","cod":200}');
        return response;
    }
}