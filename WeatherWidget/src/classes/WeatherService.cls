public with sharing class WeatherService extends Weather  {

    public static WeatherParams getWeatherFromService(String city){
        WeatherWidget_Setting__mdt widgetSettings = Database.query('SELECT ServiceURL__c, APIKey__c, DefaultCity__c FROM WeatherWidget_Setting__mdt LIMIT 1');
        city = (city != null) ? city : widgetSettings.DefaultCity__c;
        String endPointURL = widgetSettings.ServiceURL__c + 'data/2.5/weather?q=' + city + '&appid=' + widgetSettings.APIKey__c;
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endPointURL);
        request.setMethod('GET');
        request.setTimeout(60000);
        HttpResponse response = new Http().send(request);
        WeatherParams w = (WeatherParams)JSON.deserialize(response.getBody(), WeatherParams.class);
        return w;
    }

}