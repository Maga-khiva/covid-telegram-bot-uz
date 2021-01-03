const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('bot token');
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.command('say', (ctx) =>{
  ctx.reply('what do you want to find out?')
})

// working with buttons and APIs

bot.command('covid', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'Koronavirus Malumotlari',
  {
    reply_markup:{
      inline_keyboard: [
        [{text:'O`zbekistan', callback_data:'UZ'}, {text:'Koreya', callback_data:'KR'}, {text:'Rossiya', callback_data:'RUS'}, {text:'Turkiya', callback_data:'TR'}]
      ]
    }
  })
})

bot.action('UZ', (ctx) => {
  ctx.deleteMessage();
  let iso = ctx.match
  getdata(iso)
  .then((result) => {
    ctx.telegram.sendMessage(ctx.chat.id, result,
      {
        reply_markup:{
          inline_keyboard: [
            [{text:'Menyuga qaytish', callback_data:'go-back'}]
          ]
        }
      })
  })
  
})

bot.action('KR', (ctx) => {
  ctx.deleteMessage();
  iso = ctx.match
  getdata(iso)
  .then((result) => {
    ctx.telegram.sendMessage(ctx.chat.id, result,
      {
        reply_markup:{
          inline_keyboard: [
            [{text:'Menyuga qaytish', callback_data:'go-back'}]
          ]
        }
      })
  })
})

bot.action('RUS', (ctx) => {
  ctx.deleteMessage();
  iso = ctx.match
  getdata(iso)
  .then((result) => {
    ctx.telegram.sendMessage(ctx.chat.id, result,
      {
        reply_markup:{
          inline_keyboard: [
            [{text:'Menyuga qaytish', callback_data:'go-back'}]
          ]
        }
      })
  })
})

bot.action('TR', (ctx) => {
  ctx.deleteMessage();
  iso = ctx.match
  getdata(iso)
  .then((result) => {
    ctx.telegram.sendMessage(ctx.chat.id, result,
      {
        reply_markup:{
          inline_keyboard: [
            [{text:'Menyuga qaytish', callback_data:'go-back'}]
          ]
        }
      })
  })
})

bot.action('go-back', (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(ctx.chat.id, 'Koronavirus Malumotlari',
  {
    reply_markup:{
      inline_keyboard: [
        [{text:'O`zbekistan', callback_data:'UZ'}, {text:'Koreya', callback_data:'KR'}, {text:'Rossiya', callback_data:'RUS'}, {text:'Turkiya', callback_data:'TR'}]
      ]
    }
  })
})

async function getdata(iso) {
  const url= `https://covid19.mathdro.id/api/countries/${iso}`
  let res= await axios.get(url);
  let dataCountry= res.data
  let results= 
 `Umumiy virus qayd etilganlar soni - ${dataCountry.confirmed.value}
  Tuzalganlar soni - ${dataCountry.recovered.value}
  O'lganlar soni - ${dataCountry.deaths.value}
  Davolanayotganlar soni - ${dataCountry.confirmed.value - dataCountry.recovered.value - dataCountry.deaths.value}`;
  return results

}

bot.launch();
