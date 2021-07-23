import {
  decorate,
  observable,
  computed,
  autorun,
  action,
  transaction
} from "mobx";

/**
 * class로 편의점 장바구니 구현
 */
class GS25 {
  basket = [];

  get total() {
    console.log("계산중입니다..!");
    /**
     * Reduce 함수로 배열 내부의 객체의 price 총합 계산
     * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
     */
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

/**
 * decorate 를 통해서 각 값에 MobX 함수 적용
 */
decorate(GS25, {
  basket: observable,
  total: computed,
  select: action // 액션 명시
});
/**
 * action: 상태에 변화를 일으키는 것
 * action 을 사용함에 있어서의 이점
 * 1. 나중에 개발자 도구에서 변화의 세부 정보를 볼 수 있고,
 * 2. 변화가 일어날 때마다 reaction들이 나타나는 것이 아니라, 변화를 한꺼번에 일으켜서 모든 액션이 끝나고 난 다음에서야 reaction이 나타나게 해줄 수 있다.
 * 액션을 한꺼번에 일으키는 건, transaction으로 할 수 있다.
 */

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
