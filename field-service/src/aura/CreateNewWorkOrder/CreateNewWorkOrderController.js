({
	doInit : function(component, event, helper) {
		component.find("loadingSpinner").set("v.class", "slds-show");
	},

	onLoadedForm : function(component, event, helper) {
        component.find("loadingSpinner").set("v.class", "slds-hide");    
    },

    onSubmitingForm : function(component, event, helper){
        component.find("loadingSpinner").set("v.class", "slds-show");
    },

	toCreateNewWorkOrderLineItem : function(component) {
		var newEvent = $A.get("e.force:navigateToComponent");
		newEvent.setParams({
			componentDef: "c:CreateNewWorkOrderLineItem",
			componentAttributes: {
				//Set you attributes here if required.
			}
		});
		newEvent.fire();
	}
})