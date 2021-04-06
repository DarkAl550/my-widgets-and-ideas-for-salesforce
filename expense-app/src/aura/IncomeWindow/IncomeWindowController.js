({
    closeModel : function(component, event, helper) {
		let closeEvent = component.getEvent("closeEvent");
        closeEvent.setParams({
            "isOpen" : false
        });
        closeEvent.fire();
    },

    purseBalance : function(component, event, helper){
        let monExId = component.get("v.expenseMonthly.Id");
        let income = component.get("v.addBalance");
        helper.purchaseBalance(component, event, helper, income, monExId);
    }
})