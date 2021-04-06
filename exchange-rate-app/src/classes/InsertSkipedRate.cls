global class InsertSkipedRate implements
	Database.Batchable<sObject>, Database.Stateful {
    
    // instance member to retain state across transactions
    global Integer recordsProcessed = 0;
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT ' + 
            String.join(new List<String>(Schema.getGlobalDescribe().get('Exchange_Rate__c').getDescribe().fields.getMap().keySet()), ',') + 
            ' FROM Exchange_Rate__c WHERE Log__r.Status_Code__c != \'ERROR\''
        );
    }
    global void execute(Database.BatchableContext bc, List<Exchange_Rate__c> rates){
        // process each batch of records
        
        for (Exchange_Rate__c rate : rates) {      
                ExchangeCurrencyRateLogic.updateRecords(rate);
                recordsProcessed = recordsProcessed + 1;      
        }
        
    }    
    global void finish(Database.BatchableContext bc){
        System.debug(recordsProcessed + ' records processed.');
        
    }
}