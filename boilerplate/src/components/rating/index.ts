import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { starBold } from "./icons";

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  static styles = css`
    div {
      display: flex;
    }

    span {
      height: 24px;
      width: 24px;
      padding: 4px;
      cursor: pointer;
    }

    svg {
      fill: #d5d5d5;
    }

    span[filled] svg {
      fill: #e9a93c;
    }
  `;

  @property({ type: Number }) public rating = 0;

  @state() private _hoveredRating: number | null = null;

  private readonly range: number[] = [...Array(5).keys()].map((i) => i + 1);

  protected render() {
    const shownRating = this._hoveredRating ?? this.rating;

    return html` <div>
      ${this.range.map(
        (i) =>
          html`<span
            ?filled=${shownRating >= i}
            @mouseenter=${() => (this._hoveredRating = i)}
            @mouseleave=${() => (this._hoveredRating = null)}
            @click=${() => this.setRating(i)}
            >${starBold}</span
          >`,
      )}
    </div>`;
  }

  private setRating(rating: number) {
    this.rating = rating;
    this._hoveredRating = null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "case-rating": CaseRating;
  }
}
