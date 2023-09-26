# Field-Passer

구장 양도 서비스 Field-Passer

## 배포 링크

> [배포 링크](https://fieldpasser.netlify.app/)

## 👥 팀원

<table border>
  <tbody>
    <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/106734517?v=4"  alt="강현주"/><br />
        <a href="https://github.com/iziz9">
          <img src="https://img.shields.io/badge/강현주-5FCA7B?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src=""  alt="배현수"/><br />
        <a href="">
          <img src=""/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src=""  alt="조민정"/>
        <a href="">
          <img src=""/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src=""  alt="한수산"/>
        <a href="">
          <img src=""/>
        </a>
      </td>
     </tr>
  </tbody>
</table>
<br/>

## 로컬 실행 방법

1. 로컬 환경에 프로젝트 복사본 생성

```bash
git clone
```

2. 프로젝트 폴더로 이동

```bash
cd
```

3. 프로젝트 종속성 설치

```bash
npm install
```

4. 프로젝트 실행

```bash
npm run dev
```

## 기술 스택

![React](https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![styledComponents](https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white)

## 프로젝트 구조

```bash
.
└── src/
    ├── api/
    │   ├── axiosInstance.ts
    │   └── searchApi.ts
    ├── components/
    │   ├── common/
    │   │   ├── Loading.tsx
    │   │   └── NoData.tsx
    │   └── search/
    │       ├── icon/
    │       │   └── SearchIcon.tsx
    │       ├── layout/
    │       │   ├── AutoCompleteItemLayout.tsx
    │       │   └── InputLayout.tsx
    │       ├── AutoCompleteItem.tsx
    │       ├── AutoCompleteList.tsx
    │       ├── EmptyButton.tsx
    │       └── SearchIndex.tsx
    ├── hooks/
    │   ├── useDebounce.ts
    │   └── useRequest.ts
    ├── pages/
    │   ├── error/
    │   │   └── Error.tsx
    │   └── search/
    │       └── Search.tsx
    ├── router/
    │   ├── Router.tsx
    │   └── routerPaths.ts
    ├── state/
    │   └── focusindexReducer.ts
    ├── types/
    │   ├── commonTypes.ts
    │   └── sickTypes.ts
    ├── utils/
    │   ├── CacheManager.ts
    │   ├── handleError.ts
    │   └── validate.ts
    ├── App.tsx
    └── index.tsx
```
