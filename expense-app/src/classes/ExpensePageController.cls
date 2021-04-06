public with sharing class ExpensePageController {
    @AuraEnabled
    public static Monthly_Expense__c getMonthlyExpense(String contactId, String month, String year){
        Integer convertMonth = Integer.valueOf(month) + 1;
        String date1 = year + '-' + month + '-01';
        String date2;
        if(convertMonth < 10){
            date2= year + '-' + 0 + convertMonth + '-01' ;
        }else{
            date2 = year + '-' + convertMonth + '-01' ;
        }
        try{
            Contact c = [SELECT Office__c FROM Contact WHERE Id = :contactId];

            Monthly_Expense__c monthly = [SELECT Balance__c, SpentAmount__c, Month_Date__c, Reminder__c FROM Monthly_Expense__c WHERE Keeper__r.Office__c = :c.Office__c AND Month_Date__c >= :Date.valueOf(date1) AND Month_Date__c < :Date.valueOf(date2)];
            System.debug(monthly);
            return monthly;
        }catch(Exception ex){
            System.debug(ex);
            return null;
        }
    }
	
    @AuraEnabled
    public static List<Date> getCardsDate(Id contactId, Integer month, String year){
        String date1 = (month < 10) ? year + '-' + '0' + month + '-01' : year + '-' + month + '-01' ;
        month += 1;
        if(month>12){
            month = 1;
        }
        String date2 = (month < 10) ? year + '-' + '0' + month + '-01' : year + '-' + month + '-01' ;
        
        System.debug(date1);
        System.debug(date2);
        List<Date> dateList = new List<Date>();
        List<Date> helpDateList = new List<Date>();
        List<Expense_Card__c> cardsDate = Database.query('SELECT CardDate__c FROM Expense_Card__c WHERE Card_Keeper__r.Id = :contactId AND CardDate__c >= ' + date1 + ' AND CardDate__c < ' + date2);
        for(Expense_Card__c getCardDate : cardsDate){
            dateList.add(getCardDate.CardDate__c);
        }
        for(Date dateCard1 : dateList){
            for(Date dateCard2 : dateList){
                if(dateCard1 == dateCard2 && !helpDateList.contains(dateCard1)){
                    helpDateList.add(dateCard1);
                    System.debug(dateCard1);
                }
            }
        }
        System.debug(helpDateList);
        return helpDateList;
    }
    
    @AuraEnabled
    public static List<Expense_Card__c> getExCards(Id contactId,  String cardDate){
        List<Expense_Card__c> cardsTst = Database.query('SELECT Id, Amount__c, CardDate__c, Description__c FROM Expense_Card__c WHERE Card_Keeper__r.Id = :contactId AND CardDate__c = ' + cardDate);
        
        return cardsTst;
    }
    
    @AuraEnabled
    public static void deleteExpenseCard(Id recId){
        Expense_Card__c deleteExpenseCard = [SELECT Id FROM Expense_Card__c WHERE Id = :recId];
        delete deleteExpenseCard;
    }
    @AuraEnabled
    public static List<Integer> getYears( Id contactId){
        List<Integer> lstYear = new List<Integer>();
        List<Integer> helpLstYear = new List<Integer>();
        List<Expense_Card__c> cardsDate = [SELECT CardDate__c FROM Expense_Card__c WHERE Card_Keeper__r.Id = :contactId];
        System.debug(cardsDate);
        for(Expense_Card__c getCardDate : cardsDate){
            lstYear.add(getCardDate.CardDate__c.year());
        }
 		System.debug(lstYear);
        for(Integer dateCard1 : lstYear){
            for(Integer dateCard2 : lstYear){
                if(dateCard1 == dateCard2 && !helpLstYear.contains(dateCard1)){
                    helpLstYear.add(dateCard1);
                    System.debug(dateCard1);
                }
            }
        }
        
        System.debug(helpLstYear);
        return helpLstYear;
    }

    @AuraEnabled
    public static Double totalExCardAmount(Id contactId,  String cardDate){
        List<Expense_Card__c> cardsTst = Database.query('SELECT Id, Amount__c, CardDate__c, Description__c FROM Expense_Card__c WHERE Card_Keeper__r.Id = :contactId AND CardDate__c = ' + cardDate);
        
        Double sumTotal = 0;
        for(Expense_Card__c card : cardsTst){
            sumTotal += card.Amount__c;
        }
        System.debug(sumTotal);
        return sumTotal;
    }
}