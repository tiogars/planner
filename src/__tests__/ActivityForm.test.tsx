import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActivityForm from '../components/ActivityForm';

const onSubmit = vi.fn();
const onCancel = vi.fn();

describe('ActivityForm', () => {
  it('renders all fields', () => {
    render(<ActivityForm onSubmit={onSubmit} onCancel={onCancel} />);
    expect(screen.getByRole('textbox', { name: /activity title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/start time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end time/i)).toBeInTheDocument();
  });

  it('shows validation error when title is empty', async () => {
    render(<ActivityForm onSubmit={onSubmit} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole('button', { name: /save activity/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onCancel when cancel is clicked', async () => {
    render(<ActivityForm onSubmit={onSubmit} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
