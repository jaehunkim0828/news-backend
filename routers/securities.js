const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const securityRouter = express.Router();

const result = [];

const getHtml = async () => {
  try {
    return await axios.get("https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=258",{responseEncoding : 'binary', responseType : 'arraybuffer'});

  } catch (error) {
    console.error(error);
  }
};


securityRouter.route('/')
  .get((_, res) => {
    if (result.length) {
      result.length = 0;
      getHtml()
        .then(html => {
          const html2 = iconv.decode(html.data, 'euc-kr');
          const $ = cheerio.load(html2);
          const list_text_inner_arr = $(".type06_headline > li > dl").toArray().slice(0, 5);
          list_text_inner_arr.map(dl => {
            const img = $(dl).find("dt").first().find("a").find("img").attr('src');
            const title = $(dl).find("dt").last().find("a").text().trim();
            const path = $(dl).find("dt").last().find("a").attr('href');
            const ddFirst = $(dl).find("dd");
            const subTitle = ddFirst.find("span").first().text().trim();
            const author = ddFirst.find('.writing').text().trim();

            result.push({
              title,
              path,
              author,
              img,
              subTitle,
            });
          })
          console.log('1');
          console.log(result.length);
          return res.send(result);
        })
    } else {
      getHtml()
        .then(html => {
          const html2 = iconv.decode(html.data, 'euc-kr');
          const $ = cheerio.load(html2);
          const list_text_inner_arr = $(".type06_headline > li > dl").toArray().slice(0, 5);
          list_text_inner_arr.map(dl => {
            const img = $(dl).find("dt").first().find("a").find("img").attr('src');
            const title = $(dl).find("dt").last().find("a").text().trim();
            const path = $(dl).find("dt").last().find("a").attr('href');
            const ddFirst = $(dl).find("dd");
            const subTitle = ddFirst.find("span").first().text().trim();
            const author = ddFirst.find('.writing').text().trim();

            result.push({
              title,
              path,
              author,
              img,
              subTitle,
            });
          })
          console.log('2');
          console.log(result.length);
          return res.send(result);
        })
    }
  })

  module.exports = securityRouter;