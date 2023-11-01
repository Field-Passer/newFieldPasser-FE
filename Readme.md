# Field-Passer

### 서울시 내 체육 시설 양도 서비스<br />

커뮤니티형 체육시설 양도 시스템의 불편함을 해소하기 위한 <br />
구장 양도 플랫폼 **_Field-Passer_**

## 📌 프로젝트 설명

- 비회원일 경우 게시글 검색 및 조회, 게시글 작성자의 전체 게시글 보기를 할 수 있습니다.
- 회원의 경우 양도글 작성 및 댓글 작성, 양도글 찜하기, 고객센터 문의를 할 수 있습니다.
- 관리자의 경우 게시글 삭제 및 블라인드, 고객센터 문의 답변, 회원 관리를 할 수 있습니다.

## ✨ 배포 링크

> [배포 링크](https://fieldpasser.netlify.app/)

## 👥 팀원

<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/106734517?v=4"  alt="강현주"/>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/114797992?v=4"  alt="배현수"/>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/113992260?v=4"  alt="조민정"/></td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/76930602?v=4"  alt="한수산"/></td>
     </tr>
    <tr>
      <td align="center" width="200px"><a href="https://github.com/iziz9"><img src="https://img.shields.io/badge/강현주-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a></td>
      <td align="center" width="200px"><a href="https://github.com/HyunSooBae"><img src="https://img.shields.io/badge/배현수-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a></td>
      <td align="center" width="200px"><a href="https://github.com/quokka-eating-carrots"><img src="https://img.shields.io/badge/조민정-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a></td>
      <td align="center" width="200px"><a href="https://github.com/0nesan"><img src="https://img.shields.io/badge/한수산-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a></td>
    </tr>
    <tr>
      <td align="center" width="200px">
        <p>메인페이지</p>
        <p>헤더, 푸터, 사이드바</p>
        <p>게시글 작성 및 수정</p>
        <p>타임셀렉터</p>
        <p>공용 모달</p>
      </td>
      <td align="center" width="200px">
        <p>로그인 관련(토큰관리, 소셜 로그인)</p>
        <p>회원 관련(가입, 메일인증, 정보수정 등)</p>
        <p>PrivateRoute 설정</p>
      </td>
      <td align="center" width="200px">
        <p>회원 게시글, 댓글 조회</p>
        <p>관리자 게시글 관리 및 고객센터 답변</p>
      </td>
      <td align="center" width="200px">
        <p>검색</p>
        <p>게시글 목록, 게시글 상세</p>
        <p>댓글</p>
      </td>
     </tr>
  </tbody>
</table>
<br/>

## 💻 로컬 실행 방법

1. 로컬 환경에 프로젝트 복사본 생성

```bash
git clone
```

2. 프로젝트 폴더로 이동

```bash
cd newFieldPasser-FE
```

3. 프로젝트 종속성 설치

```bash
npm install
```

4. 프로젝트 실행

```bash
npm run dev
```

## 🛠️ 기술 스택

![React](https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![styledComponents](https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

## 📋 프로젝트 구조

```bash
.
└── src/
    ├── api/
    ├── components/
    ├── constants/
    ├── hooks/
    ├── pages/
    ├── routes/
    ├── storage/
    ├── store/
    ├── utils/
    ├── App.tsx
    ├── globalStyles.tsx
    ├── main.tsx
    └── vite-env.d.ts
```

## 🤝 협업 방식

![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

- GITHUB <br />
  - ISSUE, PR 컨벤션 활용
- SLACK <br />
  - 백엔드, UX/UI 디자이너와 소통
  - github 봇을 활용하여 이슈 및 pr 확인
- FIGMA <br />
  - 디자인 확인 및 UX/UI 디자이너와 소통

## 🔧 주요 기능 설명

- API 작성 방법<br />
  api 호출 시 공통적으로 사용되는 baseURL, 로그인 유무 등을 axios interceptor로 작성하였습니다. 로그인 정보가 필요한 api는 private, 로그인 정보가 필요 없는 api는 public으로 나누어 api를 주고받습니다. `src > api` 폴더엔 각 기능에 맞는 api들을 나누어 코드들을 작성하였고, api를 사용하는 페이지에서 `try-catch-finally`를 사용하여 에러 처리 및 기능 구현을 하였습니다.
- custom hooks<br />
  - `useAxiosInterceptor`: axios interceptor를 활용하여 작성한 훅입니다. api 호출 에러 시 modal hook을 활용하기 위해 axios interceptor를 커스텀 훅스로 작성하게 되었습니다.
  - `useScreenHook`: 스크린 사이즈에 따른 반응형 웹을 구현하기 위해 작성한 훅입니다.
  - `useModal`, `useSidebar`: 모달, 사이드바의 열고 닫힘을 구현하기 위해 작성한 훅입니다.
  - `useInfinityScroll`: 무한 스크롤 기능을 구현하기 위해 작성한 훅입니다.
  - `useInputHook`: input에 작성한 값의 유효성을 검사하기 위해 작성한 훅입니다.
  - `useLoginState`: 로그인 상태를 확인하기 위해 작성한 훅입니다.
- private route<br />
  로그인 상태 시 접근할 수 있는 페이지를 `privateRoute` 컴포넌트로 감싸 주어 권한을 확인하였습니다.

## 😏 프로젝트 후기

<table border>
  <tbody>
    <tr>
      <td align="center" width="80px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/106734517?v=4"  alt="강현주"/>
        <a href="https://github.com/iziz9"><img src="https://img.shields.io/badge/강현주-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a>
      </td>
      <td>
        맡은 기능을 오류 없이 구현하고 재사용 가능한 코드를 작성하는 것을 목표로 프로젝트를 시작했는데, 기능구현을 끝낸 후 살펴보니 전체적으로 중복코드, 반응형 구현을 위해 지나치게 길게 작성된 코드, 통일성 없는 코드가 많아 리팩토링을 진행하게 되었습니다. <br />
        먼저 공통적으로 사용되는 기능(모달, 무한스크롤 등)을 커스텀 훅으로 묶어 중복코드를 줄이고, 여러 기능을 하고 있는 함수를 분리하고, 컴포넌트 구조를 변경해 불필요하게 사용되고 있던 상태를 정리하여 코드 가독성을 높였습니다. <br />
        이런 과정을 통해 클린코드를 고민하고 작성할 수 있는 능력을 키울 수 있었습니다.<br />
        또한 이전까지의 프로젝트에서는 해보지 못했던 SEO 설정과 로딩속도 개선을 위한 이미지 최적화 등 새로운 시도를 해보며 개발 지식을 쌓을 수 있었습니다. <br />
        개발 기간이 계획한 기간보다 너무 길어져 아쉬웠지만 개인적으로 역량이 많이 발전했음을 느낀 프로젝트였습니다.
      </td>
     </tr>
    <tr>
      <td align="center" width="80px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/114797992?v=4"  alt="배현수"/>
        <a href="https://github.com/HyunSooBae"><img src="https://img.shields.io/badge/배현수-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a>
      </td>
      <td>
        ✨ 프로젝트를 진행하면서 중요하게 생각한 것

1. 혼자만 알아볼 수 있는 코드 지양하기
   - 변수명 가능한 직관적으로 적기. (의미를 명확하게 하기위해 단어가 여러개 붙어서 길어지는 경우에도 되도록 생략하지 않음.)
   - 코드에 적절한 주석 첨부하기.
2. 커밋을 자주, 쪼개서 하기
   - 초반에는 여러 수정사항이 뒤섞인 커밋을 올리다가, 중반 이후에 특정 시점 커밋을 찾을때 애로 사항이 있다는 점을 깨닫고 커밋을 세세하게 나누도록 주의함.
3. Axios Interceptor 설정하기
   - 처음 구현해보는 기능이고 프로젝트 초반에 완성되어야 하는 기능이라서 빠르게 작성할 수 있도록 노력함.
   - 유저가 회원인지 아닌지 토큰으로 확인 후 처리하는 과정을 인터셉터 안에서 모두 거치도록 구현함.

✨ 프로젝트 후기 <br />

- 백엔드 팀과의 협업 경험을 위해 시작한 작은 프로젝트 였는데, 진행하면서 점점 규모가 커져 결과물이 멋있어진 프로젝트 였습니다. 개인 프로젝트와는 달리 팀원들과 함께하는 것이기에 문제가 생겼을땐 빠르고 정확하게 소통하기 위해 노력했습니다. 모두들 마지막까지 열정을 잃지 않고 임해서 마무리까지 즐겁게 잘 끝낼 수 있었고, 팀원들 모두 수고했다는 말을 전하고 싶습니다.

- 계획에 없던 기능을 하나둘씩 추가하게 됐을때는 ux/ui 팀, 백엔드 팀과 더 세심하게 소통해야 했고 감사하게도 모두들 협력을 아끼지않아 주었습니다. 디자인 팀과는 [피그마](https://www.figma.com/file/ocoiMyDtEOETflpDHlEHgn/field-passer?type=design&node-id=528-3099&mode=design&t=SH2i4vxncB5HrAph-0)의 댓글로, 백엔드 팀과는 슬랙으로 주로 소통했는데 협업 툴의 활용도 중요하다는 점을 깨달을 수 있었습니다.

- 중간에 잠시 프로젝트가 늘어진 기간이 있는데, 마감 기간을 명확하게 협의해야 더 집중도 있게 프로젝트를 진행할 수 있다는 점도 알게 되었습니다.

- 최종 마무리 기간에 코드의 통일성을 위해 리팩토링을 진행하면서 다른 사람의 코드를 주의깊게 살필 수 있었습니다. 혼자 코드를 작성해보는 것도 중요하지만 이후 다른 프로젝트를 진행할 때는 먼저 다른 팀원이 코드를 짜는 방식을 확인하고 맞춰봐도 좋겠다는 생각이 들었습니다.
  </td>
    </tr>
    <tr>
      <td align="center" width="80px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/113992260?v=4"  alt="조민정"/>
        <a href="https://github.com/quokka-eating-carrots"><img src="https://img.shields.io/badge/조민정-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a>
      </td>
      <td>
        ✨ 프로젝트를 진행하면서 중요하게 생각한 것

1. 반응형 웹 페이지를 자연스럽게 구현하기 <br />
   a. `react-responsive` 를 활용하여 `useScreenHook` 을 작성 <br />
   b. 웹 페이지 크기에 따른 폰트 사이즈, 버튼 크기 등 디자인을 상수로 저장하여 활용
1. 중복된 코드를 최소화로 하기 <br />
   a. 반복되는 코드는 util, hooks, constants, components로 작성
1. 다른 사람이 내 코드에 대해 질문할 때 명확하게 대답할 수 있게 하기 <br />
   a. 팀원의 코드를 참고할 때도 왜 그렇게 작성했을지 생각한 후 참고 <br />
   b. 닌자 코드가 되지 않게 조심

✨ 프로젝트 후기 <br />
오랜 시간 진행해 온 프로젝트인 만큼 완벽하게 끝내고 싶었던 생각이 큰 프로젝트였습니다. 제가 가진 역량을 최대한 활용하여 프로젝트를 완성하려고 노력하였고, 팀원들 역시 처음 진행했을 때보다 더 다양한 방법을 제시해 주시면서 저 역시도 성장할 수 있는 기회였습니다.

프로젝트를 진행하면서 아쉬운 몇 가지를 꼽아 보자면 첫째, **`styled-components` 를 작성하는 스타일이 달랐던 점**입니다. 우선 저는 class-name을 자주 활용하지 않는 편이었는데 팀원들의 pr을 확인하면서 *아, 이렇게도 작성할 수 있구나*를 많이 느꼈습니다. 제가 개발하기로 한 기능을 넣으려 다른 팀원의 코드에 추가적으로 작성해야 할 때, 저와는 다른 스타일의 코드를 보고 어려움을 느꼈습니다. 그 후 팀원의 방식이 좋다고 느껴져 제가 작성한 코드에도 활용하려고 노력하였습니다.

둘째, **공통으로 사용할 수 있는 디자인 관련 컴포넌트를 정하자**입니다. uxui 분들이 주신 디자인을 보면서 최대한 공통으로 사용할 수 있는 건 컴포넌트로 빼서 작성을 하긴 했지만 다른 팀원이 편하게 사용하기 위해 작성하는 것은 꽤나 견고한 설계가 필요하다는 것을 느낄 수 있었습니다.

이런 아쉬운 점들이 있지만 프로젝트를 진행하면서 더 성장할 수 있었던 것도 있습니다. 첫째, **반응형 웹 페이지 코드를 작성하는 게 조금은 익숙해졌다는 점**입니다. 그 전 프로젝트를 진행할 때는 `tailwindCSS` 를 활용하여 class-name으로 간단하게 반응형을 구현하였는데, `styled-components` 와 `react-responsive` 를 활용하여 css 관련 hooks도 작성하고, 웹 페이지의 크기에 따른 조금 더 명확한 코드를 작성할 수 있었습니다.

둘째, **오류에 대체하는 법**입니다. `try-catch-finally`를 적절하게 사용하려고 노력하였습니다. 이번 프로젝트에서는 사용자가 웹 페이지를 이용할 때 게시글 작성을 성공한다든지, 게시글을 삭제하려고 한다든지 어떤 행동을 하였을 때 그 행동이 정확히 실행되었는지 modal을 통해서 메시지를 전달하였습니다.

셋째, **팀 프로젝트라서 제가 놓친 부분들을 더 신경 쓸 수 있었다는 점**입니다. 완성을 하는 것에 급급한 저와 달리 웹 최적화에 대한 부분이나, 다른 분들이 구현한 기능에 대해 설명을 들으면서 다른 분이 구현한 기능과 연계되는 기능을 개발할 땐 조금 더 이해를 한 상태에서 구현을 할 수 있었던 점이 좋았습니다.

</td>
</tr>
<tr>
<td align="center" width="80px">
<img width="100%" src="https://avatars.githubusercontent.com/u/76930602?v=4"  alt="한수산"/>
<a href="https://github.com/0nesan"><img src="https://img.shields.io/badge/한수산-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/></a>
</td>
<td>
평소 생각하지 않았던 디테일들을 팀원들이 구현하는 방식을 통해 알게되었고, 기술적인 면에서 새로운 시도를 해볼 수 있어서 좋았습니다.<br/>
type interface를 vite-env.d 파일에 모아 import없이 사용한다던지. globalStyles에 css 변수를 생성해 활용한다던지. svg icon을 함수 형태로 활용한다던지 하는 다양한 시도들을 해볼 수 있어서 좋았으며, custom hooks. redux 등 잘 모르고 사용하던 개념이나 도구들에 이해도를 좀 더 가져갈 수 있었던 것 같습니다.

리팩터링 기간을 통해 현재의 코드를 개인적으로 리뷰해 볼 수 있었으며, 그 활동을 통해 어떻게 하면 효율적으로 코드를 작성할지, 클린코드는 어떤건지에 관련한 고민을 해볼 수 있었습니다.

</td>
</tr>

  </tbody>
</table>
