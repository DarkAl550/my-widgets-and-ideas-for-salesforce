@isTest
public with sharing class WeatherTest {
    @isTest
    static void testGetSet(){
        Weather.WeatherParams.coord.lon lon = 27.57;
        System.assertEquals(27.57, lon);
        Weather.WeatherParams.coord.lat lat = 53.9;
        System.assertEquals(27.57, lat);
    }
}