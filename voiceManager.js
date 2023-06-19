

module.exports = class voiceManager{

    constructor(_voiceManager){
        this.self = _voiceManager;
    }

    async fetchGuildIds(){
        return this.self.adapters.keys();
    }
}