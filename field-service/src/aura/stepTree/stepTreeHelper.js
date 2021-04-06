({
    getWorkTypes : function(component, event) {
        let action = component.get("c.getWorkType");
        action.setCallback(this, function(response) {
            let result = response.getReturnValue();
            
            let listWorks = [];
            for(let i = 0; i < result.length; i++){
                listWorks.push({'label': result[i].Name, 'value': result[i].Id});
            }
            console.log(listWorks);
            component.set("v.selectWorkType", listWorks);
        });
        $A.enqueueAction(action);
    },

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
            component.find("loadingSpinner").set("v.class", "slds-hide");
        });
        $A.enqueueAction(action);
    },

    createNewPruductRequired :function(component, event, helper, workType, product, quantity, unitOfMeasure){
        component.find("loadingSpinner").set("v.class", "slds-show");
        let action = component.get("c.createProductRequired");
        action.setParams({
            "workType" : workType,
            "product" : product,
            "quantity" : quantity,
            "unitOfMeasure" : unitOfMeasure
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
            componentDef : "c:stepFour",
            componentAttributes: {
                startedProduct : component.get("v.productToNextStep")
            }
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