// @ts-nocheck
import { css } from '@emotion/css';
import React, { useState, useEffect } from 'react';

import { AsyncSelect, Input, Icon, RadioButtonList, Pagination, useStyles2, Text } from '@grafana/ui';

import { loadOptions, loadPackage } from '../../../../../../features/dashboard/dashgrid/PackageDrawer/PackageDrawer';
import { PromQueryBuilderExplained } from '../PromQueryBuilderExplained';

import { RadioItem } from './RadioItem';

const PAGE_SIZE = 5;

const getPage = (queries, currentPage) => {
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, queries.length);
  return queries.slice(startIndex, endIndex);
};

export const FromPackageBuilder = (props) => {
  const { query, selectedPackage, setSelectedPackage, selectedQuery, setSelectedQuery, onChange, showExplain } = props;

  const styles = useStyles2(getStyles);
  const [search, setSearch] = useState<string>('');
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sortSelectedFirst = (a, _) => (a.title === selectedQuery.title ? -1 : 0);

  useEffect(() => {
    if (selectedPackage) {
      const getPackage = async (id) => {
        try {
          const packageData = await loadPackage(id);
          const packageQueries = packageData.spec.queries;
          packageQueries.sort(sortSelectedFirst);
          setQueries(packageQueries);
        } catch (e) {
          console.log(e);
        }
      };
      getPackage(selectedPackage.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackage]);

  const onChangePackage = (q) => {
    setSelectedQuery(q);
    query.expr = q.spec.expr;
    onChange(query);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    if (queries.length && selectedQuery) {
      queries.sort(sortSelectedFirst);
    }
  };

  const filteredQueries = queries.filter((q) => q.title.includes(search.toLowerCase()));
  const page = getPage(filteredQueries, currentPage);
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
        <Input prefix={<Icon name="search" />} placeholder="Search queries..." onChange={onSearch} width={40} />
      </div>
      {!!queries.length && (
        <div className={styles.wrapper}>
          <div className={styles.radioWrapper}>
            {page.length ? (
              <RadioButtonList
                options={page.map((q) => ({
                  label: <RadioItem title={q.title} description={q.description} />,
                  value: q,
                }))}
                value={queries.find(({ title }) => title === selectedQuery?.title) || {}}
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
            numberOfPages={Math.ceil(filteredQueries.length / PAGE_SIZE)}
            onNavigate={setCurrentPage}
            hideWhenSinglePage
            className={styles.pagination}
          />
        </div>
      )}
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
