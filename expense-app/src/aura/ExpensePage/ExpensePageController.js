({
    doInit : function(component, event, helper) {
        console.log("Expenses Page");
        let emploeeId = component.get("v.user.Id");
        let month = component.get("v.defMonth");
        let year = component.get("v.defYear");
        helper.getYears(component, event, helper, emploeeId);
        helper.getExpenses(component, event, helper, emploeeId, month, year);
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        component.set("v.lstMonths", months);
        
    },

    selectAccord : function (component, event, helper) {
        let target = event.getParam('openSections');
        component.set("v.accordDate", target.join(', '));


        let cardDate = component.get("v.accordDate");
        let emploeeId = component.get("v.user.Id");
        let monthExId = component.get("v.expenseMonthly.Id");
        helper.getExpenseCard(component, helper, event, cardDate, emploeeId, monthExId);
    },

    createExpense : function (component, event, helper){
        component.set("v.isOpen", true);
    },

    handleNewCardWizardEvent : function (component, event, helper){
        let isOpen = event.getParam("isOpen");
        component.set("v.isOpen", isOpen);
        component.set("v.openIncome", isOpen);
        let emploeeId = component.get("v.user.Id");
        let month = component.get("v.defMonth");
        let year = component.get("v.defYear");
        helper.getYears(component, event, helper, emploeeId);
        helper.getExpenses(component, event, helper, emploeeId, month, year);
    },

    delRecord: function (component, event, helper) {
        var recId = event.getParam('row').Id;
        helper.deleteRow(component, event, helper, recId);       
    },

    getNumMounth : function(component, event, helper){
        let emploeeId = component.get("v.user.Id");
        let month = event.target.id;
        component.set("v.defMonth", month);
        let year = component.get("v.defYear");
        console.log(month);
        
        helper.getCards(component, event, helper, emploeeId, month, year);
        helper.getExpenses(component, event, helper, emploeeId, month, year);
    },
    
    getYearOnClick: function (component, event, helper) {
        let emploeeId = component.get("v.user.Id");
        let month = component.get("v.defMonth");
        let year = event.target.id;
        component.set("v.defYear", year);
        console.log(year);
        helper.getCards(component, event, helper, emploeeId, month, year);
        helper.getExpenses(component, event, helper, emploeeId, month, year);
    },

    openIncomeWindow : function(component, event, helper){
        component.set("v.openIncome", true);

    }
})