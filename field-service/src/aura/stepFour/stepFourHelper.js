({
    getProducts : function(component, event){
        let action = component.get("c.getProduts");
        action.setCallback(this, function(response) {
            let result = response.getReturnValue();
            let listProducts = [];
            for(let i = 0; i < result.length; i++){
                listProducts.push({'label': result[i].Name, 'value': result[i].Id});
            }
            console.log(listProducts);
            component.set("v.selectProduct", listProducts);
        });
        $A.enqueueAction(action);
    },

    getLocation : function(component, event){
        let action = component.get("c.getLocation");
        action.setCallback(this, function(response) {
            let result = response.getReturnValue();
            let listLocations = [];
            for(let i = 0; i < result.length; i++){
                listLocations.push({'label': result[i].Name, 'value': result[i].Id});
            }
            console.log(listLocations);
            component.set("v.selectLocation", listLocations);
            component.find("loadingSpinner").set("v.class", "slds-hide");
        });
        $A.enqueueAction(action);
    },

    saveItem : function(component, event, helper, product, location, unitOfMeasure, quantity, serialNumber){
        component.find("loadingSpinner").set("v.class", "slds-show");
        let action = component.get("c.saveProductItem");
        action.setParams({
            "product" : product,
            "location" : location,
            "unitOfMeasure" : unitOfMeasure,
            "quantity" : quantity,
            "serialNumber" : serialNumber
        });
        action.setCallback(this, function(response) {
            let result = response.getReturnValue();
            console.log(response.getState());
            helper.showToast(component, event, helper);
        });
        $A.enqueueAction(action);
    },

    showToast : function(component, event, helper) {
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
        component.find("loadingSpinner").set("v.class", "slds-hide");
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:stepOne"
        });
        evt.fire();
        
    },
    showErrorToast : function(component, event, helper) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Error',
            message: 'Complete all requered fields.',
            messageTemplate: 'Record {0} created! See it {1}!',
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
        component.find("loadingSpinner").set("v.class", "slds-hide");
        
        
    },
})