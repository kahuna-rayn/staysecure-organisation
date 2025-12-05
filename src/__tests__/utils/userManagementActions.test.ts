/**
 * Tests for userManagementActions utility functions
 */

import { vi } from 'vitest';
import { handleSaveUser, handleCreateUser, handleDeleteUser } from '@/utils/userManagementActions';
import type { UserProfile } from '@/hooks/useUserProfiles';

// Mock dependencies
const mockSupabaseClient = {
  supabaseUrl: 'https://test.supabase.co',
  auth: {
    getSession: vi.fn(),
  },
  from: vi.fn(() => ({
    insert: vi.fn(() => ({
      select: vi.fn(),
    })),
  })),
  functions: {
    invoke: vi.fn(),
  },
};

vi.mock('@/integrations/supabase/client', () => ({
  getCurrentClientId: vi.fn(() => 'test-client'),
}));

vi.mock('@/components/ui/use-toast', () => ({
  toast: vi.fn(),
}));

// No need to mock global.fetch - we use functions.invoke now

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
  let toast: any;
  let getCurrentClientId: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const toastModule = await import('@/components/ui/use-toast');
    toast = toastModule.toast;
    const clientModule = await import('@/integrations/supabase/client');
    getCurrentClientId = clientModule.getCurrentClientId;
    vi.clearAllMocks();
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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: mockEdgeFunctionResponse,
      error: null,
    });

    mockUpdateProfile.mockResolvedValue(undefined);

    mockSupabaseClient.from.mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: [{ id: 'access-1' }],
          error: null,
        }),
      }),
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

    expect(getCurrentClientId).toHaveBeenCalled();
    expect(mockSupabaseClient.auth.getSession).toHaveBeenCalled();
    expect(mockSupabaseClient.functions.invoke).toHaveBeenCalledWith('create-user', {
      body: expect.objectContaining({
        email: newUser.email,
        full_name: newUser.full_name,
      })
    });
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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: null,
      error: null,
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: null,
      error: new Error('Session error'),
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Unable to determine current session. Please refresh and try again.',
      variant: 'destructive',
    });
  });

  it('should handle edge function invoke error', async () => {
    const newUser = {
      email: 'newuser@example.com',
      full_name: 'New User',
    };

    const mockSession = {
      session: {
        access_token: 'test-token',
      },
    };

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: null,
      error: new Error('Network error'),
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: expect.stringContaining('Failed to create user'),
      variant: 'destructive',
    });
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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: mockErrorResponse,
      error: null,
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: null,
      error: new Error('Internal Server Error'),
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: {},
      error: null,
    });

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

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

    mockSupabaseClient.auth.getSession.mockResolvedValue({
      data: mockSession,
      error: null,
    });

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: mockEdgeFunctionResponse,
      error: null,
    });

    mockUpdateProfile.mockResolvedValue(undefined);

    await handleCreateUser(mockSupabaseClient as any, newUser, mockUpdateProfile, mockOnSuccess);

    expect(mockUpdateProfile).toHaveBeenCalled();
    expect(mockSupabaseClient.from).not.toHaveBeenCalled(); // Should not call location access
  });
});

describe('handleDeleteUser', () => {
  let toast: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const toastModule = await import('@/components/ui/use-toast');
    toast = toastModule.toast;
  });

  it('should successfully delete a user', async () => {
    const userId = 'user-1';
    const userName = 'John Doe';
    const deletedUser = { id: userId, full_name: userName };

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: {
        success: true,
        deletedUser,
      },
      error: null,
    });

    const result = await handleDeleteUser(mockSupabaseClient as any, userId, userName);

    expect(mockSupabaseClient.functions.invoke).toHaveBeenCalledWith('delete-user', {
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

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: {
        success: true,
        deletedUser: { id: userId },
      },
      error: null,
    });

    const result = await handleDeleteUser(mockSupabaseClient as any, userId, userName, reason);

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

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: null,
      error: new Error('Function error'),
    });

    const result = await handleDeleteUser(mockSupabaseClient as any, userId, userName);

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

    mockSupabaseClient.functions.invoke.mockResolvedValue({
      data: {
        success: false,
        error: 'User not found',
      },
      error: null,
    });

    const result = await handleDeleteUser(mockSupabaseClient as any, userId, userName);

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

    const result = await handleDeleteUser(mockSupabaseClient as any, userId, userName);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to delete user');
    expect(toast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Failed to delete user',
      variant: 'destructive',
    });
  });
});

