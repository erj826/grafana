// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState } from 'react';

import type { GrafanaTheme2 } from '@grafana/data';
import { IconButton, Text, useStyles2, CollapsableSection } from '@grafana/ui';

export const prettifyTitle = (name: string) =>
  name
    .split('-')
    .filter(Boolean)
    .map((g) => g[0].toUpperCase() + g.slice(1))
    .join(' ');

export const PanelGroup = ({ panelGroup }) => {
  const styles = useStyles2(getStyles);
  const [isOpen, setIsOpen] = useState(false);

  const [group, panels] = panelGroup;
  return (
    <CollapsableSection label={group} isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)}>
      {panels.map((panel, index) => (
        <div key={index} className={styles.panelSection}>
          <IconButton name="plus-circle" size="xl" variant="primary" className={styles.addPanel} />
          <div className={styles.panelTextSection}>
            <Text element="h6" color="maxContrast" weight="light">
              {prettifyTitle(panel.metadata.name)}
            </Text>
            <Text element="p" color="secondary" italic>
              {panel.metadata.description || 'No description'}
            </Text>
          </div>
        </div>
      ))}
    </CollapsableSection>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {
    addPanel: css({
      margin: '0px 12px',
    }),
    panelSection: css({
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '8px',
    }),
    panelTextSection: css({
      display: 'flex',
      flexDirection: 'column',
    }),
  };
}
