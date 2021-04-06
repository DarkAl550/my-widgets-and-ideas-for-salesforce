public with sharing class WeatherComponentComtroller { 
    @AuraEnabled(cacheable=true)
    public static List<String> findForecasts(String searchValue){
        searchValue += '%';
        City__c city = [
                        SELECT Id
                        FROM City__c
                        WHERE Name LIKE :searchValue
                        ];
        List<Forecast__c> allForecasts =  [
                            SELECT Id, Name, City__c, Temperature__c, WeatherMessage__c 
                            FROM Forecast__c
                            WHERE City__c = :city.Id AND Date__c >= TODAY
                            ];
        List<String> names = new List<String>();
        for(Forecast__c f : allForecasts){
            if(!names.contains(f.Name)) {
                names.add(f.Name);
            }
        }
        names.sort();
        System.debug(names);
        return names;      
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getForecastsNameToAccordion(){
        List<Forecast__c> allForecasts =  [
                                        SELECT Id, Name, City__c, Temperature__c, WeatherMessage__c 
                                        FROM Forecast__c
            							WHERE Date__c >= TODAY
                                        ];
        List<String> names = new List<String>();
        for(Forecast__c f : allForecasts){
            if(!names.contains(f.Name)) {
                names.add(f.Name);
            }
        }
        names.sort();
        return names;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Forecast__c> getForecaststoDatatable(String forecastName){
        List<Forecast__c> forecasts = [
                                    SELECT Id, Name, City__c, Temperature__c, WeatherMessage__c, Time__c
                                    FROM Forecast__c
                                    WHERE Name = :forecastName
                                    ORDER BY Time__c ASC
                                    ];
        return forecasts;
    }
}