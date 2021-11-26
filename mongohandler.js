const {MongoClient} = require('mongodb');
const {dbName, dburl} = require('./conf.json');
const pnggen = require('./pnggen');
const { Client, Intents ,MessageActionRow, MessageButton, MessageEmbed, MessageAttachment} = require('discord.js');

const client = new MongoClient(dburl);
class Events  {
    constructor(guildid = undefined,channelid = undefined,messageid = undefined,title = "Title",subtitle = "By Anonymous",content = "Contenu",buttons = new MessageActionRow().addComponents(new MessageButton().setCustomId('in').setLabel('Je vien').setStyle('SUCCESS'),).addComponents(new MessageButton().setCustomId('out').setLabel('Je vien pas').setStyle('DANGER'),).addComponents(new MessageButton().setCustomId('idk').setLabel('Je sais pas').setStyle('PRIMARY'),))  {
        this.guildid = guildid;
        this.channelid = channelid;
        this.messageid = messageid;
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.buttons = buttons;
    }
    topng() {
      return pnggen(this.title,this.subtitle,this.content);
    }
    save() {
      updatedb(this);
    }
    async discordmessage() {
      var file = new MessageAttachment(await this.topng(),"event.jpg");
      return {files: [file],components: [this.buttons],fetchReply: true};

    }
    setguildid(i) {
      this.guildid = i;
    }
    setchannelid(i) {
      this.channelid = i;
    }
    setmessageid(i) {
      this.messageid = i;
    }
    settitle(i) {
      this.title = i;
    }
    setsubtitle(i) {
      this.subtitle = i;
    }
    setcontent(i) {
      this.content = i;
    }
    setbuttons(i) {
      this.buttons = i;
    }
    async getfromdb(i) {
      var tmp = await client.db(dbName).collection('events').findOne({messageid:i});
      this.guildid = tmp.guildid;
      this.channelid = tmp.channelid;
      this.messageid = tmp.messageid;
      this.title = tmp.title;
      this.subtitle = tmp.subtitle;
      this.content = tmp.content;
      this.buttons = tmp.buttons;
      return this;
    }
}

async function init() {
    client.connect().then(
      console.log("Connected successfully to server")
    );

}


async function getEvent(msgid) {
  
};


async function updatedb(Event) {
    //try {
        // Connect the client to the server
        // Establish and verify connection
        await client.db(dbName).command({ ping: 1 });
        //await client.db(dbName).collection('events').insertOne(Event);
        await client.db(dbName).collection('events').updateOne(
          { messageid: Event.messageid },   // Query parameter
          { $set: Event },
          { upsert: true }      // Options
       )

      //} finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
      //}
}

module.exports = {updatedb,Events,init,getEvent,client};