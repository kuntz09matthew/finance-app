import { render, screen } from '@testing-library/react';
import AppShell from '../components/layout/AppShell';

describe('AppShell', () => {
  it('renders header, sidebar, and footer', () => {
    render(<AppShell>Test Content</AppShell>);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('navigation', { name: /sidebar navigation/i })).toBeInTheDocument(); // Sidebar
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
