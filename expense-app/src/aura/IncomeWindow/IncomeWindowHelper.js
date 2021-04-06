({
    purchaseBalance : function(component, event, helper, income, monExId) {
        var action = component.get("c.incomeBalance");
        action.setParams({
            "income" : income,
            "monExId" : monExId
        });
        action.setCallback(this, function(response) {
            
            let closeEvent = component.getEvent("closeEvent");
            closeEvent.setParams({
                "isOpen" : false
            });
            closeEvent.fire();
        });
        $A.enqueueAction(action);
    }
})