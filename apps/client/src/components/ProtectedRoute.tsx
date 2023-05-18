import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
import React, { ReactNode, useEffect, useState } from 'react';
import Notification from './Error/Notification';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const auth = useSelector((state: RootState) => state?.result.userId);
    const [notify, setNotify] = useState(false);

    useEffect(() => {
        setNotify(!auth);
    }, [auth]);

    if (!auth) {
        return (
            <>
                {notify && (
                    <Notification
                        message="Please login to continue"
                        type="warning"
                        onClose={() => setNotify(false)}
                    />
                )}
                <Navigate to={'/signin'} replace={true} />
            </>
        );
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{ children }</>;
}
