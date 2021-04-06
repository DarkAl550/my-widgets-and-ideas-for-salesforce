({
    doInit : function(component, event, helper) {
        $A.createComponent("c:NewWorkOrder", {
    
        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
    },
    
    NavigateComponent : function(component, event, helper) {
        if(event.getParam("navigate") == true)
        {
            $A.createComponent("c:NewWorkOrderLineItem", {
        
                }, function(newCmp) {
                    if (component.isValid()) {
                        component.set("v.body", newCmp);
                    }
                });
        }
    }
})