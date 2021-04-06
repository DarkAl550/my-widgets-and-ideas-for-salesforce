({
    getOfficesStatistics : function(component, event, helper, year) {
        component.find("loadingSpinner").set("v.class", "slds-show");
        let action = component.get("c.getOfficeStatistic");
        action.setParams({
            "year" : year
        });
        action.setCallback(this, $A.getCallback(function(response) {
            let result = response.getReturnValue();
            component.set("v.officeStatistics", result);
            helper.getSumm(component, event, helper, result);
            console.log(result);
            console.log(year);
        }));
        $A.enqueueAction(action);
    },

    checkValidOffice : function(component, event, clickOffice){
        let action = component.get("c.getOffice");
        action.setParams({
            "keeperId" : component.get("v.user.Id")
        });
        action.setCallback(this, $A.getCallback(function(response) {
            let result = response.getReturnValue();
            console.log("User office: " + result);
            if(clickOffice == result){
                component.set("v.showExpensePage", true);
                component.set("v.showMessage", false);
            }else{
                component.set("v.showMessage", true);
            }
        }));
        $A.enqueueAction(action);
    },

    getAllYears: function (component, event, helper) {
        let action = component.get("c.getYears");
        action.setCallback(this, $A.getCallback(function(response) {
            let result = response.getReturnValue();
            result.sort();
            component.set("v.years", result);
            console.log(result);
            component.find("loadingSpinner").set("v.class", "slds-hide");
        }));
        $A.enqueueAction(action);
    },

    getSumm : function(component, event, helper, result){
        let listSum = [];
        let totalSum = 0;
        for(let i = 0; i<12;i++){
            listSum.push(0);
        }
        for(let i = 0; i<result.length; i++){
            for(let j=0; j< result[i].monthExpense.length; j++){
                listSum[j] += result[i].monthExpense[j];    
            }
            totalSum += result[i].total;
        }
        component.set("v.totalSum", totalSum);
        component.set("v.sumMonthly", listSum);
        console.log("LIST SUM: "+listSum);
        
    }
})