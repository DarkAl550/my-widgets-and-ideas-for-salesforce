public with sharing class WeatherService {
    
    @AuraEnabled
    public static void runService(String searchValue){
        getWeather(searchValue);
    }

    private static void getWeather(String city){
        HttpRequest request = new HttpRequest();
        request.setEndpoint(generateAPI(city));
        request.setMethod('GET');
        request.setTimeout(60000);
        HttpResponse response = new Http().send(request);
        Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        createNewForecasts(result);
    }

    private static String generateAPI(String city){
        Weather_Setting__c ws = Weather_Setting__c.getOrgDefaults();
        String endpoint = ws.Forecast_Service_URL__c + city + '&appid=' + ws.Api_Key__c; 
        return endpoint;
    }

    private static void createNewForecasts(Map<String, Object> weatherResult){
        List<Forecast__c> forecasts = new List<Forecast__c>();
        Map<String, Object> city = (Map<String, Object>) weatherResult.get('city');
        Id forecastCityId = createOrGetCity(city.get('name'), city.get('country'));
        List<Map<String, Object>> myMaps = new List<Map<String, Object>>();
        List<Object> lists = (List<Object>) weatherResult.get('list');
        for (Object obj : lists) {
            myMaps.add((Map<String, Object>)obj);
        }
        for(Integer i=0; i<myMaps.size(); i++){ 
            Map<String, Object> main = (Map<String, Object>) myMaps[i].get('main');
            DateTime dt = DateTime.valueOf(myMaps[i].get('dt_txt') + ':00');
            Date d = Date.newInstance(dt.year(), dt.month(), dt.day());
            Time t = Time.newInstance(dt.hour(), dt.minute(), dt.second(), dt.millisecond());
            Forecast__c forecast = new Forecast__c();
            forecast.Name = city.get('name') + '-' + d.format();
            forecast.Time__c = t;
            forecast.Date__c = d;
            forecast.City__c = forecastCityId;
            forecast.Temperature__c = Double.valueOf(main.get('temp')) - 273.15;
            forecasts.add(forecast);
        }
        insert forecasts;   
        System.debug(forecasts);
        System.debug('Success');  
    }
    
    private static Id createOrGetCity(Object cityName, Object cityCountry){
        try{
            City__c city = [SELECT Id FROM City__c WHERE Name = :(String)cityName];
            return city.Id;
        }catch(Exception ex){
            System.debug(ex.getMessage());
            City__c city = new City__c();
            city.Name = (String)cityName;
            city.Country__c = (String)cityCountry;
            insert city;
            return city.Id;
        }
    }

}