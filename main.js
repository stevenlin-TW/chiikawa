import puppeteer from "puppeteer";
import { Login } from "./login.js";
import { AcceptCookies, NotUsingWorldShopping } from "./utility.js";
import { OrderById, OrderByName } from "./order.js";
import config from "./config.json" assert { type: "json" };

const baseUrl = config.url.base; ///collections/20241025';
const cartUrl = config.url.cart;
const loginPath = baseUrl + "/account/login";
let page;
let pageNum;
async function launch() {
  const width = 1440;
  const height = 900;

  // Launching Puppeteer
  console.log("start");
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=${width},${height}`, "--start-maximize"],
  });
  // Opening a new page
  console.log("open new page");

  page = await browser.newPage();
  console.log("open page done");
  await page.setViewport({ width: width, height: 700 });

  await page.goto(loginPath);
  //await Order(page, keyWords);
}

async function GoPayPage() {
  await page.goto(baseUrl + cartUrl);
  try {
    await page.waitForSelector("#termsCheck", { timeout: 500 });
    await page.click("#termsCheck");
  } catch (error) {
    console.log("購物車為空");
  }

  try {
    await page.waitForSelector(
      '.cart--checkout-button button[type="submit"]:not([disabled])',
      { timeout: 1000 }
    );
    await page.click(
      '.cart--checkout-button button[type="submit"]:not([disabled])'
    );
    await page.waitForNavigation();
  } catch (error) {
    console.log(error);
  }
}

const lists = [
  ["4582662952874", "4582662946859", "4582662946842", "4582662950894"],
  [
    "4582662952874",
    "4582662946859",
    "4582662946842",
    "4582662950894",
    "4582662952935",
  ],
  [
    "4571609334194",
    "4582662946859",
    "4582662946842",
    "4582662950894",
    "4571609335184",
  ],
];

let nameIdDic = {};

async function CreateBrowser(list) {
  await launch();
  await AcceptCookies(page);
  await NotUsingWorldShopping(page);
  await Login(page, loginPath);

  await OrderNew(list);
  // await OrderRe(list);
  console.log(nameIdDic);
  //await OrderRe(list);
  await GoPayPage();
}

async function OrderNew(keyWordsList) {
  for (let keyWord of keyWordsList) {
    if (keyWord in nameIdDic && nameIdDic[keyWord] != null) {
      console.log("1");
      await OrderById(page, nameIdDic[keyWord]);
    } else if (!(keyWord in nameIdDic)) {
      console.log("2");
      let id = await OrderByName(page, keyWord);
      nameIdDic[keyWord] = id;
    }
  }
}

async function OrderRe(idList) {
  for (let id of idList) {
    await OrderById(page, id);
  }
}

const keyWordsList = [
  // [
  //   //test
  //   "ニードルフェルトでつくる,古本屋",
  // ],
  [
    //1
    "マスコット,ちいかわ（ドジャース）",
    "マスコット,ハチワレ（ドジャース）",
    "マスコット,うさぎ（ドジャース）",
    "マスコット,ちいかわ（カブス）",
    "マスコット,ハチワレ（カブス）",
    "マスコット,うさぎ（カブス）",
  ],
  [
    //2
    "マスコット,ちいかわ（ドジャース）",
    "マスコット,ハチワレ（ドジャース）",
    "マスコット,うさぎ（ドジャース）",
    "マスコット,ちいかわ（カブス）",
    "マスコット,ハチワレ（カブス）",
    "マスコット,うさぎ（カブス）",
  ],
  [
    //3
    "うちわ",
    "ペンライト",
    "スッキリ目",
    "ムン顔",
  ],
  [
    //4
    "うちわ",
    "ペンライト",
    "スッキリ目",
    "ムン顔",
  ],
  [
    //5
    "うちわ",
    "ペンライト",
    "スッキリ目",
    "ムン顔",
  ],
  [
    //6
    "うちわ",
    "ペンライト",
    "スッキリ目",
    "ムン顔",
  ],
  // [
  //   //7
  //   "PUN,マスコット（ちいかわ）",
  //   "PUN,マスコット（ハチワレ）",
  // ],
  // [
  //   //8
  //   "ちいかわ PUN。マスコット（ちいかわ）",
  //   "ちいかわ PUN。マスコット（ハチワレ）",
  //   "ちいかわ PUN。マスコット（うさぎ）",
  //   "ちいかわ PUN。マスコット（モモンガ）",
  //   "ちいかわ PUN。マスコット（くりまんじゅう）",
  //   "節分だ！！マスコット（ちいかわ）",
  //   "節分だ！！マスコット（ハチワレ）",
  //   "節分だ！！マスコット（うさぎ）",
  // ],
  // [
  //   //9
  //   "ちいかわ PUN。マスコット（ちいかわ）",
  //   "ちいかわ PUN。マスコット（ハチワレ）",
  //   "ちいかわ PUN。マスコット（うさぎ）",
  //   "ちいかわ PUN。マスコット（モモンガ）",
  //   "ちいかわ PUN。マスコット（くりまんじゅう）",
  //   "節分だ！！マスコット（ちいかわ）",
  //   "節分だ！！マスコット（ハチワレ）",
  //   "節分だ！！マスコット（うさぎ）",
  // ],
];

const idList = [
  [
    "4571609353652",
    "4571609353676",
    "4571609353669",
    "4571609339700",
    "4571609339731",
    "4571609339748",
    "4901770748825",
  ],
  [
    "4571609353652",
    "4571609353676",
    "4571609353669",
    "4571609339731",
    "4571609339748",
  ],
];

for (let i = 0; i < 1; i++) {
  await CreateBrowser(keyWordsList[0]);
}
