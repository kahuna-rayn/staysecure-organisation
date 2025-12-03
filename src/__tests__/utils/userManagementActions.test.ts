/**
 * Tests for userManagementActions utility functions
 */

import { vi } from 'vitest';
import { handleSaveUser, handleCreateUser, handleDeleteUser } from '@/utils/userManagementActions';
import type { UserProfile } from '@/hooks/useUserProfiles';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
    },
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(),
      })),
    })),
    functions: {
      invoke: jest.fn(),
    },
  },
  getCurrentClientId: jest.fn(() => 'test-client'),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('@/config/clients', () => ({
  CLIENT_CONFIGS: {
    default: { supabaseAnonKey: 'default-key' },
    'test-client': { supabaseAnonKey: 'test-key' },
  },
}));

// Mock global fetch
global.fetch = vi.fn();

// Mock import.meta.env for Vitest (Vitest supports this natively!)
import.meta.env.VITE_SUPABASE_URL = 'https://test.supabase.co';
import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-anon-key';
import.meta.env.VITE_SUPABASE_PUB_KEY = 'test-pub-key';
import.meta.env.VITE_SB_PUB_KEY = 'test-sb-pub-key';

describe('handleSaveUser', () => {
  const mockUpdateProfile = vi.fn();
  const mockOnSuccess = vi.fn();
  let toast: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const toastModule = await import('@/components/ui/use-toast');
    toast = toastModule.toast;
  });

  it('should successfully update user profile', async () => {
    const editingUser: Partial<UserProfile> = {
      id: 'user-1',
      full_name: 'John Doe',
      email: 'john@example.com',
    };

    mockUpdateProfile.mockResolvedValue(undefined);

    await handleSaveUser(editingUser, mockUpdateProfile, mockOnSuccess);

    expect(mockUpdateProfile).toHaveBeenCalledWith('user-1', editingUser);
    expect(toast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'User updated successfully',
    });
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should handle errors when updating user profile', async () => {
    const editingUser: Partial<UserProfile> = {
      id: 'user-1',
      full_name: 'John Doe',
    };

    const error = new Error('Update failed');
    mockUpdateProfile.mockRejectedValue(error);

    await handleSaveUser(editingUser, mockUpdateProfile, mockOnSuccess);

    expect(mockUpdateProfile).toHaveBeenCalledWith('user-1', editingUser);
    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Update failed',
      variant: 'destructive',
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should handle errors without message', async () => {
    const editingUser: Partial<UserProfile> = {
      id: 'user-1',
    };

    const error = { message: undefined };
    mockUpdateProfile.mockRejectedValue(error);

    await handleSaveUser(editingUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: undefined,
      variant: 'destructive',
    });
  });
});

describe('handleCreateUser', () => {
  const mockUpdateProfile = vi.fn();
  const mockOnSuccess = vi.fn();
  const { toast } = await import('@/components/ui/use-toast');
  const { supabase, getCurrentClientId } = await import('@/integrations/supabase/client');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(global.fetch).mockClear();
  });

  it('should successfully create a new user', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
      first_name: 'New',
      last_name: 'User',
      phone: '1234567890',
      location: 'Test Location',
      location_id: 'loc-1',
      access_level: 'User',
      bio: 'Test bio',
      employee_id: 'EMP001',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    const mockEdgeFunctionResponse = {
      user: {
        id: 'new-user-id',
        email: newUser.email,
      },
    };

    supabase.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(JSON.stringify(mockEdgeFunctionResponse)),
    });

    mockUpdateProfile.mockResolvedValue(undefined);

    supabase.from.mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: [{ id: 'access-1' }],
          error: null,
        }),
      }),
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(getCurrentClientId).toHaveBeenCalled();
    expect(supabase.auth.getSession).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalled();
    expect(mockUpdateProfile).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'User created successfully',
    });
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should handle missing session', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    supabase.auth.getSession.mockResolvedValue({
      data: null,
      error: null,
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Unable to determine current session. Please refresh and try again.',
      variant: 'destructive',
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should handle session error', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    supabase.auth.getSession.mockResolvedValue({
      data: null,
      error: new Error('Session error'),
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Unable to determine current session. Please refresh and try again.',
      variant: 'destructive',
    });
  });

  it('should handle missing Supabase URL', async () => {
    const originalUrl = process.env.VITE_SUPABASE_URL;
    delete process.env.VITE_SUPABASE_URL;

    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    supabase.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Supabase base URL is not configured.',
      variant: 'destructive',
    });

    process.env.VITE_SUPABASE_URL = originalUrl;
  });

  it('should handle edge function error response', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    const mockErrorResponse = {
      error: 'User already exists',
    };

    supabase.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue(JSON.stringify(mockErrorResponse)),
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'User already exists',
      variant: 'destructive',
    });
  });

  it('should handle fetch failure', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    supabase.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: jest.fn().mockResolvedValue('Server Error'),
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Error',
        variant: 'destructive',
      })
    );
  });

  it('should handle missing user data in response', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    supabase.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue(JSON.stringify({})),
    });

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'No user data returned from create-user function',
      variant: 'destructive',
    });
  });

  it('should create user without location_id', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    const mockEdgeFunctionResponse = {
      user: {
        id: 'new-user-id',
        email: newUser.email,
      },
    };

    supabase.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(JSON.stringify(mockEdgeFunctionResponse)),
    });

    mockUpdateProfile.mockResolvedValue(undefined);

    await handleCreateUser(newUser, mockUpdateProfile, mockOnSuccess);

    expect(mockUpdateProfile).toHaveBeenCalled();
    expect(supabase.from).not.toHaveBeenCalled(); // Should not call location access
  });
});

describe('handleDeleteUser', () => {
  let toast: any;
  let supabase: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const toastModule = await import('@/components/ui/use-toast');
    const supabaseModule = await import('@/integrations/supabase/client');
    toast = toastModule.toast;
    supabase = supabaseModule.supabase;
  });

  it('should successfully delete a user', async () => {
    const userId = 'user-1';
    const userName = 'John Doe';
    const deletedUser = { id: userId, full_name: userName };

    supabase.functions.invoke.mockResolvedValue({
      data: {
        success: true,
        deletedUser,
      },
      error: null,
    });

    const result = await handleDeleteUser(userId, userName);

    expect(supabase.functions.invoke).toHaveBeenCalledWith('delete-user', {
      body: {
        userId,
        reason: undefined,
      },
    });
    expect(result.success).toBe(true);
    expect(result.deletedUser).toEqual(deletedUser);
  });

  it('should delete user with reason', async () => {
    const userId = 'user-1';
    const userName = 'John Doe';
    const reason = 'No longer needed';

    supabase.functions.invoke.mockResolvedValue({
      data: {
        success: true,
        deletedUser: { id: userId },
      },
      error: null,
    });

    const result = await handleDeleteUser(userId, userName, reason);

    expect(supabase.functions.invoke).toHaveBeenCalledWith('delete-user', {
      body: {
        userId,
        reason,
      },
    });
    expect(result.success).toBe(true);
  });

  it('should handle function invocation error', async () => {
    const userId = 'user-1';
    const userName = 'John Doe';

    supabase.functions.invoke.mockResolvedValue({
      data: null,
      error: new Error('Function error'),
    });

    const result = await handleDeleteUser(userId, userName);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to delete user');
    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Failed to delete user',
      variant: 'destructive',
    });
  });

  it('should handle function returning success: false', async () => {
    const userId = 'user-1';
    const userName = 'John Doe';

    supabase.functions.invoke.mockResolvedValue({
      data: {
        success: false,
        error: 'User not found',
      },
      error: null,
    });

    const result = await handleDeleteUser(userId, userName);

    expect(result.success).toBe(false);
    expect(result.error).toBe('User not found');
    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'User not found',
      variant: 'destructive',
    });
  });

  it('should handle exception during delete', async () => {
    const userId = 'user-1';
    const userName = 'John Doe';

    supabase.functions.invoke.mockRejectedValue(new Error('Network error'));

    const result = await handleDeleteUser(userId, userName);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to delete user');
    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Failed to delete user',
      variant: 'destructive',
    });
  });
});

