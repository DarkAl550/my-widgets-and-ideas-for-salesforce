({
    checkLogin : function(component, helper, event, email, password) {
        component.find("loadingSpinner").set("v.class", "slds-show");
        var action = component.get("c.checkLoginData");
        action.setParams({
            "email" : email,
            "pass" : password
        });
        action.setCallback(this, function(response) {
            console.log(response.getState());
            if(response.getState() === "SUCCESS"){
                var result = response.getReturnValue();
                component.set("v.user", result);
                component.set("v.successLog", true);
                let admin = component.get("v.user.Admin__c");
                component.set("v.isAdmin", admin);
                console.log(result);
                console.log(component.get("v.user.Admin__c"));

                component.set("v.Message", false);

                let logEvent = component.getEvent("logEvent");
                logEvent.setParams({
                    "user" : component.get("v.user"),
                    "successLog" : component.get("v.successLog"),
                    "isAdmin" : component.get("v.isAdmin")
                });
                logEvent.fire();
                component.find("loadingSpinner").set("v.class", "slds-hide");
                
            }else{
                component.set("v.Message", true);
                component.find("loadingSpinner").set("v.class", "slds-hide");
            }
            
        });
        $A.enqueueAction(action);
    },

    
})