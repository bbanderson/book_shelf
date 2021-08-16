import { ForkOutlined } from '@ant-design/icons';
import { Button, Input, PageHeader } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Layout from './Layout';
import styles from './Add.module.css';

interface AddProps {
  loading: boolean;
  back: () => void;
  logout: () => void;
}

const Add: React.FC<AddProps> = ({ loading, back, logout }) => {
  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <ForkOutlined /> 책 추가
          </div>
        }
        subTitle="나만의 책을 추가하세요."
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
          >
            로그아웃
          </Button>,
        ]}
      />
      <div className={styles.add}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="Title" className={styles.input} />
        </div>
        <div className={styles.input_comment}>
          Comment
          <span> *</span>
        </div>
        <div className={styles.input_area}>
          <TextArea rows={4} placeholder="Comment" className={styles.input} />
        </div>
        <div className={styles.input_author}>
          Author
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="Author" className={styles.input} />
        </div>
        <div className={styles.input_url}>
          URL
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="URL" className={styles.input} />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            추가
          </Button>
        </div>
      </div>
    </Layout>
  );

  function click() {}
};

export default Add;
