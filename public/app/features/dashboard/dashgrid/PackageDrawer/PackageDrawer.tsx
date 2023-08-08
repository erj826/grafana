// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState, useEffect } from 'react';

import type { SelectableValue } from '@grafana/data';
import { Drawer, AsyncSelect, Field, Button, useStyles2 } from '@grafana/ui';

import { DashboardModel } from '../../state';
import { onAddPackagePanel, onRemovePackagePanel } from '../../utils/dashboard';

import { NoPackageSelected } from './NoPackageSelected';
import { PackagePanels } from './PackagePanels';
import availablePackages from './__mocks__/packages_available_registry.json';
import installedPackages from './__mocks__/packages_installed_data.json';

const loadOptions = async () => {
  const pkgs = availablePackages;
  return pkgs.map((pkg) => ({ label: pkg.metadata.name, value: pkg.metadata.id }));
};

interface PackageDrawerProps {
  onClose: () => void;
  dashboard: DashboardModel;
}

export const PackageDrawer = ({ onClose, dashboard }: PackageDrawerProps) => {
  const styles = useStyles2(getStyles);
  const [selectedPackage, setSelectedPackage] = useState<SelectableValue>();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    if (selectedPackage) {
      const id = selectedPackage.value;
      const pkg = installedPackages.filter((pkg) => pkg.metadata.id === selectedPackage.value)[0];
      setPackageData(pkg);
    }
  }, [selectedPackage]);

  const onAddPanel = (panel) => {
    onAddPackagePanel(dashboard, panel);
  };

  const onRemovePanel = (panel) => {
    onRemovePackagePanel(dashboard, panel);
  };

  return (
    <Drawer title="Packaged panels" size="sm" onClose={onClose} scrollableContent mask={false} motion={false}>
      <div className={styles.container}>
        <Field label="Package">
          <AsyncSelect
            placeholder="Select a package..."
            loadOptions={loadOptions}
            value={selectedPackage}
            onChange={setSelectedPackage}
            defaultOptions
          />
        </Field>
        {packageData ? (
          <PackagePanels panelPackage={packageData} onAddPanel={onAddPanel} onRemovePanel={onRemovePanel} />
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

function getStyles() {
  return {
    container: css({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'inherit',
    }),
    finishedAdding: css({
      padding: '20px',
      display: 'flex',
      justifyContent: 'right',
      marginTop: 'auto',
    }),
  };
}
