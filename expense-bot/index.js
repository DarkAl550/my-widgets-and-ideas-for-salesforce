const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.TGTOKEN);
var Calendar = require("telegraf-calendar-telegram")
var logic = require('./bot_logic');


const calendar = new Calendar(bot, {
	startWeekDay: 1,
	weekDayNames: ["В", "П", "В", "С", "Ч", "П", "С"],
	monthNames: [
		"Янв", "Фев", "Мар", "Апр", "Май", "Июн",
		"Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
	]
});


var contactEmail = null;
var contactPassword = null;
var log = false;
var userId = null;
var userOffice = null;
var newCard = false;
var cardDate = null;
var amount = null;
var description = null;
var records = [];
var balances = [];

//COMMANDS//
bot.command('start', (ctx) => {
    contactEmail = null;
    contactPassword = null;
    log = false;
    userId = null;
    userOffice = null;
    newCard = false;
    cardDate = null;
    amount = null;
    description = null;
    records = [];
    ctx.reply('Введете логин:');
    
});
bot.command('login', (ctx) => {
    contactEmail = null;
    contactPassword = null;
    log = false;
    userId = null;
    userOffice = null;
    newCard = false;
    cardDate = null;
    amount = null;
    description = null;
    records = [];
    ctx.reply('Введете логин:');
});
bot.command('help', (ctx) => ctx.reply('Бот для контроля расходов. \nАвторизация: /login \n'));




// Default reply
bot.on('text', (ctx) => {
    
    if(logic.validateEmail(ctx.message.text) && log == false){
        contactEmail = ctx.message.text;
        console.log(contactEmail);
        var sf = require('node-salesforce');
        var conn = new sf.Connection({
            loginUrl : 'https://login.salesforce.com'
        });
        var username = 'task-expense-app@success.com';
        var password = 'sf20AB00';
        conn.login(username, password, function(err, userInfo) {
            if (err) { return console.error(err); }
            console.log('TOKEN: ' + conn.accessToken);
            console.log('INSTANCE URL: ' + conn.instanceUrl);
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            conn.query("SELECT Id, Name, Office__c, Password__c FROM Contact WHERE Email = '"+contactEmail+"'")
            .on("record", function(record) {
                records.push(record);
                
            })
            .on("end", function(query) {
               
                console.log("total in database : " + query.totalSize);
                console.log("total fetched : " + query.totalFetched);
            })
            .on("error", function(err) {
                console.error(err);
            })
            .run({ autoFetch : true, maxFetch : 4000 }); // synonym of Query#execute();
            
            
        });
        ctx.telegram.sendMessage(ctx.message.chat.id, 'Введите пароль:')
    }else if(!logic.validateEmail(contactEmail)){
        contactEmail = null;
        ctx.telegram.sendMessage(ctx.message.chat.id, 'Неверный формат логина!')
        ctx.telegram.sendMessage(ctx.message.chat.id, 'Введите логин:')
    }else if(contactEmail != null && logic.validateEmail(contactEmail) && log == false){
        contactPassword = ctx.message.text;
        
        console.log(records);
            if(records.length > 0 && records[0].Password__c == contactPassword){
                userId = records[0].Id;
                userOffice = records[0].Office__c;
                log = true;
                ctx.telegram.sendMessage(ctx.chat.id, 'Авторизация прошла успешно!', {
                    reply_markup: {
                        inline_keyboard: [
                        [{text:"Текущий баланс", callback_data: "balance"},{text:"Создать карточку", callback_data: "new"}]
                    ]
                    }
                });
                var sf = require('node-salesforce');
                var conn = new sf.Connection({
                    loginUrl : 'https://login.salesforce.com'
                });
                var username = 'task-expense-app@success.com';
                var password = 'sf20AB00';
                conn.login(username, password, function(err, userInfo) {
                    if (err) { return console.error(err); }
                    // Now you can get the access token and instance URL information.
                    // Save them to establish connection next time.
                    console.log('TOKEN: ' + conn.accessToken);
                    console.log('INSTANCE URL: ' + conn.instanceUrl);
                    // logged in user property
                    console.log("User ID: " + userInfo.id);
                    console.log("Org ID: " + userInfo.organizationId);
                    // ...
                  

                                         
                    //get balance
                      conn.query("select Id, Reminder__c from MonthlyExpense__c WHERE MonthDate__c = THIS_MONTH AND Contact__r.Office__c = '" + userOffice +"'")
                      .on("record", function(record) {
                        balances.push(record);
                          console.log(record.Reminder__c);
                      })
                      .on("end", function(query) {
                          if(records.length == 0 ){
                              console.log('error');
                          }
                          console.log("total in database : " + query.totalSize);
                          console.log("total fetched : " + query.totalFetched);
                      })
                      .on("error", function(err) {
                          console.error(err);
                      })
                      .run({ autoFetch : true, maxFetch : 4000 }); // synonym of Query#execute();
                  
                  });
            }else{
                email = null;
                ctx.telegram.sendMessage(ctx.message.chat.id, 'Неверный логин или пароль!');
                ctx.telegram.sendMessage(ctx.message.chat.id, 'Введите логин:');
            }

        
    }else if(log && newCard ==false){
        //after success log
        ctx.telegram.sendMessage(ctx.message.chat.id, 'Выбирете что-то из этого:', {
            reply_markup: {
                inline_keyboard: [
                [{text:"Текущий баланс", callback_data: "balance"}, {text:"Создать карточку", callback_data: "new"}]
            ]
            }
        });
    }else if( log && newCard && cardDate == null){
        // pick date
    }else if(log && newCard && cardDate != null && description == null){
        //input description
        description = ctx.message.text;
        ctx.telegram.sendMessage(ctx.message.chat.id, 'Введите цену:');
    }else if(log && newCard && cardDate != null && description != null){
        //insert card
        amount = logic.validateAmount(ctx.message.text);
        console.log("Description: "+description);
        console.log("Amount: "+amount);
        console.log("CardDate: "+cardDate);
        console.log("CardKeeper: "+userId);
        if(amount != null){
            ctx.telegram.sendMessage(ctx.message.chat.id,
                'Проверьте введенные данные и подтвердите добаление карточки?', 
                {
                    reply_markup: {
                        inline_keyboard: [
                        [{text:"Отмена", callback_data: "cancel"},{text:"Добавить", callback_data: "submit"}]
                    ]
                    }
                }
            );
        }else{
            ctx.telegram.sendMessage(ctx.message.chat.id, 'Неверный формат!');
            ctx.telegram.sendMessage(ctx.message.chat.id, 'Введите цену:');
        }
        
    }
})



//handle callbacks
bot.action("balance",  (ctx) => {
    ctx.editMessageText(
        'Текущий баланс: $' +balances[0].Reminder__c, 
        {
            reply_markup: {
                inline_keyboard: [
                [{text:"Текущий баланс", callback_data: "balance"},{text:"Создать карточку", callback_data: "new"}]
            ]
            }
        }
    );

    
});
bot.action("new", (ctx) =>{

    description = null;
    cardDate = null;
    amount = null;
    newCard = true;
    ctx.editMessageText(
        'На какой день желаете создать карточку?', 
        {
            reply_markup: {
                inline_keyboard: [
                [{text:"Сегодня", callback_data: "today"},{text:"Календарь", callback_data: "calendar"},{text:"Отмена", callback_data: "cancel"}]
            ]
            }
        }
    )
});
bot.action("cancel",  (ctx) => {
    newCard = false;
    description = null;
    cardDate = null;
    amount = null;
    ctx.editMessageText(
        'Что желаете сделать?', 
        {
            reply_markup: {
                inline_keyboard: [
                [{text:"Текущий баланс", callback_data: "balance"},{text:"Создать карточку", callback_data: "new"}]
            ]
            }
        }
    );
    
});
bot.action("today",  (ctx) => {
    var d = Date.now();
    console.log(d);
    cardDate = d;
    ctx.editMessageText('Введите описание для карточки:');
});


calendar.setDateListener((context, date) => {
    cardDate = Date.parse(date);
    context.editMessageText('Введите описание для карточки:');
});
bot.action("calendar", context => {
	const today = new Date();
	const minDate = new Date();
	minDate.setMonth(today.getMonth() - 10);
	const maxDate = new Date();
	maxDate.setMonth(today.getMonth() + 10);
	maxDate.setDate(today.getDate());

	context.editMessageText("Укажите дату:", calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar())
});
bot.action("submit",  (ctx) => {
    var sf = require('node-salesforce');
var conn = new sf.Connection({
   loginUrl : 'https://login.salesforce.com'
});
var username = 'task-expense-app@success.com';
var password = 'sf20AB00';
conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }
  // ...
  console.log(description);
  console.log(amount);
  console.log(cardDate);
  console.log(userId);
    conn.sobject("ExpenseCard__c").create({ 
        Description__c : description,
        Amount__c : amount,
        CardDate__c : cardDate,
        CardKeeper__c : userId 
    }, function(err, ret) {
        if (err || !ret.success) { return console.error(err, ret); }
        console.log("Created record id : " + ret.id);
        // ...
      });
      
      conn.query("SELECT Id, Name, Office__c, Password__c FROM Contact WHERE Email = '"+contactEmail+"'")
            .on("record", function(record) {
                records = [];
                records.push(record);
                
            })
            .on("end", function(query) {
               
                console.log("total in database : " + query.totalSize);
                console.log("total fetched : " + query.totalFetched);
            })
            .on("error", function(err) {
                console.error(err);
            })
            .run({ autoFetch : true, maxFetch : 4000 }); // synonym of Query#execute();
                
});    
    newCard = false;
    ctx.editMessageText(
        'Карточка успешно создана!', 
        {
            reply_markup: {
                inline_keyboard: [
                [{text:"Текущий баланс", callback_data: "balance"},{text:"Создать карточку", callback_data: "new"}]
            ]
            }
        }
    );

});

    



  ///SET WEBHOOK///
const PORT = process.env.PORT 
const URL = process.env.BASE_URL + "webhook"
console.log ("Registering webhook:" + URL )
bot.telegram.setWebhook(URL)
bot.startWebhook('/webhook', null, PORT)

