// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState, ChangeEvent, useEffect } from 'react';

import { AsyncSelect, Input, Icon, RadioButtonList, Pagination, useStyles2, Text } from '@grafana/ui';

import {
  loadOptions,
  fetchPackage,
  useInstalledPackages,
} from '../../../../../../features/dashboard/dashgrid/PackageDrawer/PackageDrawer';
import { PromQueryBuilderExplained } from '../PromQueryBuilderExplained';

const PAGE_SIZE = 5;

export const FromPackageBuilder = (props) => {
  const {
    query,
    selectedPackage,
    setSelectedPackage,
    selectedPackageQuery,
    setSelectedPackageQuery,
    onChange,
    showExplain,
  } = props;

  const { pkgs } = useInstalledPackages();
  const styles = useStyles2(getStyles);
  const [search, setSearch] = useState<string>('');
  const [packageData, setPackageData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (selectedPackage) {
      const pkg = fetchPackage(pkgs, selectedPackage.value);
      if (pkg) {
        pkg.spec.queries.sort((a, _) => (a.title === selectedPackageQuery.title ? -1 : 0));
        setPackageData(pkg);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackage, pkgs]);

  const onChangePackage = (q) => {
    setSelectedPackageQuery(q);
    query.expr = q.spec.expr;
    onChange(query);
  };

  const queries = packageData?.spec?.queries
    ? packageData.spec.queries.filter((q) => q.title.includes(search.toLowerCase()))
    : [];
  const numberOfPages = Math.ceil(queries.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, queries.length);
  const queryPage = queries.slice(startIndex, endIndex) || [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AsyncSelect
          placeholder="Select a package..."
          loadOptions={loadOptions}
          value={selectedPackage}
          onChange={setSelectedPackage}
          defaultOptions
          width={50}
        />
        <Input
          prefix={<Icon name="search" />}
          placeholder="Search queries..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          width={40}
        />
      </div>
      <div className={styles.wrapper}>
        {packageData && (
          <>
            <div className={styles.radioWrapper}>
              {queryPage.length ? (
                <RadioButtonList
                  options={queryPage.map((q) => ({
                    label: (
                      <div className={styles.radio}>
                        <Text element="h6" color="maxContrast" weight="light">
                          {q.title}
                        </Text>
                        <Text element="p" color="secondary" italic truncate>
                          {q.description || 'No description'}
                        </Text>
                      </div>
                    ),
                    value: q,
                  }))}
                  value={selectedPackageQuery}
                  onChange={onChangePackage}
                  name="select-query"
                />
              ) : (
                <Text element="p" italic>
                  No matching queries
                </Text>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              onNavigate={setCurrentPage}
              hideWhenSinglePage
              className={styles.pagination}
            />
          </>
        )}
      </div>
      {showExplain && <PromQueryBuilderExplained query={query.expr} />}
    </div>
  );
};

const getStyles = () => ({
  container: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '8px',
  }),
  radio: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  }),
  radioWrapper: css({
    height: '142px',
    marginBottom: '8px',
  }),
  wrapper: css({
    marginBottom: '8px',
  }),
  pagination: css({
    float: 'left',
  }),
});
