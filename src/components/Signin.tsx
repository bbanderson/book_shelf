import { Button, Col, Input, Row } from 'antd';
import React from 'react';
import { useRef } from 'react';
import { LoginReqType } from '../types';
import styles from './Signin.module.css';

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);
  return (
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signing_contents}>
          <Col span={12}>
            <img
              src="/bg_signin.jpeg"
              alt="signin"
              className={styles.signin_bg}
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>내 서재</div>
            <div className={styles.signin_subtitle}>
              당신의 생각을 남겨 주세요.
            </div>
            <div className={styles.signin_underline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                placeholder="이메일"
                autoComplete="email"
                name="email"
                className={styles.input}
                ref={emailRef}
              />
            </div>
            <div className={styles.password_title}>
              Password
              <span className={styles.required}> *</span>
            </div>
            <div className={styles.input_area}>
              <Input
                type="password"
                autoComplete="current-password"
                className={styles.input}
                ref={passwordRef}
              />
            </div>
            <div className={styles.button_area}>
              <Button className={styles.button} onClick={click}>
                로그인
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
  function click() {
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;
    console.log(email, password);
    login({ email, password });
  }
};

export default Signin;