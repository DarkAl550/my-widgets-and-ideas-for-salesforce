public with sharing class ForecastTriggerHandler extends TriggerHandler {
    protected override void beforeInsert(){
        List<Forecast__c> duplicatedForecasts = new List<Forecast__c>();
        List<Forecast__c> currentForecasts = new List<Forecast__c>();
        for(sObject forecast : Trigger.new){
            Forecast__c currentForecast = (Forecast__c)forecast;
            additionWeatherMessage(currentForecast);
            currentForecasts.add(currentForecast);
        }
        for(Forecast__c duplicate : [SELECT Id, City__c, Date__c, Time__c FROM Forecast__c]){
            for(Forecast__c currentForecast : currentForecasts){
                if(currentForecast.City__c == duplicate.City__c 
                    && currentForecast.Date__c == duplicate.Date__c
                    && currentForecast.Time__c == duplicate.Time__c) {
                        duplicatedForecasts.add(duplicate);
                }
            }
        }
        if(duplicatedForecasts.size() > 0) delete duplicatedForecasts;
    }

    private static void additionWeatherMessage(Forecast__c forecast){
        //adaptive addition values to "Weather Message" field
        Weather_Setting__c wsIns = Weather_Setting__c.getInstance(userinfo.getProfileId());
        comparisonWithTemperature(wsIns, forecast);       
    }
    
    private static void comparisonWithTemperature(Weather_Setting__c ws, Forecast__c forecast){
        if(forecast.Temperature__c >= ws.Upper_Limit__c){
            forecast.WeatherMessage__c = ws.Upper_Limit_Message__c;
        }else if(forecast.Temperature__c <= ws.Lower_Limit__c){
            forecast.WeatherMessage__c = ws.Lower_Limit_Message__c;
        }else{
            forecast.WeatherMessage__c = ws.Normal_Level_Message__c;
        }
    }
}