
module.exports = async ({popup, advanced, content}) => {
  // popup
  await popup.bringToFront()
  // defaults button
  await popup.click('button:nth-of-type(2)')
  await popup.waitFor(300)

  // advanced
  await advanced.bringToFront()

  // enable header detection
  if (!await advanced.evaluate(() => state.header)) {
    await advanced.click('.m-switch')
  }

  // remove origin
  if (await advanced.evaluate(() => Object.keys(state.origins).length > 1)) {
    // expand origin
    if (!await advanced.evaluate(() => document.querySelector('.m-list li:nth-of-type(2)').classList.contains('m-expanded'))) {
      await advanced.click('.m-list li:nth-of-type(2)')
    }
    await advanced.click('.m-list li:nth-of-type(2) .m-footer .m-button')
  }

  // add origin
  await advanced.select('.m-select', 'http')
  await advanced.type('[type=text]', 'localhost:3000')
  await advanced.click('button')
  await advanced.waitFor(300)

  // expand origin
  if (!await advanced.evaluate(() => document.querySelector('.m-list li:nth-of-type(2)').classList.contains('m-expanded'))) {
    await advanced.click('.m-list li:nth-of-type(2)')
  }

  // content
  await content.bringToFront()
  await content.goto('about:blank')
  await content.waitFor(300)
}
