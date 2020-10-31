import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { StorageEnum } from '../../utils/storage-enum';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-123',
        name: 'teste unitário',
        email: 'teste@gmail.com',
      },
      token: 'token-gerado',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'teste@gmail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      StorageEnum.token,
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      StorageEnum.user,
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('teste@gmail.com');
  });
});
