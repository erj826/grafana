import { css } from '@emotion/css';
import React, { useState } from 'react';

import type { SelectableValue, GrafanaTheme2 } from '@grafana/data';
import { Drawer, Select, Field, Button, useStyles2 } from '@grafana/ui';

import mysqlPackage from './MOCKMYSQL.json';
import { NoPackageSelected } from './NoPackageSelected';
import { PackagePanels } from './PackagePanels';

interface PackageDrawerProps {
  onClose: () => void;
}

export const PackageDrawer = ({ onClose }: PackageDrawerProps) => {
  const styles = useStyles2(getStyles);
  // @TODO: REMOVE
  const [selectedPackage, setSelectedPackage] = useState<SelectableValue>(mysqlPackage);
  // const [selectedPackage, setSelectedPackage] = useState<SelectableValue>();

  return (
    <Drawer title="Packaged panels" size="sm" onClose={onClose} scrollableContent>
      <div className={styles.container}>
        <Field label="Package">
          <Select
            placeholder="Select a package..."
            options={[{ label: 'MySQL' }, { label: 'Postgres' }, { label: 'MongoDB' }]}
            value={selectedPackage}
            onChange={setSelectedPackage}
          />
        </Field>
        {selectedPackage ? <PackagePanels panelPackage={selectedPackage} /> : <NoPackageSelected />}
        <div className={styles.finishedAdding}>
          <Button>Finished Adding</Button>
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
