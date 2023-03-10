import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders information about a rental property', async function (assert) {
    this.setProperties({
      rental: {
        id: 'grand-old-mansion',
        title: 'Grand Old Mansion',
        owner: 'Veruca Salt',
        city: 'San Francisco',
        location: {
          lat: 37.7749,
          lng: -122.4194,
        },
        category: 'Estate',
        type: 'Standalone',
        bedrooms: 15,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        description:
          'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.',
      },
    });

    await render(hbs`<Rental @rental={{this.rental}} />`);

    assert.dom('.uk-card').exists();
    assert.dom('.uk-card h3').hasText('Grand Old Mansion');
    assert
      .dom('.uk-card h3 a')
      .hasAttribute('href', '/rentals/grand-old-mansion');
    assert.dom('.uk-card .detail .owner').includesText('Veruca Salt');
    assert.dom('.uk-card .detail .type').includesText('Standalone');
    assert.dom('.uk-card .detail .location').includesText('San Francisco');
    assert.dom('.uk-card .detail .bedrooms').includesText('15');
    assert.dom('.uk-card img').exists();
    assert.dom('.uk-card .map').exists();
  });
});
