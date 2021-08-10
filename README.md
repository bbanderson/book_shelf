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