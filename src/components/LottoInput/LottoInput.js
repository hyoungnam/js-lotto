import { $ } from "../../utils/selectors.js";
import Component from "../component.js";

export default class LottoInput extends Component {
  constructor(app, props) {
    super(app, props);
    this.render();
    this.mount();
  }
  template = () => {
    const { purchaseMoney } = this.props.getState();
    return `<label class="mb-2 d-inline-block"
        >구입할 금액을 입력해주세요.
      </label>
      <div class="d-flex">
        <input
          name="purchase"
          type="number"
          value="${purchaseMoney ? purchaseMoney : ""}"
          class="input-purchase w-100 mr-2 pl-2"
          placeholder="구입 금액"
          required min="1000"
          max="100000"
          data-cy="input-purchase"
      />
      <button type="submit" class="btn btn-cyan btn-purchase" data-cy="btn-purchase">확인</button>
      </div>`;
  };
  mount = () => {
    this.$app.addEventListener("submit", (e) => {
      e.preventDefault();
      const purchase = e.target.elements["purchase"];
      if (Number(purchase.value) % 1000 !== 0 || !purchase.value) {
        alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
        purchase.value = "";
        return;
      }
      this.props.setState({ type: "UPDATE_LOTTOS", data: purchase.value });
    });
  };
}
