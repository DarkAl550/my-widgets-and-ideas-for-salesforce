({
	closeModel : function(component, event, helper) {
		let closeEvent = component.getEvent("closeEvent");
        closeEvent.setParams({
            "isOpen" : false
        });
        closeEvent.fire();
    },
    
    saveCard : function(component, event, helper){
        let amount = component.get("v.amount");
        let dateCard = component.get("v.dateCard");
        let description = component.get("v.description");
        let keeperId = component.get("v.user.Id");
        helper.save(component, event, helper, keeperId, amount, dateCard, description);

    }
})