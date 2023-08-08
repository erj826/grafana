// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState, ChangeEvent } from 'react';

import type { GrafanaTheme2 } from '@grafana/data';
import { Input, Icon, useStyles2 } from '@grafana/ui';

import { PanelGroup } from './PanelGroup';
import { PanelItem } from './PanelItem';

const PANEL = 'Panel';
const OTHER = 'Other';

// const groupPanels = (panelPackage) =>
//   panelPackage.reduce((acc, panel) => {
//     const group = panel.metadata.group || OTHER;
//     if (panel.kind === PANEL && panel.metadata.name) {
//       if (group in acc) {
//         acc[group].push(panel);
//       } else {
//         acc[group] = [panel];
//       }
//     }
//     return acc;
//   }, {});

export const PackagePanels = ({ panelPackage, onAddPanel, onRemovePanel }) => {
  const styles = useStyles2(getStyles);
  const [search, setSearch] = useState<string>('');

  // const groups = groupPanels(panelPackage);
  // const groupEntries = Object.entries(groups)
  //   .map(([group, panels]) => {
  //     const newPanels = panels.reduce((acc, panel) => {
  //       const name = prettifyTitle(panel.metadata.name).toLowerCase();
  //       if (name.includes(search.toLowerCase())) {
  //         acc.push(panel);
  //       }
  //       return acc;
  //     }, []);
  //     return newPanels.length ? [group, newPanels] : null;
  //   })
  //   .filter(Boolean)
  //   .sort((a, b) => (a[0] <= b[0] ? -1 : 1));

  const panels = panelPackage.spec.panels;

  const filteredPanels = panels.filter((panel) => panel.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Input
        prefix={<Icon name="search" />}
        placeholder="Search panels..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <div className={styles.groupSection}>
        {/* {groupEntries.map((panelGroup, index) => (
          <PanelGroup panelGroup={panelGroup} key={index} onAddPanel={onAddPanel} onRemovePanel={onRemovePanel} />
        ))} */}
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
