@isTest
public with sharing class WeatherServiceTest {
    @isTest 
    static void testGetWeather(){
        System.Test.setMock(HttpCalloutMock.class, new WeatherServiceMock());
        System.assertNotEquals(null, WeatherService.getWeatherFromService('Hrodna'));
        System.assertNotEquals(null, WeatherService.getWeatherFromService(null));
    }
}