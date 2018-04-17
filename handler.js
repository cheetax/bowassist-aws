'use strict';
var needle = require('needle');
var querystring = require('querystring');
var { extractHTML } = require('./extractHTML');
var { user } = require('./user')

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

var url = "https://magi.mobi";
var urlLogin = "/auth/credentials";
var urlExperience = '/clan/treasures/history/tmp_experience/';
var urlClan = '/clans_tournament/last_tournament_statistics';

var data = user;

var httpOptions = {};
var users;
var turnir = {};

module.exports.getturnir = (event, context, callback) => {
  console.log(url + urlClan)

  needle.post(url + urlLogin, data, (err, res) => {
    //console.log(res)
    if (err || res.statusCode !== 200)
      throw err || res.statusCode;
    httpOptions.cookies = res.cookies;
    var xxx = needle.get(url + urlClan, httpOptions, (err, res) => {
      if (err || res.statusCode !== 200)
        throw err || res.statusCode;
      //console.log(res.body)
      users = extractHTML(res.body);
      console.log(users);
      turnir = { date: new Date().toString(), users };
      dynamo.put({
        TableName: 'turnir',
        Item: turnir
      });
      callback(null, turnir)
    })
  });

};
