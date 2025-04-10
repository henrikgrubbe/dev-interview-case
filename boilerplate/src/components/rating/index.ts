import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { starBold } from "./icons";

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  static styles = css`
    .star {
      box-sizing: content-box;
      height: 24px;
      width: 24px;
      padding: 4px;

      border: none;
      background: none;
      cursor: pointer;
    }

    svg {
      fill: #d5d5d5;
    }

    .star.filled svg {
      fill: #e9a93c;
    }

    .star:disabled {
      cursor: default;
      pointer-events: none;

      svg {
        fill: #eeeeee;
      }

      &.filled svg {
        fill: #b8b8b7;
      }
    }
  `;

  @property({ type: Number }) public rating = 0;
  @property({ type: Boolean }) public disabled = false;

  @state() private _hoveredRating: number | null = null;

  private readonly range: number[] = [...Array(5).keys()].map((i) => i + 1);

  protected render() {
    const shownRating = this._hoveredRating ?? this.rating;

    return html` <div>
      ${this.range.map(
        (i) =>
          html`<button
            type="button"
            class=${classMap({ star: true, filled: shownRating >= i })}
            ?disabled=${this.disabled}
            @focusin=${() => this.setHoveredRating(i)}
            @mouseenter=${() => this.setHoveredRating(i)}
            @focusout=${this.removeHoveredRating}
            @mouseleave=${this.removeHoveredRating}
            @click=${() => this.setRating(i)}
          >
            ${starBold}
          </button>`,
      )}
    </div>`;
  }

  private setHoveredRating(rating: number): void {
    this._hoveredRating = rating;
    this.dispatchRatingEvent("input", rating);
  }

  private removeHoveredRating(): void {
    this._hoveredRating = null;
  }

  private setRating(rating: number): void {
    this.rating = rating;
    this.dispatchRatingEvent("change", rating);
  }

  private dispatchRatingEvent(
    type: "input" | "change",
    rating: number,
  ): Promise<boolean> {
    return this.updateComplete.then(() =>
      this.dispatchEvent(
        new CustomEvent(type, {
          detail: {
            rating,
          },
          bubbles: true,
          composed: true,
        }),
      ),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "case-rating": CaseRating;
  }
}
