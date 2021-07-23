import { decorate, observable, computed, autorun } from "mobx";

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
  total: computed
});

const gs25 = new GS25();
autorun(() => gs25.total);
gs25.select("물", 800);
console.log(gs25.total);
gs25.select("물", 800);
console.log(gs25.total);
gs25.select("포카칩", 1500);
console.log(gs25.total);
