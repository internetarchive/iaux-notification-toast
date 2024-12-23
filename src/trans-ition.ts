import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('iaux-trans-ition')
export class IauxTransition extends LitElement {
  @property({ type: Number, reflect: true }) displayDurationSeconds: number = 4;

  @property({ type: String, reflect: true }) status: 'success' | 'fail' =
    'success';

  @property({ type: String }) message: string = '';

  @property({ type: Boolean, reflect: true }) displayedTransition = false;

  updated(changed: PropertyValues) {
    if (changed.has('message') || changed.has('status')) {
      const validChange = this.message || this.status;
      if (validChange) {
        this.displayedTransition = true;
      }
    }

    if (changed.has('displayedTransition')) {
      if (this.displayedTransition) {
        console.log('new notif');
        // eslint-disable-next-line wc/no-self-class
        this.classList.add('new-notification');
        setTimeout(async () => {
          // eslint-disable-next-line wc/no-self-class
          this.classList.remove('new-notification');
          console.log('OLD notif');

          // eslint-disable-next-line wc/no-self-class
          this.classList.add('displayed-notification');
          this.displayedTransition = false;
          await this.updateComplete;
          this.dispatchEvent(new CustomEvent('NotificationDisplayed'));
        }, this.secondsToDisplay);
      }
    }
  }

  get secondsToDisplay() {
    return (this.displayDurationSeconds ?? 4) * 1000;
  }

  render() {
    const icon = this.status === 'success' ? '✓' : '✖';

    const x = html`<li>${icon} ${this.message}</li>`;
    return x;
  }

  static styles = css`
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes close {
      100% {
        visibility: visible;
      }
      0% {
        visibility: hidden;
      }
    }

    :host() {
      display: block;
    }

    :host([status='success']) {
      color: rgb(33, 149, 24);
      border-left: 5px solid rgb(33, 149, 24);
    }
    :host([status='fail']) {
      color: #bb0505;
      border-left: 5px solid #bb0505;
    }

    :host(.new-notification) {
      animation: fadeIn 1s;
      /* animation-timing-function: ease-in; */
    }

    :host(.displayed-notification) {
      animation: close 1s;
      display: none;
      /* animation: ease-out 1s; */
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
    li.delete {
      background-color: salmon;
    }
  `;
}
