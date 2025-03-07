export async function Login(page) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.waitForSelector("#customer_email"); // 等待 "電子郵件" 欄位出現
  await page.type("#customer_email", "stevenlth26@gmail.com"); // 填寫 "電子郵件" 欄位

  await page.waitForSelector("#customer_password"); // 等待 "密碼" 欄位出現
  await page.type("#customer_password", "blackmi1226"); // 填寫 "密碼" 欄位

  await page.waitForSelector(".account--sign-in button");
  await page.click('.account--sign-in button[type="submit"]');

  await page.waitForNavigation();
}
