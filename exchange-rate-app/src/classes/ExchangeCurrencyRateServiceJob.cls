global class ExchangeCurrencyRateServiceJob implements Schedulable{
	global void execute(SchedulableContext ctx) {
        ExchangeCurrencyRateLogic.createNewRecord();
    }
}