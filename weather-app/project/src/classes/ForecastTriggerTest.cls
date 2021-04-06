@isTest
public with sharing class ForecastTriggerTest {
    @TestSetup
    static void setup(){
        City__c city = new City__c();
        city.Name = 'Test';
        city.Country__c = 'TE';
        insert city;    
    }
    @isTest static void testBeforeInsert(){ 
        Weather_Setting__c ws = new Weather_Setting__c();
        ws.Api_Key__c = 'test';
        ws.Forecast_Service_URL__c = 'sdfa';
        ws.Lower_Limit__c = 0;
        ws.Lower_Limit_Message__c = 'TEST Lower';
        ws.Normal_Level_Message__c = 'TEST Normal';
        ws.Upper_Limit__c = 10;
        ws.Upper_Limit_Message__c = 'TEST Upper';
        insert ws;
        Forecast__c newForecast1 = new Forecast__c();
        newForecast1.Name = 'Test';
        newForecast1.Date__c = Date.today();
        newForecast1.Temperature__c = -1;
        newForecast1.City__c = [SELECT Id FROM City__c LIMIT 1].Id;
        insert newForecast1;
        update newForecast1;
        delete newForecast1;
        Forecast__c newForecast2 = new Forecast__c();
        newForecast2.Name = 'Test';
        newForecast2.Date__c = Date.today();
        newForecast2.Temperature__c = 1;
        newForecast2.City__c = [SELECT Id FROM City__c LIMIT 1].Id;
        insert newForecast2;
        Forecast__c newForecast3 = new Forecast__c();
        newForecast3.Name = 'Test';
        newForecast3.Date__c = Date.today();
        newForecast3.Temperature__c = 100;
        newForecast3.City__c = [SELECT Id FROM City__c LIMIT 1].Id;
        insert newForecast3;
        System.assertEquals(null, newForecast1.WeatherMessage__c);
    }
    
}