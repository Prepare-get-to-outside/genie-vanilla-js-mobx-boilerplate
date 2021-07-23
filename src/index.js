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
 * reaction: 특정 값이 바뀔 때 특정 작업 하기!
 * a 나 b 가 바뀔 때 console.log 로 바뀌었다고 알려주도록 코드를 작성
 */
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`a 값이 ${value} 로 바뀌었네요!`);
  }
);

reaction(
  () => calculator.b,
  (value) => {
    console.log(`b 값이 ${value} 로 바뀌었네요!`);
  }
);

calculator.a = 10;
calculator.b = 20;
