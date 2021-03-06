import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Line, Heading, Spinner, Txt, WarnTxt } from 'components/atoms';
import { Field, TwitterButton } from 'components/molecules';
import config from 'src/config';

export interface Props {
  emailValue: string;
  passwrodValue: string;
  emailValidationError: string;
  passwordValidationError: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabledSubmitButton: boolean;
  isLoading: boolean;
  error: string | null | undefined;
  isError: boolean;
}

const LoadingComponent = () => (
  <span>
    <StyledTxt tag="span" size="s">
      読み込み中
    </StyledTxt>
    <Spinner height={14} width={14} />
  </span>
);

const LoginForm: React.FC<Props> = ({
  emailValue,
  passwrodValue,
  emailValidationError,
  passwordValidationError,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  disabledSubmitButton,
  isLoading,
  error,
  isError,
}) => {
  return (
    <Container>
      <Heading type="h2" align="center">
        ログイン
      </Heading>
      <Form onSubmit={onSubmit}>
        <Field
          placeholder="メールアドレス"
          value={emailValue}
          onChangeHandler={onChangeEmail}
          isError={isError}
          validationError={emailValidationError}
        />
        <Field
          type="password"
          placeholder="パスワード"
          value={passwrodValue}
          onChangeHandler={onChangePassword}
          isError={isError}
          validationError={passwordValidationError}
        />
        {isError && <StyledWarnTxt size="b">{error}</StyledWarnTxt>}
        <MarginBlock>
          <Button type="submit" disabled={disabledSubmitButton || isLoading}>
            {isLoading ? <LoadingComponent /> : 'ログインする'}
          </Button>
        </MarginBlock>
      </Form>
      <Line text="または" />
      <MarginBlock>
        <a href={config.twitterLoginUrl}>
          <TwitterButton text="twitterアカウントでログイン" />
        </a>
      </MarginBlock>
      <Line />
      <MarginBlock>
        <Link to="/signup">
          <Button color="secondary">新規アカウント作成</Button>
        </Link>
      </MarginBlock>
    </Container>
  );
};

const Container = styled.div`
  width: 310px;
  display: inline-block;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MarginBlock = styled.div`
  margin: 20px auto;
  text-align: center;
`;
const StyledTxt = styled(Txt)`
  color: white;
  margin-right: 6px;
  vertical-align: middle;
`;
const StyledWarnTxt = styled(WarnTxt)`
  margin-top: 10px;
`;

export default LoginForm;
