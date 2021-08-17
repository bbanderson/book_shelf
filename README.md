# Book Shelf
> 📚 Book Shelf Web Application in TypeScript, React and Redux.
---
### 1. 개발 환경 초기화
```shell
npx create-react-app . --template typescript
```

### 2. 라우팅을 위한 라이브러리 준비
```shell
yarn add react-router-dom
yarn add @types/react-router-dom -D # 타입스크립트를 위함
```

### 3. 에러 핸들링 페이지 라이브러리 준비
```shell
yarn add react-error-boundary # componentDidPatch로 런타임 에러 핸들링 → 에러 페이지로 이동시킨다.
```
```tsx
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Error from './pages/Error';

<ErrorBoundary FallbackComponent={Error}>
  <BrowserRouter>
    <Switch>
      <Route />
        {/* ... */}
    </Switch>
  </BrowserRouter>
</ErrorBoundary>
```

### 4. 비동기 처리를 위한 Redux 준비
```shell
yarn add redux react-redux redux-saga redux-devtools-extension redux-actions
yarn add @types/{react-redux,redux-actions} -D
```
```
.
└── src
    └── redux
        ├── create.ts
        └── modules
            ├── reducer.ts
            ├── auth.ts
            └── rootSaga.ts
```

### 5. 디자인 라이브러리 Ant Design 준비
```shell
yarn add antd
yarn add @ant-design/icons
```
```tsx
// index.tsx
import 'antd/dist/antd.css';
```

### 6. 로그인 설계

#### 6-1.`useRef`를 활용한 Uncontrolled Component 방식으로 input 데이터 관리
```tsx
// signin.tsx
/* ... */
const emailRef = useRef<Input>(null); // null 할당을 통해 타입 에러 방지
/* ... */
<Input ref={emailRef} />
/* ... */
```
#### 6-2. 로그인 API 호출 함수 타입 정의
children을 제외하고는 `interface`에서 정의한 타입과 Component의 `props`가 동일해집니다.  
```tsx
// Signin.tsx (Component)
type LoginReqType = { // types.ts로 분리함으로써 재사용하게 함
  email: string;
  password: string;
};

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  return <div></div>;
};
```

```tsx
// SigninContainer.tsx (Container)
export default function SigninContainer() {
  const login = useCallback((reqData) => {
    /* saga 함수 호출 및 비동기 처리 부분 */
  }, []);
  return <Signin login={login} />;
}
```

#### 6-3. `saga`에서 비동기 로직 부분을 `Service` 모듈로 위임

```
.
└── src
    ├── redux
    │   ├── create.ts
    │   └── modules
    │       ├── reducer.ts
    │       ├── auth.ts
    │       └── rootSaga.ts
    │
    ├── services
    │   └── UserService.ts
    │
    └── types.ts
```

```tsx
// services/UserService.ts

/* Token 발급을 위한 API 로직 분리 */
import axios from 'axios';
import { LoginReqType } from '../types';

const USER_API_URL = '';

/* API */
export default class UserService {
  public static async login(reqData: LoginReqType): Promise<string> {
    const response = await axios.post(USER_API_URL, reqData);
    return response.data.token;
  }
}
```

### husky
```shell
npx husky install
yarn add lint-staged -D
npx husky add .husky/pre-commit 'lint-staged'
```