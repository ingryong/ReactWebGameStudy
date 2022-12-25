## 제어형 인풋(Controled Input) & 비제어형 인풋(Uncontroled Input)

React에서 인풋에 두 가지 방법이 존재한다.

1. 비제어형 인풋(Uncontroled Input)
   기존 자바스크립트에서 작성하듯이 작성한다. 별도의 신경을 쓸 필요 없으며 제어형보다 매우 간결하다.
   제어형 인풋보다 할 수 있는 기능이 적으며 onSubmit의 범위에서만 사용하는 단순한 형태면 비제어형 인풋을 사용해도 상관없다.

```
<input ref={inputRef}>
```

2. 제어형 인풋(Controled Input)
   React에서 제어할 수 있도록 만들어진 문법으로 작성한다.
   React에서 제공하는 모든 기능을 사용할 수 있어 앱이 복잡해진다면 제어형 인풋을 사용하는 것을 추천한다.

```
<input ref={inputRef} value={value} onChange={(e.:changeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}>
```
