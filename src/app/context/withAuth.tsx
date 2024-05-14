import React, { useEffect } from 'react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth = (props: P) => {
    useEffect(() => {
      const fetchToken = async () => {
        const token = await localStorage.getItem('token');
        console.log("o token é", token);
        if (!token) {
          window.location.replace('/');
        }
      };

      fetchToken();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;