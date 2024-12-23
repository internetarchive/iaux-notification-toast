import { html, fixture, expect } from '@open-wc/testing';

import type { IauxNotificationToast } from '../src/iaux-notification-toast';
import '../src/iaux-notification-toast';

describe('IauxNotificationToast', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<IauxNotificationToast>(
      html`<iaux-notification-toast></iaux-notification-toast>`
    );

    expect(el.title).to.equal('Hey there');
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<IauxNotificationToast>(
      html`<iaux-notification-toast></iaux-notification-toast>`
    );
    el.shadowRoot!.querySelector('button')!.click();
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<IauxNotificationToast>(
      html`<iaux-notification-toast
        title="attribute title"
      ></iaux-notification-toast>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<IauxNotificationToast>(
      html`<iaux-notification-toast></iaux-notification-toast>`
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
