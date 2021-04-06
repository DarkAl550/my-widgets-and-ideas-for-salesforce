({
    getExpenses : function(component, event, helper, emploeeId, month, year) {
        component.find("loadingSpinner").set("v.class", "slds-show");
        var action = component.get("c.getMonthlyExpense");
        action.setParams({
            'contactId' : emploeeId,
            'month' : month,
            'year' : year
        });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            console.log(response);
            if(result == null){
                component.set("v.notRec", false);
                component.find("loadingSpinner").set("v.class", "slds-hide");
            }else{
                component.set("v.notRec", true);
                component.set("v.expenseMonthly", result);
                console.log("getExpenses: " + result);
                component.find("loadingSpinner").set("v.class", "slds-hide");
                helper.getCards(component, event, helper, emploeeId, month, year);
            }
            
            
        });
        $A.enqueueAction(action);
    },

    getCards : function(component, event, helper, emploeeId,  month, year){
        component.find("loadingSpinner").set("v.class", "slds-show");
        var action = component.get("c.getCardsDate");
        action.setParams({
            'contactId' : emploeeId,
            'month' : month,
            'year' : year 
        });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            console.log("getCards: "+result);
            result = result.sort();
            component.set("v.expenseCardsDate", result);
            helper.getYears(component, event, helper, emploeeId);
            component.find("loadingSpinner").set("v.class", "slds-hide");
        });
        $A.enqueueAction(action);
    },

    getExpenseCard: function (component, helper, event, cardDate, emploeeId, monthExId) {
        component.set('v.mycolumns', [
            {label: 'Description', fieldName: 'Description__c', type: 'text'},
            {label: 'Amount', fieldName: 'Amount__c', type: 'currency'},
            {label: "Action", fieldName:"Action",type: "button", typeAttributes: {
                label: 'Delete',
                name: 'Delete',
                title: 'Delete',
                disabled: false,
                value: 'delete',
                iconPosition: 'left'
            }}
        ]);
        component.set("v.isLoading", true);
        component.set("v.expenseCards", null);
        var action = component.get("c.getExCards");
        action.setParams({
            'contactId' : emploeeId,
            'cardDate' : cardDate
        });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            component.set("v.expenseCards", result);
            helper.getTotalAmount(component, event, helper, emploeeId, cardDate);
            console.log("getExpenseCard: "+result);
            
        });
        $A.enqueueAction(action);
        
    },

    deleteRow: function (component, event, helper, recId) {
        var action = component.get("c.deleteExpenseCard");
        action.setParams({
            "recId" : recId
        });
        action.setCallback(this, function(response) {
            let emploeeId = component.get("v.user.Id");
            let year = component.get("v.defYear");
            let month = component.get("v.defMonth");
            helper.getCards(component, event, helper, emploeeId, month, year);
            helper.getExpenses(component, event, helper, emploeeId, month, year);
             
        });
        $A.enqueueAction(action);
    },

    getYears :function (component, event, helper, emploeeId){
        var action = component.get("c.getYears");
        action.setParams({
            "contactId" : emploeeId   
        });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            
            result.sort();
            console.log("getYears: "+result);
            component.set("v.lstYears", result);

        });
        $A.enqueueAction(action);
    },

    getTotalAmount: function (component, event, helper, emploeeId, cardDate) {
        var action = component.get("c.totalExCardAmount");
        
        action.setParams({
            'contactId' : emploeeId,
            'cardDate' : cardDate
        });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            component.set("v.totalAmount", result);
            component.set("v.isLoading", false);
            
            console.log(result);
        });
        $A.enqueueAction(action);
    },

    
})