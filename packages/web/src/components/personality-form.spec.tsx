// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '../lib/locale-context';
import {
  defaultBirthdayValue,
  getPersonalityFormCopy,
} from '../lib/personality-form';
import { PersonalityForm } from './personality-form';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('PersonalityForm', () => {
  it('renders the async result and resets back to the default state', async () => {
    const loadPersonality = vi.fn(
      async () => '<h2>Major categories of personality</h2>',
    );

    render(() => (
      <LocaleProvider language="en">
        <PersonalityForm loadPersonality={loadPersonality} />
      </LocaleProvider>
    ));

    const input = screen.getByLabelText('Birthday') as HTMLInputElement;
    const submit = screen.getByRole('button', {
      name: getPersonalityFormCopy('en').submitLabel,
    });
    const reset = screen.getByRole('button', {
      name: getPersonalityFormCopy('en').resetLabel,
    });

    expect(input.value).toBe(defaultBirthdayValue);

    await fireEvent.click(submit);

    expect(loadPersonality).toHaveBeenCalledOnce();
    expect(
      screen.getByText(getPersonalityFormCopy('en').loadingLabel),
    ).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Major categories of personality')).toBeTruthy();
    });

    await fireEvent.click(reset);

    expect(input.value).toBe(defaultBirthdayValue);
    expect(screen.queryByText('Major categories of personality')).toBeNull();
  });

  it('blocks invalid dates before the loader is called', async () => {
    const loadPersonality = vi.fn(async () => '<h2>Should not render</h2>');

    render(() => (
      <LocaleProvider language="en">
        <PersonalityForm loadPersonality={loadPersonality} />
      </LocaleProvider>
    ));

    const input = screen.getByLabelText('Birthday') as HTMLInputElement;
    const submit = screen.getByRole('button', {
      name: getPersonalityFormCopy('en').submitLabel,
    }) as HTMLButtonElement;

    await fireEvent.input(input, { target: { value: '1700-01-01' } });

    expect(submit.disabled).toBe(true);
    expect(submit.getAttribute('aria-disabled')).toBe('true');
    expect(screen.getByRole('alert').textContent).toContain(
      getPersonalityFormCopy('en').invalidRangeMessage,
    );

    await fireEvent.click(submit);

    expect(loadPersonality).not.toHaveBeenCalled();
  });

  it('renders localized form labels from the active locale context', () => {
    render(() => (
      <LocaleProvider language="ja">
        <PersonalityForm
          loadPersonality={vi.fn(async () => '<h2>unused</h2>')}
        />
      </LocaleProvider>
    ));

    expect(screen.getByLabelText('誕生日')).toBeTruthy();
    expect(screen.getByText('性格を見る')).toBeTruthy();
    expect(
      screen.getByText('対応範囲: 1873-02-01 から 2050-12-31'),
    ).toBeTruthy();
  });
});
