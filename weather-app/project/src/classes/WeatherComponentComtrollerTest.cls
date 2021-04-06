@isTest
public with sharing class WeatherComponentComtrollerTest {
    @isTest(SeeAllData=true) static void testFindForecasts(){
        System.assert(WeatherComponentComtroller.findForecasts('Minsk').size() > 0);
    }
    @isTest(SeeAllData=true) static void testGetForecastsNameToAccordion(){
        System.assert(WeatherComponentComtroller.getForecastsNameToAccordion().size() > 0);
    }
    @isTest(SeeAllData=true) static void testGetForecaststoDatatable(){
        City__c city = new City__c();
        city.Name = 'TEST';
        insert city;
        Forecast__c forecast = new Forecast__c();
        forecast.Name = 'TEST';
        forecast.City__c = city.Id;
        insert forecast;
        System.assert(WeatherComponentComtroller.getForecaststoDatatable('TEST').size() > 0);
    }

}