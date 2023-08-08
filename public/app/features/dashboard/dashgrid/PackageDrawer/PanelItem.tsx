// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState } from 'react';

import type { GrafanaTheme2 } from '@grafana/data';
import { IconButton, Text, useStyles2 } from '@grafana/ui';

export const PanelItem = ({ panel, onAddPanel, onRemovePanel }) => {
  const styles = useStyles2(getStyles);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddPanel = async () => {
    onAddPanel(panel.spec);
    setIsAdded(true);
  };

  const handleRemovePanel = async () => {
    onRemovePanel(panel.spec);
    setIsAdded(false);
  };

  return (
    <div className={styles.panelSection}>
      {isAdded ? (
        <IconButton
          name="times-circle"
          size="xl"
          variant="destructive"
          className={styles.button}
          onClick={handleRemovePanel}
        />
      ) : (
        <IconButton name="plus-circle" size="xl" variant="primary" className={styles.button} onClick={handleAddPanel} />
      )}
      <div className={styles.panelTextSection}>
        <Text element="h6" color="maxContrast" weight="light">
          {panel.title}
        </Text>
        <Text element="p" color="secondary" italic truncate>
          {panel.description || 'No description'}
        </Text>
      </div>
    </div>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {
    button: css({
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
      overflow: 'hidden',
    }),
  };
}
