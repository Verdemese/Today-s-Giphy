##2020-03-03
1. 페이지의 클릭이벤트를 hashchange 이벤트로 변경하여, 현재페이지를 클릭하더라도 페이지의 상태가 변경되지 않도록 변경함.
    - 중복되고, 불필요하던 코드들을 삭제

2. 검색했을 경우 url 경로에 표기와 페이지 탐색시 hash를 사용하여 페이지를 구분함.
    - history.pushState() 사용
    - ex) 'kermit the frog' 검색, 2page 일 경우 /kermit the frog#page=2

3. load event listener를 추가하여, 페이지를 reload했을 때에도 이전 페이지가 남아있도록 변경함.
    - pushState() 를 사용하여 url을 변경, 현재의 state상태를 window.history.state에 저장.
    - history.state는 Search class의 constructor를 통해 만들어진 instance가 아니기 때문에 prototype을 상속받지 못해, Search class의 method를 사용하지 못함.
    - reload된 state의 상태는 빈 object이기 때문에, 새로운 인스턴스를 생성한 후, history.state.search를 Object.assign을 통해 Search class의 method를 사용할 수 있게 함.

<!-- 모듈 패턴을 사용하는 이유와 모듈 패턴에 대해서 알아볼 것-->
<!--
    - url 검색 파라미터의 생성조건 /?id=query 의 형식 
    - 이것은 window.location.search에 저장됨
    - window.location과 window.history, pushState(), Object.assign
-->

     