'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, message } from 'antd'; // Import Ant Design components
import { verifyLogin } from '@/utils/actions';
import appConstants from '@/utils/contants';

const AuthForm = () => {
  const [loginCode, setLoginCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authenticated = localStorage.getItem('authenticated');
    if (authenticated) {
      router.push('/sms'); // Redirect to SMS page
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const isValid = await verifyLogin(loginCode)

    if (isValid) {
      localStorage.setItem(appConstants.STORAGE_KEYS.AUTH, loginCode); 
      router.push('/sms'); 
    } else {
      // Show antd nofitcation message
      message.error('Invalid login code');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        className="w-full max-w-md"
        layout="vertical"
      >
        <Form.Item
          label="Login Code"
          name="loginCode"
          rules={[{ required: true, message: 'Please input your login code!' }]}
        >
          <Input
            type="text"
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
            placeholder="Enter Login Code"
          />
        </Form.Item>

        <Form.Item className='w-full justify-center flex'>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
