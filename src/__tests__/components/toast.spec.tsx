import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import Toast from '../../components/ToastContainer/Toast';
import { ToastProvider, useToast } from '../../hooks/toast';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Toast component', () => {
  it('should be able to open a toast confirm', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.addToast({
      type: 'success',
      title: 'Email de recuperação de senha enviado',
      description:
        'Enviamos um email de recuperação, favor verificar sua caixa de entrada',
    });

    expect(result.current.addToast).toBeCalled();
  });
});
