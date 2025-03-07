export async function AcceptCookies(page) {
  await page.evaluate(() => {
    const shadowHost = document.querySelector("#zigzag-worldshopping-checkout");
    const shadowRoot = shadowHost.shadowRoot;

    const acceptCookieBtn = shadowRoot.querySelector(
      "#zigzag-test__cookie-banner-accept-all"
    );
    if (acceptCookieBtn) {
      acceptCookieBtn.click();
    }
  });
}

export async function NotUsingWorldShopping(page) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await page.evaluate(() => {
    const shadowHost = document.querySelector("#zigzag-worldshopping-checkout");
    const shadowRoot = shadowHost.shadowRoot;

    const notUsingWorldShoppingBtn = shadowRoot.querySelector(
      "#zigzag-test__banner-deactivate"
    );
    console.log(notUsingWorldShoppingBtn);
    if (notUsingWorldShoppingBtn) {
      notUsingWorldShoppingBtn.click();
    }
  });
  //await page.waitForNavigation();
}
