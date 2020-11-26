@isTest
public with sharing class WeatherWidgetControllerTest {
    @isTest
    static void testGetResponseWeather(){
        System.Test.setMock(HttpCalloutMock.class, new WeatherServiceMock());
        System.assertEquals('Minsk', WeatherWidgetController.getResponseWeather('Minsk').name);
        System.assertEquals('Minsk', WeatherWidgetController.getResponseWeather(null).name);
    }
}