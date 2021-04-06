public with sharing class AdminPageController {

    

    public class OfficeStatistics{
        @AuraEnabled
        public String office;
        @AuraEnabled
        public Double reminder;
        @AuraEnabled
        public List<Double> monthExpense;
        @AuraEnabled
        public Double total;
        @AuraEnabled
        public Double balance;
        
        
    }

    @AuraEnabled
    public static List<OfficeStatistics> getOfficeStatistic(Integer year){
        
        List<String> listOffices = getAllOffices();

        List<OfficeStatistics> listOfficesStatistics = new List<OfficeStatistics>();

        for(String office : listOffices){

            OfficeStatistics officeStatistics = new OfficeStatistics();
            officeStatistics.office = office;
            officeStatistics.monthExpense = getSpentsAmounts(year, office);
            officeStatistics.total = getTotalSumAtYear(officeStatistics.monthExpense);
            officeStatistics.balance = getBalanceToday(office);
            officeStatistics.reminder = getReminder(office);
            
            listOfficesStatistics.add(officeStatistics);
            System.debug(officeStatistics);
            System.debug(officeStatistics.monthExpense.size());
        }
        
        
        return listOfficesStatistics;
    }

    public static List<String> getAllOffices(){
        List<String> listOffices= new List<String>();
        Schema.DescribeFieldResult fieldResult = Contact.Office__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry pickListVal : ple){
            listOffices.add(pickListVal.getLabel());
        }
		System.debug(listOffices);
        return listOffices;
    }

    public static Double getBalanceToday(String office){
        Double balance = 0;
        
            List<Monthly_Expense__c> monExs = [SELECT Balance__c FROM Monthly_Expense__c WHERE Keeper__r.Office__c = :office AND Month_Date__c >= :Date.today().addMonths(-1) AND Month_Date__c <= :Date.today()];
            for(Monthly_Expense__c monEx : monExs){
                balance += monEx.Balance__c;
            }
            return balance;
        
        
    }
    
    public static List<Double> getSpentsAmounts(Integer year, String office){
        List<Double> spentsAmounts = new List<Double>();
            
        for(Integer i = 1; i < 13; i++){
            String date1 = (i<10) ? year+'-0' + i + '-01' : year +'-' + i + '-01';
            Integer nextMonth = i + 1;
            String date2 = (nextMonth<10) ? year+'-0' + nextMonth + '-01' : year +'-' + nextMonth + '-01';

            if(nextMonth >12){
                date2 = (year + 1) +'-01-01';
            }
            try{
                Monthly_Expense__c monEx = [SELECT SpentAmount__c, Month_Date__c FROM Monthly_Expense__c WHERE Keeper__r.Office__c = :office AND Month_Date__c >= :Date.valueOf(date1) AND Month_Date__c <= :Date.valueOf(date2) ORDER BY Month_Date__c];
                spentsAmounts.add(monEx.SpentAmount__c);
            }catch(Exception ex){
                spentsAmounts.add(0);
            }
                
        }

        return spentsAmounts;
    }

    public static Double getTotalSumAtYear(List<Double> spentsAmounts){
        Double total = 0;
        for(Double forTotal : spentsAmounts){
            total += forTotal;
        }
        return total;
    }

    public static Double getReminder(String office){
        Double reminder = 0;
        
            List<Monthly_Expense__c> monExs = [SELECT Reminder__c FROM Monthly_Expense__c WHERE Keeper__r.Office__c = :office];
            for(Monthly_Expense__c monEx : monExs){
                reminder += monEx.Reminder__c;
            }
            return reminder;
        
    }

    @AuraEnabled
    public static String getOffice(Id keeperId){
        Contact contact = [SELECT Office__c FROM Contact WHERE Id =:keeperId];
        return contact.Office__c;
    }

    @AuraEnabled
    public static List<Integer> getYears(){
        List<Integer> lstYear = new List<Integer>();
        List<Integer> helpLstYear = new List<Integer>();
        List<Expense_Card__c> cardsDate = [SELECT CardDate__c FROM Expense_Card__c];
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
   
}