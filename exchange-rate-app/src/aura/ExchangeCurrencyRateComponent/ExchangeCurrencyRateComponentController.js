({
	fetchRate : function(component, event, helper) {
        helper.getColumns(component, event, helper);
        helper.getBaseCurrency(component, event, helper );
    },
    
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
    
    editRecord : function (component, event, helper){
        var recId = event.getParam('row').Id;
        component.set("v.recordId", recId);
        console.log(recId);
        component.set("v.isOpen", true);
    },
    
    closeModel : function(component, event, helper) {
		component.set("v.isOpen", false);
        helper.getColumns(component, event, helper);
	}

})