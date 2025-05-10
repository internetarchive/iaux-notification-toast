import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type aNotification = {
  message: string;
  status: 'success' | 'fail';
};

@customElement('iaux-notification-toast')
export class IauxNotificationToast extends LitElement {
  @property({ type: Array }) updates: aNotification[] = [];

  @property({ type: Array }) notifsDisplaying: aNotification[] = [];

  public clear() {
    this.updates = [];
    this.notifsDisplaying = [];
  }

  public addNotification(notif: aNotification) {
    const allNotifs = [...this.notifsDisplaying, notif];
    this.updates = allNotifs;

    // check notifsDisplaying
    const newDisplayList = [notif, ...this.notifsDisplaying];
    if (newDisplayList.length > 5) {
      // only keep 5 maximum
      newDisplayList.pop();
    }
    this.notifsDisplaying = newDisplayList;
  }

  render() {
    if (!this.notifsDisplaying.length) {
      return nothing;
    }

    return html`
      <ul>
        ${this.notifsDisplaying.map(notif => this.updateBlock(notif))}
      </ul>
    `;
  }

  updateBlock(update: aNotification) {
    const icon = update.status === 'success' ? '✓' : '✖';
    return html` <li class="${update.status}">${icon} ${update.message}</li> `;
  }

  static styles = css`
    ul {
      display: grid;
      background: rgb(238, 253, 238);
      margin: 1.5rem 0px;
      width: fit-content;
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 10px;
    }
    li.success {
      color: rgb(33, 149, 24);
      cursor: pointer;
      border-left: 5px solid rgb(33, 149, 24);
    }
    li.fail {
      color: #bb0505;
      border-left: 5px solid #bb0505;
    }
  `;
}
