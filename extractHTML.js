const cheerio = require('cheerio');

var users = []

const extractHTML = (html) => {
    //console.log(html)
    const $ = cheerio.load(html);
    const usersOnTurnir = $('a.tdn.c_user');
    usersOnTurnir.each((index,element) => {
        users.push({ id: $(element).attr('href') });
    })
    return users;
    //console.log(usersOnTurnir);
}

module.exports = {
    extractHTML
  };