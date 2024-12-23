import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import './trans-ition';

export type aNotification = {
  message: string;
  status: 'success' | 'fail';
};

@customElement('iaux-notification-toast')
export class IauxNotificationToast extends LitElement {
  @property({ type: Number }) displayDurationSeconds: number = 4;

  @property({ type: Number }) maxNotifs: number = 2;

  @property({ type: Array }) updates: aNotification[] = [];

  @property({ type: Array }) notifsDisplaying: aNotification[] = [];

  @property({ type: Object }) notifToDisplay: aNotification | null = null;

  @property({ type: Boolean }) deleteEarliestNotif: boolean = false;

  @query('ul') notificationList!: HTMLUListElement;

  get earliestNotifElement() {
    return this.notificationList.lastElementChild;
  }

  public clear() {
    this.updates = [];
    this.notifsDisplaying = [];
  }

  updated(changed: PropertyValues) {
    if (changed.has('notifToDisplay')) {
      if (this.notifToDisplay) {
        this.cycleNotifs();
      }
    }
  }

  private async cycleNotifs() {
    if (!this.notifToDisplay) {
      return;
    }
    const currentNotifsDisplayed = this.notifsDisplaying;
    if (this.deleteEarliestNotif) {
      currentNotifsDisplayed.pop();
      this.deleteEarliestNotif = false;
      console.log('**** cycleNotifs - delete earliest notif');

      await this.updateComplete;
    }

    this.notifsDisplaying = [this.notifToDisplay, ...currentNotifsDisplayed];
    this.notifToDisplay = null;
    console.log(
      '**** cycleNotifs - notifToDisplay loaded in',
      this.notifToDisplay
    );
  }

  public addNotification(notif: aNotification) {
    const allNotifs = [...this.notifsDisplaying, notif];
    this.updates = allNotifs;

    this.notifToDisplay = notif;

    // check notifsDisplaying
    const newDisplayList = [notif, ...this.notifsDisplaying];
    if (newDisplayList.length > this.maxNotifs) {
      this.deleteEarliestNotif = true;
      this.earliestNotifElement!.classList.add('delete');
      console.log('**** addNotif - delete earliest notif');
    }
  }

  get secondsToDisplay() {
    return (this.displayDurationSeconds ?? 4) * 1000;
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
    return html`<iaux-trans-ition
      .status=${update.status}
      .message=${update.message}
      @NotificationDisplayed=${() => {
        const newDisplayList = this.notifsDisplaying.filter(
          notif => notif !== update
        );
        this.notifsDisplaying = newDisplayList;
      }}
    >
    </iaux-trans-ition>`;
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
  `;
}
