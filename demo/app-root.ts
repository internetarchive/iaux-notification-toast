import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../src/iaux-notification-toast';
import type {
  aNotification,
  IauxNotificationToast,
} from '../src/iaux-notification-toast';

@customElement('app-root')
export class AppRoot extends LitElement {
  successNotif(message?: string): aNotification {
    return {
      message: message ?? 'Default success message',
      status: 'success',
    };
  }

  errorNotif(message?: string): aNotification {
    return {
      message: message ?? 'Default error message',
      status: 'fail',
    };
  }

  render() {
    return html`
      <section id="demo-controls">
        <button
          @click="${() => {
            const toast = this.shadowRoot!.querySelector(
              'iaux-notification-toast'
            ) as IauxNotificationToast;
            toast.addNotification(this.successNotif());
          }}"
        >
          Add Success Notification
        </button>
        <button
          @click="${() => {
            const toast = this.shadowRoot!.querySelector(
              'iaux-notification-toast'
            ) as IauxNotificationToast;
            toast.addNotification(this.errorNotif());
          }}"
        >
          Add Error Notification
        </button>
        <button
          @click="${() => {
            const toast = this.shadowRoot!.querySelector(
              'iaux-notification-toast'
            ) as IauxNotificationToast;
            const notif =
              Math.random() > 0.5
                ? this.successNotif('Randomized notif success')
                : this.errorNotif('Randomized notif error');
            toast.addNotification(notif);
          }}"
        >
          Add Random Notification
        </button>
        <button
          @click="${() => {
            const toast = this.shadowRoot!.querySelector(
              'iaux-notification-toast'
            ) as IauxNotificationToast;
            toast.clear();
          }}"
        >
          Clear Notifications
        </button>
      </section>
      <iaux-notification-toast title="Hello"> </iaux-notification-toast>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    section#demo-controls {
      background-color: aliceblue;
      width: 100%;
      min-height: 50px;
      display: flex;
      padding-bottom: 50px;
    }
  `;
}
