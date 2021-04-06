@isTest
global class ExchangeCurrencyRateServiceMock implements HttpCalloutMock  {
	global HTTPResponse respond(HTTPRequest request) {
        // Create a fake response
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}');
        response.setStatusCode(200);
        return response; 
    }
}