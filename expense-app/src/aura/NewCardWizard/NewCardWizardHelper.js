({
	save : function(component, event, helper, keeperId, amount, dateCard, description) {
		console.log("SAVE");
		console.log(amount+ " __ "+dateCard+" __ " + description + " __ "+ keeperId);
		var action = component.get("c.createExpenseCard");
		action.setParams({
			'keeperId' : keeperId,
			'amount' : amount,
			'description' : description,
			'cardDate' : dateCard
		});
		action.setCallback(this, function(response) {
			var result = response.getReturnValue();
			console.log(result);
			var toastEvent = $A.get("e.force:showToast");
			toastEvent.setParams({
				"title": "Success!",
				"message": "The Expense Card create successfully."
			});
			toastEvent.fire();
			let closeEvent = component.getEvent("closeEvent");
			closeEvent.setParams({
				"isOpen" : false
			});
			closeEvent.fire();
		});
		$A.enqueueAction(action);
	}
})