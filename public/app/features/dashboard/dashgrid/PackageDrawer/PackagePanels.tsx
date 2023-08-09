// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState, ChangeEvent } from 'react';

import { Input, Icon, useStyles2 } from '@grafana/ui';

import { PanelItem } from './PanelItem';

export const PackagePanels = ({ panelPackage, onAddPanel, onRemovePanel }) => {
  const styles = useStyles2(getStyles);
  const [search, setSearch] = useState<string>('');

  const panels = panelPackage.spec.panels || [];

  const filteredPanels = panels.filter((panel) => panel.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Input
        prefix={<Icon name="search" />}
        placeholder="Search panels..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <div className={styles.groupSection}>
        {filteredPanels.map((panel, index) => (
          <PanelItem panel={panel} onAddPanel={onAddPanel} onRemovePanel={onRemovePanel} key={index} />
        ))}
      </div>
    </div>
  );
};

function getStyles() {
  return {
    groupSection: css({
      marginTop: '8px',
    }),
  };
}
