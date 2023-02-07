describe('WeatherApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show weather list, navigate to detail page and back', async () => {
    await expect(element(by.id('city-item.0'))).toBeVisible();
    await expect(element(by.id('city-item.1'))).toBeVisible();
    await expect(element(by.id('city-item.2'))).toBeVisible();

    // navigate to detail page
    await element(by.id('city-item.1')).tap();

    await expect(element(by.id('city-item'))).toBeVisible();

    // navigate back to the weather list page
    if (device.getPlatform() === 'ios') {
      await element(by.text('Weather')).tap();
    } else {
      await device.pressBack();
    }

    await expect(element(by.id('city-item.0'))).toBeVisible();
    await expect(element(by.id('city-item.1'))).toBeVisible();
    await expect(element(by.id('city-item.2'))).toBeVisible();
  });
});
