({
    doInit: function (component, event, helper) {
        component.find("loadingSpinner").set("v.class", "slds-show");
        helper.getWorkTypes(component, event);
        helper.getProducts(component, event);
        component.set("v.quantityUnitOfMeasure",
            [
                {'label': '--None--', 'value': null},
                {'label': 'Each', 'value': 'Each'},
            ]
       );
       
       console.log("WorkType : "+component.get("v.startedWorkType"));
    },

    handleChange: function (component, event) {
        let selectedOptionValue = event.getParam("value");
    },

    nextStep : function(component, event, helper){
        let workType = component.find("perentRecord").get("v.value");
        let product = component.find("productRequired").get("v.value");
        let quantity = component.get("v.quantity");
        let unitOfMeasure = component.find("unitOfMeasure").get("v.value");
        console.log(workType);
        console.log(product);
                
        if(workType == null || product == null){
        	helper.showErrorToast(component, event, helper);
        }else{
            helper.createNewPruductRequired(component, event, helper, workType, product, quantity, unitOfMeasure);
            
        }
        
        
        
    }
})