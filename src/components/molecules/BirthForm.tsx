import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  VFC,
} from 'react';
import tw from 'twin.macro';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { List } from '../atoms/List';

/** Type definition of the required attributes. */
export interface BirthFormProps {
  /** The default birthday value string */
  readonly birthday?: string;
  /** The label for birthday input control */
  readonly birthdayLabel?: string;
  /** The label for button control */
  readonly buttonLabel?: ReactNode;
  /** The form title */
  readonly legendLabel?: ReactNode;
  /** The default nickname value string */
  readonly nickname?: string;
  /** The label for nickname input control */
  readonly nicknameLabel?: string;
  /** Specifies the additional notations */
  readonly notes?: Iterable<ReactNode>;
  /** Callback to call when the user changes the birthday */
  readonly onChangeBirthday?: ChangeEventHandler<HTMLInputElement>;
  /** Callback to call when the user changes the nickname */
  readonly onChangeNickname?: ChangeEventHandler<HTMLInputElement>;
  /** Callback to call when the user taps to submit button */
  readonly onSubmit?: FormEventHandler<HTMLFormElement>;
}

/** The styles for the component. */
const styles = tw`
  nm-flat-gray-300-xs p-6 dark:nm-flat-gray-600-xs md:rounded-3xl
  [& > fieldset]:(
    [& > legend]:(font-light text-gray-700 text-xl dark:text-gray-200)
    [& > ol, & > ul]:(text-red-900 text-sm dark:text-red-200)
  )
  svg:(animate-pulse mx-2)
`;

/**
 * The birthday form component.
 *
 * @param props required attributes.
 * @param props.birthday The default birthday value string
 * @param props.birthdayLabel The label for birthday input control
 * @param props.buttonLabel The label for button control
 * @param props.legendLabel The form title
 * @param props.nickname The default nickname value string
 * @param props.nicknameLabel The label for nickname input control
 * @param props.onChangeBirthday Callback to call when the user changes the birthday
 * @param props.onChangeNickname Callback to call when the user changes the nickname
 * @param props.onSubmit Callback to call when the user taps to submit button
 * @param props.notes Specifies the additional notations
 * @returns the component.
 */
export const BirthForm: VFC<BirthFormProps> = ({
  birthday,
  birthdayLabel,
  buttonLabel,
  legendLabel,
  nickname,
  nicknameLabel,
  onChangeBirthday,
  onChangeNickname,
  onSubmit,
  notes,
}) => (
  <form css={styles} onSubmit={onSubmit}>
    <fieldset>
      <legend>{legendLabel}</legend>
      <Input
        autoComplete="bday"
        defaultValue={birthday}
        enterKeyHint="go"
        id="birthday"
        label={birthdayLabel}
        max="2050-12-31"
        min="1873-02-01"
        name="birthday"
        onChange={onChangeBirthday}
        required
        type="date"
      />
      <Input
        autoComplete="nickname"
        defaultValue={nickname}
        enterKeyHint="go"
        id="nickname"
        label={nicknameLabel}
        maxLength={240}
        name="nickname"
        onChange={onChangeNickname}
        placeholder={nicknameLabel}
        type="text"
      />
      <List>{notes}</List>
      <Button>
        <FontAwesomeIcon icon={faSearch} />
        {buttonLabel}
      </Button>
    </fieldset>
  </form>
);
BirthForm.displayName = 'BirthForm';
