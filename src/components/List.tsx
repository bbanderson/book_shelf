import { Button, PageHeader, Table } from 'antd';
import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IBook } from '../types';
import Book from './Book';
import Layout from './Layout';
import styles from './List.module.css';

interface ListProps {
  books: IBook[] | null;
  loading: boolean;
  error: Error | null;
  getBooks: () => void; // 인자와 반환 모두 없음
  goAdd: () => void;
  logout: () => void;
}

export default function List({
  books,
  loading,
  getBooks,
  error,
  goAdd,
  logout,
}: ListProps) {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button
            key="2"
            type="primary"
            onClick={goAdd}
            className={styles.button}
          >
            책 추가
          </Button>,
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button}
          >
            로그아웃
          </Button>,
        ]}
      />
      <Table
        dataSource={books || []}
        columns={[
          {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => <Book {...record} />,
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        rowKey="bookId"
        pagination={false}
        className={styles.table}
      />
    </Layout>
  );
}
