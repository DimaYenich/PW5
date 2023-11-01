function getAttachments(email) {
  var attachments = [];
  var emails = GmailApp.search("from:"+email);

  for (var i = 0; i < emails.length; i++)
  {
    var messages = emails[i].getMessages();
    for (var j = 0; j < messages.length; j++) 
    {
      var message = messages[j];
      var messageAttachments = message.getAttachments();

      for (var a = 0; a < messageAttachments.length; a++) 
        attachments.push(messageAttachments[a].getName());
    }
  }
  for (var k = 0; k < attachments.length; k++)
    console.log(attachments[k]);
}


function autoReply(email) 
{
  var threads = GmailApp.search('is:unread'+" from:"+email);
  var replyMessage = "Дуже дякую! Повідомлення отримав!";
  for (var i = 0; i < threads.length; i++) 
  {
    var thread = threads[i];
    var messages = thread.getMessages();
    for (var j = 0; j < messages.length; j++) 
    {
      var message = messages[j];
      if (message.isUnread()) 
      {
        message.markRead();
        message.reply(replyMessage);
        console.log("Була надіслана автовідповідь на повідомлення "+message.getSubject())
      }
    }
  }
}

function sendEmailFromHTML(email,userName) 
{
  var template = HtmlService.createHtmlOutputFromFile('template')
    .getContent()
    .replace('userName', userName);
  MailApp.sendEmail(
    {
      to: email,
      subject: "Лист створений із шаблону",
      htmlBody: template
    })
};

function MyFuntion()
{
  sendEmailFromHTML("yedmytro@rcit.ukr.education","Дмитро")
  //getAttachments("l.v.shostak@rcit.ukr.education")
  //autoReply("l.v.shostak@rcit.ukr.education") 
}
