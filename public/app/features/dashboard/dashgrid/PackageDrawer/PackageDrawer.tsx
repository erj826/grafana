// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState } from 'react';

import type { SelectableValue, GrafanaTheme2 } from '@grafana/data';
import { Drawer, Select, Field, Button, useStyles2 } from '@grafana/ui';

import { DashboardModel } from '../../state';
import { onAddPackagePanel, onRemovePackagePanel } from '../../utils/dashboard';

import mysqlPackage from './MOCKMYSQL.json';
import { NoPackageSelected } from './NoPackageSelected';
import { PackagePanels } from './PackagePanels';

const MOCK_OPTIONS = [
  { label: 'MySQL', value: mysqlPackage },
  { label: 'Postgres', value: null },
  { label: 'MongoDB', value: null },
];

interface PackageDrawerProps {
  onClose: () => void;
  dashboard: DashboardModel;
}

export const PackageDrawer = ({ onClose, dashboard }: PackageDrawerProps) => {
  const styles = useStyles2(getStyles);
  const [selectedPackage, setSelectedPackage] = useState<SelectableValue>({ label: 'MySQL', value: mysqlPackage });

  const onAddPanel = (panel) => {
    onAddPackagePanel(dashboard, panel);
  };

  const onRemovePanel = (panelId) => {
    onRemovePackagePanel(dashboard, panelId);
  };

  return (
    <Drawer title="Packaged panels" size="sm" onClose={onClose} scrollableContent mask={false} motion={false}>
      <div className={styles.container}>
        <Field label="Package">
          <Select
            placeholder="Select a package..."
            options={MOCK_OPTIONS}
            value={selectedPackage}
            onChange={setSelectedPackage}
          />
        </Field>
        {selectedPackage ? (
          <PackagePanels panelPackage={selectedPackage.value} onAddPanel={onAddPanel} onRemovePanel={onRemovePanel} />
        ) : (
          <NoPackageSelected />
        )}
        <div className={styles.finishedAdding}>
          <Button onClick={onClose}>Finished Adding</Button>
        </div>
      </div>
    </Drawer>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {
    container: css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'inherit',
    }),
    finishedAdding: css({
      padding: '20px 0px',
      display: 'flex',
      justifyContent: 'right',
      marginTop: 'auto',
    }),
  };
}
