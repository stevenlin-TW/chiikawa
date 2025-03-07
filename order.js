import config from "./config.json" assert { type: "json" };

const baseUrl = config.url.base;
const productUrl = config.url.product;
const newProductUrl = config.url.new;
export async function OrderByName(page, keyWord) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let id;
  // for (let i = 1; i <= 2; i++) {
  await page.goto(`${baseUrl}${newProductUrl}${1}`);
  let ks = keyWord.toString().split(",");
  console.log(ks);
  await page.evaluate((ks) => {
    // console.log(keyWord);

    const productLinks = document.querySelectorAll(".product--root > a");
    productLinks.forEach((link) => {
      let label = link.getAttribute("aria-label").replaceAll(" ", "");
      let included = label.includes(ks[0]) && label.includes(ks[1]);
      console.log(label);
      if (included) {
        //   found = true;
        link.click();
      } else {
        return;
      }
    });
  }, ks);

  try {
    console.log("等待跳轉...");
    await page.waitForNavigation({
      timeout: 3000,
    });
    // break;
  } catch (error) {
    console.log(error);
    return;
  }
  // }
  // 紀錄 ID
  try {
    await page.waitForSelector("#jan", {
      timeout: 500,
    });
    id = await page.evaluate(() => {
      const jan = document.querySelector("#jan");
      return jan ? jan.textContent : null;
    });
  } catch (error) {
    console.log("找不到ID");
  }

  // 限 2 品項
  await page.select(".product-form--quantity", "2");

  try {
    await page.waitForSelector('.agree_box input[type="checkbox"]', {
      timeout: 500,
    });
    await page.click('.agree_box input[type="checkbox"]');
  } catch (error) {
    console.log("不用勾選確認");
  }

  try {
    await page.waitForSelector(".product-form--add-to-cart:not([disabled])", {
      timeout: 1000,
    });
    await page.click(".product-form--add-to-cart");
    console.log("加入購物車");
    await page.waitForNavigation();
  } catch (error) {
    console.log("品切");
    return null;
  }
  console.log(id);
  return id;
}

export async function OrderById(page, productId) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(productId);
  await page.goto(baseUrl + productUrl + productId);

  try {
    await page.waitForSelector('.agree_box input[type="checkbox"]', {
      timeout: 500,
    });
    await page.click('.agree_box input[type="checkbox"]');
  } catch (error) {
    console.log("不用勾選確認");
  }

  try {
    await page.waitForSelector(".product-form--add-to-cart:not([disabled])", {
      timeout: 1000,
    });
    await page.click(".product-form--add-to-cart");
    console.log("加入購物車");
    await page.waitForNavigation();
  } catch (error) {
    console.log("品切");
  }
}
