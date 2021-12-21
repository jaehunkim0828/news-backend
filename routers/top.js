const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');


const topRouter = express.Router();

const result = [];

const getHtml = async () => {
  try {
    return await axios.get("https://news.naver.com",{responseEncoding : 'binary', responseType : 'arraybuffer'});

  } catch (error) {
    console.error(error);
  }
};

topRouter.route('/')
  .get((_, res) => {
    if (result.length) {
      result.length = 0;
      getHtml()
      .then(html => {
        const html2 = iconv.decode(html.data, 'euc-kr');
        const $ = cheerio.load(html2);
        const list_text_inner_arr = $("#_rankingList0 > li > div > div > div").toArray();
        list_text_inner_arr.forEach( div => {
          const aFirst = $(div).find("a").first();
          const title = aFirst.text().trim();
          const path = aFirst.attr('href');
          const aLast = $(div).find("a").last();
          const author = aLast.text().trim();
          result.push({
            title,
            path,
            author,
          });
        })
        const list_img = $('#_rankingList0 > li > a').toArray();
        list_img.forEach( (a, i) => {
          const imgFirst = $(a).find("img").first();
          const imgLink = imgFirst.attr('src');
          result[i].img = imgLink;
        })
        res.send(result);
      })
    } else {
      getHtml()
      .then(html => {
        const html2 = iconv.decode(html.data, 'euc-kr');
        const $ = cheerio.load(html2);
        const list_text_inner_arr = $("#_rankingList0 > li > div > div > div").toArray();
        list_text_inner_arr.forEach( div => {
          const aFirst = $(div).find("a").first();
          const title = aFirst.text().trim();
          const path = aFirst.attr('href');
          const aLast = $(div).find("a").last();
          const author = aLast.text().trim();
          result.push({
            title,
            path,
            author,
          });
        })
        const list_img = $('#_rankingList0 > li > a').toArray();
        list_img.forEach( (a, i) => {
          const imgFirst = $(a).find("img").first();
          const imgLink = imgFirst.attr('src');
          result[i].img = imgLink;
        })
        res.send(result);
      })
    }
  })

  module.exports = topRouter;