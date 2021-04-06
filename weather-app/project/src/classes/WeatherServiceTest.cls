@isTest
public with sharing class WeatherServiceTest {
    @isTest static void testGetWeather(){
        System.Test.setMock(HttpCalloutMock.class, new WeatherServiceMock());
        WeatherService.runService('Minsk');
        List<Forecast__c> f = [SELECT Id FROM Forecast__c];
        System.assert(f.size()>0);
        
    }
}