// @vitest-environment jsdom
import { Router } from '@solidjs/router';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import type { JSX } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { LocalizedPersonalityPreview } from '../lib/dantalion';
import { LocaleProvider } from '../lib/locale-context';
import {
  defaultBirthdayValue,
  getPersonalityFormCopy,
} from '../lib/personality-form';
import { PersonalityForm } from './personality-form';

afterEach(() => {
  document.body.innerHTML = '';
});

const RouterFixture = (props: { children: JSX.Element }): JSX.Element => (
  <Router
    explicitLinks={true}
    root={(routerProps) => <>{routerProps.children}</>}
  >
    {[{ path: '*', component: () => props.children }]}
  </Router>
);

describe('PersonalityForm', () => {
  it('renders the async result and resets back to the default state', async () => {
    const loadPersonality = vi.fn(
      async (): Promise<LocalizedPersonalityPreview> => ({
        genius: '100',
        html: '<h2>Major categories of personality</h2>',
        innerGenius: '100',
        introHtml: '',
        outerGenius: '108',
        sections: [
          {
            bodyHtml: '<p>Test section body</p>',
            heading: 'Major categories of personality',
            id: 'major-categories-of-personality',
          },
        ],
        workStyleGenius: '125',
      }),
    );

    render(() => (
      <RouterFixture>
        <LocaleProvider language="en">
          <PersonalityForm loadPersonality={loadPersonality} />
        </LocaleProvider>
      </RouterFixture>
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

    expect(
      screen.getByRole('link', {
        name: getPersonalityFormCopy('en').detailLinkLabel,
      }),
    ).toHaveProperty('href');
    expect(
      screen.getByRole('link', {
        name: getPersonalityFormCopy('en').detailLinkLabel,
      }),
    ).toHaveProperty('getAttribute');
    expect(
      screen
        .getByRole('link', {
          name: getPersonalityFormCopy('en').detailLinkLabel,
        })
        .getAttribute('href'),
    ).toBe('/en/100/');

    await fireEvent.click(reset);

    expect(input.value).toBe(defaultBirthdayValue);
    expect(screen.queryByText('Major categories of personality')).toBeNull();
  });

  it('blocks invalid dates before the loader is called', async () => {
    const loadPersonality = vi.fn(
      async (): Promise<LocalizedPersonalityPreview> => ({
        genius: '100',
        html: '<h2>Should not render</h2>',
        innerGenius: '100',
        introHtml: '',
        outerGenius: '108',
        sections: [],
        workStyleGenius: '125',
      }),
    );

    render(() => (
      <RouterFixture>
        <LocaleProvider language="en">
          <PersonalityForm loadPersonality={loadPersonality} />
        </LocaleProvider>
      </RouterFixture>
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
      <RouterFixture>
        <LocaleProvider language="ja">
          <PersonalityForm
            loadPersonality={vi.fn(
              async (): Promise<LocalizedPersonalityPreview> => ({
                genius: '100',
                html: '<h2>unused</h2>',
                innerGenius: '100',
                introHtml: '',
                outerGenius: '108',
                sections: [],
                workStyleGenius: '125',
              }),
            )}
          />
        </LocaleProvider>
      </RouterFixture>
    ));

    expect(screen.getByLabelText('誕生日')).toBeTruthy();
    expect(screen.getByText('性格を見る')).toBeTruthy();
    expect(
      screen.getByText('対応範囲: 1873-02-01 から 2050-12-31'),
    ).toBeTruthy();
  });
});
