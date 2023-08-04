import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { locationService, reportInteraction } from '@grafana/runtime';
import { Button, useStyles2, Text } from '@grafana/ui';
import { Trans } from 'app/core/internationalization';
import { DashboardModel } from 'app/features/dashboard/state';
import {
  onAddLibraryPanel,
  onCreateNewPanel,
  onCreateNewRow,
  onStartWithPackage,
} from 'app/features/dashboard/utils/dashboard';
import { useDispatch, useSelector } from 'app/types';

import { setInitialDatasource } from '../state/reducers';

export interface Props {
  dashboard: DashboardModel;
  canCreate: boolean;
}

const DashboardEmpty = ({ dashboard, canCreate }: Props) => {
  const styles = useStyles2(getStyles);
  const dispatch = useDispatch();
  const initialDatasource = useSelector((state) => state.dashboard.initialDatasource);

  return (
    <div className={styles.centeredContent}>
      <div className={styles.main}>
        <p className={styles.spacer}>Welcome to your new dashboard. Looks empty; let&apos;s fix that.</p>

        <div className={styles.spacer}>
          <div className={styles.heading}>
            <Text element="h2" weight="light">
              Start with packages
            </Text>
          </div>
          <Text element="p" color="secondary">
            You can build almost anything in Grafana. But you don&apos;t have to.
            <br />
            Packages contain configured and tested visualizations for most monitoring use cases.
          </Text>
          <Button
            size="md"
            icon="plus"
            onClick={() => onStartWithPackage(dashboard)}
            disabled={!canCreate}
            className={styles.buttonWrapper}
          >
            Add from package
          </Button>
        </div>

        <div className={styles.spacer}>
          <div className={styles.heading}>
            <Text element="h2" weight="light">
              Add a custom visualization
            </Text>
          </div>
          <Text element="p" color="secondary">
            <Trans i18nKey="dashboard.empty.add-visualization-body">
              Select a data source and then query and visualize your data with charts, stats and tables or create lists,
              markdowns and other widgets.
            </Trans>
          </Text>
          <div>
            <Button
              size="md"
              icon="plus"
              data-testid={selectors.pages.AddDashboard.itemButton('Create new panel button')}
              onClick={() => {
                const id = onCreateNewPanel(dashboard, initialDatasource);
                reportInteraction('dashboards_emptydashboard_clicked', { item: 'add_visualization' });
                locationService.partial({ editPanel: id, firstPanel: true });
                dispatch(setInitialDatasource(undefined));
              }}
              disabled={!canCreate}
              fill="outline"
              className={styles.buttonWrapper}
            >
              <Trans i18nKey="dashboard.empty.add-visualization-button">Add visualization</Trans>
            </Button>
          </div>
        </div>

        <div className={styles.spacer}>
          <div className={styles.heading}>
            <Text element="h2" weight="light">
              <Trans i18nKey="dashboard.empty.add-row-header">Add a row</Trans>
            </Text>
          </div>
          <Text element="p" color="secondary">
            <Trans i18nKey="dashboard.empty.add-row-body">Group your visualizations into expandable sections.</Trans>
          </Text>
          <div>
            <Button
              icon="plus"
              fill="outline"
              data-testid={selectors.pages.AddDashboard.itemButton('Create new row button')}
              onClick={() => {
                reportInteraction('dashboards_emptydashboard_clicked', { item: 'add_row' });
                onCreateNewRow(dashboard);
              }}
              disabled={!canCreate}
              className={styles.buttonWrapper}
            >
              <Trans i18nKey="dashboard.empty.add-row-button">Add row</Trans>
            </Button>
          </div>
        </div>

        <div>
          <div className={styles.heading}>
            <Text element="h2" weight="light">
              <Trans i18nKey="dashboard.empty.add-import-header">Import panel</Trans>
            </Text>
          </div>
          <Text element="p" color="secondary">
            <Trans i18nKey="dashboard.empty.add-import-body">
              Import visualizations that are shared with other dashboards.
            </Trans>
          </Text>
          <div>
            <Button
              icon="plus"
              fill="outline"
              data-testid={selectors.pages.AddDashboard.itemButton('Add a panel from the panel library button')}
              onClick={() => {
                reportInteraction('dashboards_emptydashboard_clicked', { item: 'import_from_library' });
                onAddLibraryPanel(dashboard);
              }}
              disabled={!canCreate}
              className={styles.buttonWrapper}
            >
              <Trans i18nKey="dashboard.empty.add-import-button">Import library panel</Trans>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmpty;

function getStyles(theme: GrafanaTheme2) {
  return {
    main: css({
      display: 'flex',
      justifyContent: 'left',
      flexDirection: 'column',
      width: '40%',
    }),
    spacer: css({
      marginBottom: '42px',
    }),
    heading: css({
      marginBottom: '12px',
    }),
    section: css({
      marginBottom: '0px 48px',
    }),
    buttonWrapper: css({
      marginTop: '12px',
    }),
    centeredContent: css({
      label: 'centered',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }),
  };
}
