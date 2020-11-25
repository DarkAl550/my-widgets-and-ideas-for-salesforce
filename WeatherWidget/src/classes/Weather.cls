public with sharing abstract class Weather {

    public class WeatherParams
    {
        private Coord coodr;
        private List<WeatherParam> weather;
        private String base;
        private Main main;
        private Integer visibility;
        private Wind wind;
        private Clouds clouds;
        private Integer dt;
        private Sys sys;
        private Integer timezone;
        private Integer id;
        private String name;
        private Integer cod;
    }

    private class Coord{
        private Double lon;
        private Double lat;
    }

    private class WeatherParam{
        private Integer id;
        private String main;
        private String description;
        private String icon;
    }

    private class Main{
        private Double temp;
        private Double feels_like;
        private Double temp_min;
        private Double temp_max;
        private Double pressure;
        private Double humidity;
    }

    private class Wind{
        private Double speed;
        private Double deg;
        private Double gust;
    }

    private class Clouds{
        private Integer all;
    }

    private class Sys{
        private Integer type;
        private Integer id;
        private String country;
        private Integer sunrise;
        private Integer sunset;
    }
}