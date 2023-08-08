// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState } from 'react';

import type { GrafanaTheme2 } from '@grafana/data';
import { IconButton, Text, useStyles2, CollapsableSection } from '@grafana/ui';

import { PanelItem } from './PanelItem';

export const PanelGroup = ({ panelGroup, onAddPanel, onRemovePanel }) => {
  const styles = useStyles2(getStyles);
  const [isOpen, setIsOpen] = useState(true);

  const [group, panels] = panelGroup;
  return (
    <CollapsableSection label={group} isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)}>
      {panels.map((panel, index) => (
        <PanelItem panel={panel} key={index} onAddPanel={onAddPanel} onRemovePanel={onRemovePanel} />
      ))}
    </CollapsableSection>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {};
}
