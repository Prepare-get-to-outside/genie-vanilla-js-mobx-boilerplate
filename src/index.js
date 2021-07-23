import { observable, computed, autorun, action, transaction } from "mobx";
/**
 * class로 편의점 장바구니 구현
 */
class GS25 {
  // *** decorator 문법: 정규 문법은 아니지만, babel 플러그인을 통하여 사용할 수 있는 문법
  @observable basket = [];

  @computed
  get total() {
    console.log("계산중입니다..!");
    /**
     * Reduce 함수로 배열 내부의 객체의 price 총합 계산
     * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
     */
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  @action
  select(name, price) {
    this.basket.push({ name, price });
  }
}

// **** decorator 문법 사용하면 decorate 함수가 더 이상 필요하지 않음
// decorate(GS25, {
//   basket: observable,
//   total: computed,
//   select: action // 액션 명시
// });

const gs25 = new GS25();
autorun(() => gs25.total);
// 새 데이터 추가 될 때 알림
autorun(() => {
  if (gs25.basket.length > 0) {
    console.log(gs25.basket[gs25.basket.length - 1]);
  }
});

/**
 * transaction으로 감쌈
 * 계산 작업은 가장 처음 한번, 그리고 transaction 끝나고 한번 호출이 되었고,
 * 새 데이터 추가될 때마다 알리는 부분도 3개가 다 추가된 후 마지막 객체만 콘솔에 나타남
 */
transaction(() => {
  gs25.select("물", 800);
  gs25.select("물", 800);
  gs25.select("포카칩", 1500);
});

console.log(gs25.total);
