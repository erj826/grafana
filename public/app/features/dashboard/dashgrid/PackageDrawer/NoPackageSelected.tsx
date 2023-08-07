import { css } from '@emotion/css';
import React from 'react';

import type { GrafanaTheme2 } from '@grafana/data';
import { Text, useStyles2 } from '@grafana/ui';

export const NoPackageSelected = () => {
  const styles = useStyles2(getStyles);
  return (
    <>
      <div className={styles.text}>
        <Text element="p" color="secondary">
          Packages cover common monitoring topics, like Kubernetes or MySQL. Select a package to see ready-to-use
          visualization panels.
        </Text>
      </div>
      <div className={styles.text}>
        <Text element="p" color="secondary">
          Not seeing what you&apos;re looking for?{' '}
          <a className={styles.link} href="https://www.grafana.com" target="_blank" rel="noreferrer">
            Browse community packages
          </a>
        </Text>
      </div>
      <div className={styles.text}>
        <Text element="p" color="secondary">
          Ready to take it to the next level?{' '}
          <a className={styles.link} href="https://www.grafana.com" target="_blank" rel="noreferrer">
            Create your own packages
          </a>
        </Text>
      </div>
    </>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {
    link: css({
      color: theme.colors.primary.text,
    }),
    text: css({
      margin: '18px 0px',
    }),
    finishedAdding: css({
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: '20px',
    }),
  };
}
