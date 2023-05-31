import React, { useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import useHttp from '../../hooks/useHttp';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';

import {AuthWrapper, AuthForm, AuthInput, AuthInputWrapper, ErrorMessage, AuthError } from './AuthStyles';

import { Button } from '../UI/button/ButtonStyles';
import LoadingSpinner from '../UI/loading-spinner/LoadingSpinner';

const Auth: React.FC = () => {
    const {
        register, 
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm(); 

    const { isLoading, error, sendRequest, clearError } = useHttp();
    const router = useRouter();

    const password = useRef({});
    password.current = watch('password', '');

    const dispatch = useDispatch();
    const isLoggingMode = useSelector(
        (state: RootState) => state.auth.isLoggingMode 
    );

    const submitHandler = handleSubmit(async (data) => {
        if (isLoggingMode) {
            try {
                const response = await sendRequest({
                    url: '/api/login',
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password, 
                    }),
                });
                const tokenExpirationDate = new Date(
                    new Date().getTime() + 1000 * 60 * 60 
                ).toString();

                dispatch(
                    authActions.login({
                        userId: response.userId,
                        token: response.token,
                        bookmarks: response.bookmarks,
                        tokenExpirationDate, 
                    })
                );
                router.push('/'); 
            } catch (error) {}
        }
    });

    return (
        <AuthWrapper data-testid='auth'>
            <Link href={'/'} passHref>
                <img src={'/assets/logo.svg'} alt="logo" className="logo" />
            </Link>
            
        </AuthWrapper>
    )
}