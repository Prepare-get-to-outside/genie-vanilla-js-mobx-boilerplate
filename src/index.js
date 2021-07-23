import { observable, reaction, computed, autorun } from "mobx";

/**
 * observable: Observable State 만들기
 * Observable State를 만들고 나면 MobX가 이 객체를 "관찰할 수" 있어서 변화가 일어나면 바로 탐지해낼 수 있다.
 * 덧셈을 해주는 계산기 객체 추가
 */
const calculator = observable({
  a: 1,
  b: 2
});

/**
 * computed: 연산된 값을 사용해야 할 때 사용
 * 특징은, 이 값을 조회할 때마다 특정 작업을 처리하는 것이 아니라,
 * 이 값에서 의존하는 값이 바뀔 때 미리 값을 계산해놓고 조회할 때는 캐싱 된 데이터를 사용한다는 점
 * computed 로 특정 값 캐싱
 */
const sum = computed(() => {
  console.log("계산중이예요!");
  return calculator.a + calculator.b;
});

/**
 * autorun: autorun으로 전달해 주는 함수에서 사용되는 값이 있으면 자동으로 그 값을 주시하여 그 값이 바뀔 때마다 함수가 주시되도록 해준다.
 * reaction이나 computed의 observe 대신에 사용될 수 있음
 */
// **** autorun 은 함수 내에서 조회하는 값을 자동으로 주시함
autorun(() => console.log(`a 값이 ${calculator.a} 로 바뀌었네요!`));
autorun(() => console.log(`b 값이 ${calculator.b} 로 바뀌었네요!`));
autorun(() => sum.get()); // su
// **** computed로 만든 값의 .get() 함수를 호출해 주면, 하나하나 observe 해주지 않아도 됨
// sum.observe(() => calculator.a); // a 값을 주시
// sum.observe(() => calculator.b); // b 값을 주시

calculator.a = 10;
calculator.b = 20;

// 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);

calculator.a = 20;

// 내부의 값이 바뀌면 다시 호출 함
console.log(sum.value);
