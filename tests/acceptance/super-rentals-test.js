import { module, test } from 'qunit';
import { click, find, findAll, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'super-rentals/tests/helpers';


module('Acceptance | super rentals', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('Welcome to Super Rentals!');
    assert.dom('.uk-section a.uk-button').hasText('About Us');
    await click('.uk-section a.uk-button');
    
    assert.strictEqual(currentURL(), '/about');
  });
  
  test('viewing the details of a rental property', async function (assert) {
    await visit('/');
    assert.dom('.uk-card').exists({ count: 3 });
    
    await click('h3:first-of-type a');
    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
  });
  
  test('visiting /rentals/grand-old-mansion', async function (assert) {
    await visit('/rentals/grand-old-mansion');
    
    assert.strictEqual(currentURL(), '/rentals/grand-old-mansion');
    assert.dom('nav').exists();
    assert.dom('h1').containsText('SuperRentals');
    assert.dom('h2').containsText('Grand Old Mansion');
    assert.dom('.uk-section').exists();
    assert.dom('.uk-button-primary').hasText('Share on Twitter');
    
    let button = find('.uk-button-primary');
    
    let tweetURL = new URL(button.href);
    assert.strictEqual(tweetURL.host, 'twitter.com');
    
    assert.strictEqual(
      tweetURL.searchParams.get('url'),
      `${window.location.origin}/rentals/grand-old-mansion`
      );
  });
    
  test('visiting /about', async function (assert) {
    await visit('/about');
    
    assert.strictEqual(currentURL(), '/about');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('About Super Rentals');
    
    assert.dom('a.uk-button-primary').hasText('Contact Us');
    await click('a.uk-button-primary');
    
    assert.strictEqual(currentURL(), '/getting-in-touch');
  });
    
  test('visiting /getting-in-touch', async function (assert) {
    await visit('/getting-in-touch');
    
    assert.strictEqual(currentURL(), '/getting-in-touch');
    assert.dom('nav').exists();
    assert.dom('h1').hasText('SuperRentals');
    assert.dom('h2').hasText('Contact Us');
    
    assert.dom('a.uk-button-primary').hasText('About');
    await click('a.uk-button-primary');
    
    assert.strictEqual(currentURL(), '/about');
  });
  
  test('navigating using the nav-bar', async function (assert) {
    await visit('/');

    assert.dom('nav').exists();
    assert.dom('.uk-link-reset').exists({ count: 3 });
    assert.dom(findAll('.uk-link-reset')[0]).hasText('SuperRentals');
    assert.dom(findAll('.uk-link-reset')[1]).hasText('About');
    assert.dom(findAll('.uk-link-reset')[2]).hasText('Contact');

    await click(findAll('.uk-link-reset')[1]);
    assert.strictEqual(currentURL(), '/about');

    await click(findAll('.uk-link-reset')[2]);
    assert.strictEqual(currentURL(), '/getting-in-touch');

    await click(findAll('.uk-link-reset')[0]);
    assert.strictEqual(currentURL(), '/');
  });
});
