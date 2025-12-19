import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Global mocks for UI components that are provided by consuming apps
// These are external dependencies that don't exist in the module
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'card', ...props }, children),
  CardContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'card-content', ...props }, children),
  CardDescription: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'card-description', ...props }, children),
  CardHeader: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'card-header', ...props }, children),
  CardTitle: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('h2', { 'data-testid': 'card-title', ...props }, children),
}));

vi.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'tabs', ...props }, children),
  TabsContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'tabs-content', ...props }, children),
  TabsList: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'tabs-list', ...props }, children),
  TabsTrigger: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('button', { 'data-testid': 'tabs-trigger', ...props }, children),
}));

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('span', { 'data-testid': 'badge', ...props }, children),
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('button', { 'data-testid': 'button', ...props }, children),
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: { [key: string]: unknown }) => React.createElement('input', { 'data-testid': 'input', ...props }),
}));

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('label', { 'data-testid': 'label', ...props }, children),
}));

vi.mock('@/components/ui/textarea', () => ({
  Textarea: (props: { [key: string]: unknown }) => React.createElement('textarea', { 'data-testid': 'textarea', ...props }),
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'select', ...props }, children),
  SelectContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'select-content', ...props }, children),
  SelectItem: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'select-item', ...props }, children),
  SelectTrigger: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'select-trigger', ...props }, children),
  SelectValue: (props: { [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'select-value', ...props }),
}));

vi.mock('@/components/ui/table', () => ({
  Table: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('table', { 'data-testid': 'table', ...props }, children),
  TableBody: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('tbody', { 'data-testid': 'table-body', ...props }, children),
  TableCell: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('td', { 'data-testid': 'table-cell', ...props }, children),
  TableHead: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('th', { 'data-testid': 'table-head', ...props }, children),
  TableHeader: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('thead', { 'data-testid': 'table-header', ...props }, children),
  TableRow: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('tr', { 'data-testid': 'table-row', ...props }, children),
}));

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'dialog', ...props }, children),
  DialogContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'dialog-content', ...props }, children),
  DialogDescription: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'dialog-description', ...props }, children),
  DialogFooter: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'dialog-footer', ...props }, children),
  DialogHeader: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'dialog-header', ...props }, children),
  DialogTitle: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('h2', { 'data-testid': 'dialog-title', ...props }, children),
  DialogTrigger: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'dialog-trigger', ...props }, children),
}));

vi.mock('@/components/ui/switch', () => ({
  Switch: (props: { [key: string]: unknown }) => React.createElement('input', { type: 'checkbox', 'data-testid': 'switch', ...props }),
}));

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'avatar', ...props }, children),
  AvatarFallback: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'avatar-fallback', ...props }, children),
  AvatarImage: (props: { [key: string]: unknown }) => React.createElement('img', { 'data-testid': 'avatar-image', ...props }),
}));

vi.mock('@/components/ui/editable-table', () => ({
  EditableTable: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'editable-table', ...props }, children),
}));

vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'scroll-area', ...props }, children),
}));

vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'alert', ...props }, children),
  AlertDescription: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'alert-description', ...props }, children),
}));

vi.mock('@/components/ui/separator', () => ({
  Separator: (props: { [key: string]: unknown }) => React.createElement('hr', { 'data-testid': 'separator', ...props }),
}));

vi.mock('@/components/ui/command', () => ({
  Command: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'command', ...props }, children),
  CommandInput: (props: { [key: string]: unknown }) => React.createElement('input', { 'data-testid': 'command-input', ...props }),
  CommandList: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'command-list', ...props }, children),
  CommandEmpty: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'command-empty', ...props }, children),
  CommandGroup: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'command-group', ...props }, children),
  CommandItem: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'command-item', ...props }, children),
}));

vi.mock('@/components/ui/popover', () => ({
  Popover: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'popover', ...props }, children),
  PopoverContent: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'popover-content', ...props }, children),
  PopoverTrigger: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => React.createElement('div', { 'data-testid': 'popover-trigger', ...props }, children),
}));

