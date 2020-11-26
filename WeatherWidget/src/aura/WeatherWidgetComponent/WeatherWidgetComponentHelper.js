({
    getWeatherParams : function(component, event) {
        component.find("Id_spinner").set("v.class", 'slds-show');
        var action = component.get("c.getResponseWeather");
        action.setParams({
            "city": component.get("v.cityName")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                component.set("v.weather", result);
                component.find("Id_spinner").set("v.class", 'slds-hide');

                /* Dinamicaly widget's background */
                switch(component.get("v.weather.main")){
                    case "Clear": 
                        component.set("v.changeBack", 'colorClear'); break;
                    case "Rain": 
                        component.set("v.changeBack", 'colorRain'); break;
                    case "Thunderstorm": 
                        component.set("v.changeBack", 'colorThunder'); break;
                    case "Clouds": 
                        component.set("v.changeBack", 'colorCloud'); break;
                    default: 
                        component.set("v.changeBack", "colorDefault"); break;
				}	 
            } else if (state === "ERROR") {
                component.find("Id_spinner").set("v.class", 'slds-hide');
            }
        });
        $A.enqueueAction(action);
    }
})