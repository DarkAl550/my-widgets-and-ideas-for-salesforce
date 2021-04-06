({
   
    doInit : function(component, event, helper){
        component.find("loadingSpinner").set("v.class", "slds-show");
    },

    onLoadedForm : function(component, event, helper) {
        component.find("loadingSpinner").set("v.class", "slds-hide");    
    },

    onSubmitingForm : function(component, event, helper){
        component.find("loadingSpinner").set("v.class", "slds-show");
    },

    showSuccessToast : function(component, event, helper) {
        component.find("loadingSpinner").set("v.class", "slds-hide");
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success',
            message: 'The record created successfully!',
            messageTemplate: 'Record {0} created! See it {1}!',
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:stepTwo"
        });
        evt.fire();
        
    },
})