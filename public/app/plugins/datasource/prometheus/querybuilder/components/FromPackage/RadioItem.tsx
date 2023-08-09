// @ts-nocheck
import { css } from '@emotion/css';
import React from 'react';

import { useStyles2, Text } from '@grafana/ui';

export const RadioItem = ({ title, description }) => {
  const styles = useStyles2(getStyles);

  return (
    <div className={styles.radio}>
      <Text element="h6" color="maxContrast" weight="light">
        {title}
      </Text>
      <Text element="p" color="secondary" italic truncate>
        {description || 'No description'}
      </Text>
    </div>
  );
};

const getStyles = () => ({
  radio: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  }),
});
