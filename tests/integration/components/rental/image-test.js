import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental/image', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the given image', async function (assert) {
    await render(hbs`
      <Rental::Image
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    `);

    assert
      .dom('img')
      .exists()
      .hasAttribute('src', '/assets/images/teaching-tomster.png')
      .hasAttribute('alt', 'Teaching Tomster');
  });

  test('clicking on the component toggles its size', async function (assert) {
    await render(hbs`
      <Rental::Image
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    `);

    assert.dom('.uk-flex img').exists();

    assert.dom('.uk-flex').doesNotHaveClass('uk-cover');
    assert.dom('.uk-flex small').hasText('View Larger');

    await click('.uk-link');

    assert.dom('.uk-flex').hasClass('uk-cover');
    assert.dom('.uk-flex small').hasText('View Smaller');

    await click('.uk-link');

    assert.dom('.uk-flex').doesNotHaveClass('uk-cover');
    assert.dom('.uk-flex small').hasText('View Larger');
  });
});
