// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState, useEffect } from 'react';

import type { SelectableValue } from '@grafana/data';
import { Drawer, AsyncSelect, Field, Button, useStyles2 } from '@grafana/ui';
import { getBackendSrv } from 'app/core/services/backend_srv';

import { DashboardModel } from '../../state';
import { onAddPackagePanel, onRemovePackagePanel } from '../../utils/dashboard';

import { NoPackageSelected } from './NoPackageSelected';
import { PackagePanels } from './PackagePanels';

const useInstalledPackages = () => {
  const [pkgs, setPkgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const backendSrv = getBackendSrv();

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        setPkgs(await backendSrv.get(`api/plugins/grafana-observabilitypackages-app/resources/packages/installed`));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendSrv]);

  return { pkgs, isLoading, isError };
};

const loadOptions = async () => {
  const backendSrv = getBackendSrv();
  const pkgs = await backendSrv.get(`api/plugins/grafana-observabilitypackages-app/resources/packages/installed`);

  return pkgs.map((pkg) => ({ label: pkg.metadata.name, value: pkg.metadata.id }));
};

export const fetchPackage = (pkgs, id) => {
  return pkgs.filter((pkg) => pkg.metadata.id === id)[0];
};

interface PackageDrawerProps {
  onClose: () => void;
  dashboard: DashboardModel;
}

export const PackageDrawer = ({ onClose, dashboard }: PackageDrawerProps) => {
  const styles = useStyles2(getStyles);
  const [selectedPackage, setSelectedPackage] = useState<SelectableValue>();
  const { pkgs } = useInstalledPackages();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    if (!selectedPackage) {
      return;
    }

    const pkg = fetchPackage(pkgs, selectedPackage.value);
    setPackageData(pkg);
  }, [selectedPackage, pkgs]);

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
