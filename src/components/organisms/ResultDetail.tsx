import type { DetailsBaseType, DetailsType } from '@kurone-kito/dantalion-i18n';
import type { VFC } from 'react';
import { useTranslation } from 'react-i18next';
import { AccompanyingItem } from './AccompanyingItem';

/** Type definition of the required attributes. */
export interface ResultDetailProps {
  /** The resources of the content. */
  readonly content?: DetailsType;
  /** The resources of the heading. */
  readonly heading?: DetailsBaseType;
  /** Specifies the nickname. */
  readonly nickname?: string;
}

/**
 * The result details component.
 *
 * @param props required attributes.
 * @param props.content the resources of the content.
 * @param props.heading the resources of the heading.
 * @param props.nickname specifies the nickname.
 * @returns the component.
 */
export const ResultDetail: VFC<ResultDetailProps> = ({
  content,
  heading,
  nickname,
}) => {
  const { t } = useTranslation();
  return (
    <AccompanyingItem
      detail={content?.detail}
      heading={heading?.detail}
      moreDetails={content?.more}
      probed={t('web.result.probed', { nickname, type: content?.name })}
      title={heading?.name}
    />
  );
};
ResultDetail.displayName = 'ResultDetail';
