import { css } from '@emotion/css';
import React, { useState } from 'react';

import type { SelectableValue, GrafanaTheme2 } from '@grafana/data';
import { Drawer, Select, Field, Button, useStyles2 } from '@grafana/ui';

import { NoPackageSelected } from './NoPackageSelected';

interface PackageDrawerProps {
  onClose: () => void;
}

// const fetchPackages = async () => {}

export const PackageDrawer = ({ onClose }: PackageDrawerProps) => {
  const styles = useStyles2(getStyles);
  const [selectedPackage, setSelectedPackage] = useState<SelectableValue>();

  return (
    <Drawer title="Packaged panels" size="sm" onClose={onClose}>
      {/* UNCOMMENT WHEN WE HAVE AN ENDPOINT TO FETCH THESE */}
      {/* <AsyncSelect
        defaultOptions
        loadOptions={fetchPackages}
        value={selectedPackage}
        onChange={setSelectedPackage}
        placeholder={'Select a package...'}
      /> */}
      <Field label="Package">
        {/* Temporary select */}
        <Select
          placeholder="Select a package..."
          options={[{ label: 'MySql' }, { label: 'Postgres' }, { label: 'MongoDB' }]}
          value={selectedPackage}
          onChange={setSelectedPackage}
        />
      </Field>
      {selectedPackage ? <div>Test</div> : <NoPackageSelected />}
      <div className={styles.finishedAdding}>
        <Button>Finished Adding</Button>
      </div>
    </Drawer>
  );
};

function getStyles(theme: GrafanaTheme2) {
  return {
    finishedAdding: css({
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: '20px',
    }),
  };
}
