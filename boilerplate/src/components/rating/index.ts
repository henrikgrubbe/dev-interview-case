import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { starFilled, starUnfilled } from "./icons";

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  @property({ type: Number }) public rating = 0;

  private readonly range: number[] = [...Array(5).keys()].map((i) => i + 1);

  protected render = () =>
    html` <div>
      ${this.range.map(
        (i) =>
          html`<span @click=${() => this.setRating(i)}
            >${this.rating >= i
              ? html`${starFilled}`
              : html`${starUnfilled}`}</span
          >`,
      )}
    </div>`;

  private setRating(rating: number): void {
    this.rating = rating;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "case-rating": CaseRating;
  }
}
