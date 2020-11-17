import { act, renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { StorageEnum } from '../../utils/storage-enum';

const apiMock = new MockAdapter(api);

const apiResponse = {
  user: {
    id: 'user-123',
    name: 'teste unitário',
    email: 'teste@gmail.com',
    avatar_url: 'image-test.jpg',
  },
  token: 'token-gerado',
};

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
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

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case StorageEnum.token:
          return apiResponse.token;
        case StorageEnum.user:
          return JSON.stringify(apiResponse.user);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual(apiResponse.user.email);
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case StorageEnum.token:
          return apiResponse.token;
        case StorageEnum.user:
          return JSON.stringify(apiResponse.user);
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.updateUser(apiResponse.user));

    expect(setItemSpy).toHaveBeenCalledWith(
      StorageEnum.user,
      JSON.stringify(apiResponse.user),
    );
  });
});
