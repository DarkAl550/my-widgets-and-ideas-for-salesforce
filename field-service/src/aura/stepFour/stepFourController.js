({
    doInit : function(component, event, helper){
        component.find("loadingSpinner").set("v.class", "slds-show");
        helper.getProducts(component, event);
        helper.getLocation(component, event);
        component.set("v.quantityUnitOfMeasure",
            [
                {'label': '--None--', 'value': null},
                {'label': 'Each', 'value': 'Each'},
            ]
       );
    },

    handleChange: function (component, event) {
        let selectedOptionValue = event.getParam("value");
    },

    saveProductIt: function(component, event, helper){
        let product = component.find("productName").get("v.value");
        let location = component.find("location").get("v.value");
        let unitOfMeasure = component.find("unitOfMeasure").get("v.value");
        let quantity = component.get("v.quantity");
        let serialNumber = component.get("v.serialNumber");
        if(product == null || location == null || quantity == null){
            helper.showErrorToast(component, event, helper);
        }else{
        	helper.saveItem(component, event, helper, product, location, unitOfMeasure, quantity, serialNumber);
        }
        
        
    }
})