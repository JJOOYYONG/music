< 배운걸 활용한 개인 연습 프로젝트>
구현 프로그램 : 파이썬
DB : 몽고 DB 아틀라티스
서버 : FLASK(사용예정)
 
# 👉🏼개발 목표 및 구성

---

1. 웹디자인 하면서 백엔드 작업시 어떤점을 유의해야하는지 해보기
2. 웹종합시 파이썬 문법 및 db저장 기능 익숙해지기
3. 간단한거,엉망이여도 머릿속에 있는거 해보기

<구성도>

음악 url 을 입력 하면 해당 음악이 내 play list에 저장 

---

# 💪🏻반드시  적용할것

- [ ]  반응형 웹
- [x]  웹크롤링(지니뮤직)
- [x]  DB저장(몽고DB아틀라티스)

---

# 😜🫠진행사항

## 0624(금)

- [x]  환경세팅
- [ ]  Doit 웸디 예제 클론
- **0625(토)**
    - [x]  카드 이전/다음 js기능 마무리
    - [x]  웹디 html/css 다 끝내기
    - [x]  URL 삽입 박스 구현
    - [x]  지니뮤직 웹크롤링
    - [x]  크롤링 데이터 저장
    - [x]  화면 뿌리기
    
- 0672(월)
    - [x]  url 입력 창 css 추가
    - [x]  음악 mp 웹크롤링 서치
    - [x]  가운데 이미지 class 동적  추가 js 수정
    
    <aside>
    🔥 [https://jae04099.tistory.com/78](https://jae04099.tistory.com/78)
    
    </aside>
    
    - [ ]  여러개 추다되았을때 화면 처리
- 0628(화)
    - [ ]  뮤직 api 붙이기 시도
    - [ ]  반응형 웹 제어 시도

---

# 에러 목록

1. 작성하는 js head안에 넣어둬서 호출이 안됨(6/24)

<aside>
🔥 body 안에 넣음

</aside>

1. 폰트어썸 kit 코드 오류(6/24)

<aside>
🔥 새로운 kit 발급

</aside>

1. ajax(404)  오류 발생

원인 : app.py에서 if__name__~ 부분이 맨 위에 선언 되어 있어서 내가 만든 url을 못찾음

해결 : 부트캠프 단톡방 조언 및 참고했던 예제 탐독

```jsx
if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
```

1. 웹크롤링 에러(ajax500) 발생

원인: 접근했던 지니뮤직 meta img 의 정보가  총3개 였고, 가져온  title과artist가 묶여있었는데  split 이상하게 처리함

해결 : 3개 img 정보중 1개를 정해 풀네임으로 씀 ,  title,artist는 콘솔창에 하나씩 찍어보면서 데이터 를 확인함

```jsx
//넘어오던 데이터 ' 제목 / 가수이름 - genie'
og_info = soup.select_one('meta[property="og:title"]')
og_title = og_info['content'].split('/')[0]
og_artist = og_info['content'].split('/')[1].split('- genie')[0]

//잘못쓴 코드  : og_title = ot_info.split('/')[0]['content']
```

---
