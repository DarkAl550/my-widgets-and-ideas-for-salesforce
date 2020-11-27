public with sharing class WeatherWidgetController extends Weather {
    public class ResponseWeather{
        @AuraEnabled
        public String name { get; set; }
        @AuraEnabled
        public String country { get; set; }
        @AuraEnabled
        public Integer id { get; set; }
        @AuraEnabled
		public String main { get; set; }
        @AuraEnabled
		public String description { get; set; }
        @AuraEnabled
		public String icon { get; set; }
        @AuraEnabled
        public Decimal temp { get; set; }
        @AuraEnabled
        public Double wind { get; set; }
        @AuraEnabled
        public Double pressure { get; set; }
        @AuraEnabled
        public Double humidity { get; set; }
    }
    
    @AuraEnabled
    public static ResponseWeather getResponseWeather(String city){
        WeatherParams weatherParams = WeatherService.getWeatherFromService(city);
        ResponseWeather responseWeather = new ResponseWeather();
        responseWeather.name = weatherParams.name;
        responseWeather.country = weatherParams.sys.country;
        responseWeather.id = weatherParams.weather[0].id;
        responseWeather.main = weatherParams.weather[0].main;
        responseWeather.description = weatherParams.weather[0].description;
        responseWeather.icon = weatherParams.weather[0].icon;
        responseWeather.temp = Math.round(weatherParams.main.temp - 273.15);//Convert from K to *C
        responseWeather.wind = Math.round((weatherParams.wind.speed / 3.6) * 100) / 100.0;//Convert to m/s
        responseWeather.pressure = weatherParams.main.pressure;
        responseWeather.humidity = weatherParams.main.humidity;
        return responseWeather;
    }
}