({
    getColumns : function(component, event, helper){
        let action = component.get("c.getRateFromObject");

        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let records = response.getReturnValue(); 
                let fields = records;
                
                let columns = [
                    {label: 'Name', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}}
                ];
                
                for(let i=0; i < fields.length; i++){
                    if(fields[i] != component.find("selectRate").get("v.value")){
                        let column ={
                            label : fields[i],
                            fieldName : fields[i] + '__c',
                            type : 'number'
                        };
                        columns.push(column);
                    }
                    
                }
                
                
				columns.push({label: 'Date', fieldName: 'Date__c', type: 'text'});
				console.log(columns);                
                helper.fetchRateHelper(component,event, helper, columns);
                
            }
        });
        $A.enqueueAction(action);
    },
    
	fetchRateHelper : function(component, event, helper, columns) {
		component.find("loadingSpinner").set("v.class", "slds-show");
        /*component.set('v.mycolumns', [
            	{label: 'Name', fieldName: 'linkName', type: 'url', 
            		typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
            	{label: 'EUR', fieldName: 'EUR__c', type: 'number'},
            	{label: 'USD', fieldName: 'USD__c', type: 'number'},
            	{label: 'CAD', fieldName: 'CAD__c', type: 'number'},
            	{label: 'GBP', fieldName: 'GBP__c', type: 'number'},
            	{label: 'Date', fieldName: 'Date__c', type: 'text'}
            ]);*/
        component.set('v.mycolumns', columns);
        var action = component.get("c.getRateByDate");
        action.setParams({
            "d1": component.get("v.date1"),
            "d2": component.get("v.date2"),
            "selectRate" : component.find("selectRate").get("v.value")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var records =response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = '/'+record.Id;
                });
                component.set("v.rateList", response.getReturnValue());
                component.find("loadingSpinner").set("v.class", "slds-hide");
                helper.sortData(component, component.get("v.sortedBy"), component.get("v.sortedDirection"));
                
            }
        });
        $A.enqueueAction(action);
    },
    
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.rateList");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.rateList", data);
    },

    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
        function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    
    
    
    getBaseCurrency : function(component, event, helper){
        var action = component.get("c.getRateFromObject");
        action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            component.set("v.listBaseRates", result);
            
        });
        $A.enqueueAction(action);
    },
    

})