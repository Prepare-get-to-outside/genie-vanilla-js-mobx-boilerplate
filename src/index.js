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
