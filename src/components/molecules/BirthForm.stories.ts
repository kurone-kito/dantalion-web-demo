import type { ComponentMeta, Story } from '@storybook/react/types-7-0';
import { fireEvent, within } from '@storybook/testing-library';
import type { ComponentProps } from 'react';
import { BirthForm } from './BirthForm';

/** the type definition of the component */
type Component = typeof BirthForm;

/** Type definition of the required attributes. */
type Props = ComponentProps<Component>;

/** the metadata of this story */
const meta: ComponentMeta<Component> = {
  argTypes: { onChangeBirthday: {}, onChangeNickname: {}, onSubmit: {} },
  component: BirthForm,
};
export default meta;

/** the default story of the component */
export const Default: Story<Props> = {
  args: {
    birthday: '2000-01-01',
    birthdayLabel: 'BirthdayLabel',
    buttonLabel: 'ButtonLabel',
    legendLabel: 'LegendLabel',
    nickname: 'Nickname',
    nicknameLabel: 'NicknameLabel',
    notes: ['Foo', 'Bar', 'Qux'],
    onSubmit: (event: React.FormEvent<HTMLFormElement>) =>
      event.preventDefault(),
  },
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await fireEvent.click(canvas.getByLabelText('BirthdayLabel'));
};
