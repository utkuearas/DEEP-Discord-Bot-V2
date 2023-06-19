

module.exports = (client,msg) =>{

    let scheduleManager = client.scheduleManager;
    let content = msg.content.split(/ +/).slice(1).join(" ");
    if(!content.includes("SEPARATOR")){
        console.log("ADD SCHEDULE ERROR");
        return;
    }
    let splitText = content.split("SEPARATOR");
    let title = splitText[0];
    let description = splitText[1];
    scheduleManager.addSchedule(title,description);
    
}