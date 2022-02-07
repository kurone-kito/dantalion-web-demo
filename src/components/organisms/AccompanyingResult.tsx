import type { Detail } from '@kurone-kito/dantalion-core';
import type { Accessors } from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import * as React from 'react';
import { ResultDetail } from './ResultDetail';

/** Using keys for accessors. */
type Keys = 'brain' | 'communication' | 'management' | 'position' | 'response';

/** Type definition of the required attributes. */
export interface AccompanyingResultProps {
  /** Specifies the accessors object. */
  readonly accessors?: Pick<Accessors, Keys>;
  /** Specifies the details for personality. */
  readonly details: Pick<Detail, Keys>;
  /** Specifies the nickname. */
  readonly nickname?: string;
}

/**
 * The accompany results component.
 *
 * @param props required attributes.
 * @param props.accessors Specifies the accessors object.
 * @param props.nickname Specifies the nickname.
 * @param props.details Specifies the details for personality.
 * @returns the component.
 */
export const AccompanyingResult: VFC<AccompanyingResultProps> = ({
  accessors,
  nickname,
  details,
}) => (
  <>
    <ResultDetail
      content={accessors?.brain.getByKey(details.brain)}
      heading={accessors?.brain.getCategoryDetail()}
      nickname={nickname}
    />
    <ResultDetail
      content={accessors?.communication.getByKey(details.communication)}
      heading={accessors?.communication.getCategoryDetail()}
      nickname={nickname}
    />
    <ResultDetail
      content={accessors?.management.getByKey(details.management)}
      heading={accessors?.management.getCategoryDetail()}
      nickname={nickname}
    />
    <ResultDetail
      content={accessors?.response.getByKey(details.response)}
      heading={accessors?.response.getCategoryDetail()}
      nickname={nickname}
    />
    <ResultDetail
      content={accessors?.position.getByKey(details.position)}
      heading={accessors?.position.getCategoryDetail()}
      nickname={nickname}
    />
  </>
);
AccompanyingResult.displayName = 'AccompanyingResult';
