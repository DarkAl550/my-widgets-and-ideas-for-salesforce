({
    doInit : function(component, event, helper) {
        var city = component.get("v.cityName");
        helper.getWeatherParams(component, event);
    }
})