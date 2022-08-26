import React, { useCallback, useEffect, useState } from 'react';
import {
  Query, Builder, Utils as QbUtils
} from 'react-awesome-query-builder';
import { showNotification } from '@mantine/notifications';
import 'react-awesome-query-builder/lib/css/compact_styles.css';
import {
  Select, Button, Container, Title, Center
} from '@mantine/core';

import MuiConfig from 'react-awesome-query-builder/lib/config/mui';
import { getAllFormsRequest, getFormRequest, queryRequest } from '../../utils/requests';
import { useLoading } from '../../hooks/useLoading';
import 'react-awesome-query-builder/lib/css/styles.css';
import './style.css';

const InitialConfig = MuiConfig;
const queryValue = { id: QbUtils.uuid(), type: 'group' };

export function QueryBuilder() {
  const [formList, setFormList] = useState([]);
  const [queryForm, setQueryForm] = useState();
  const [selectedForm, setSelectedForm] = useState();
  const [queryBuilderConfig, setQueryBuilderConfig] = useState(InitialConfig);
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);
  const [formId, setFormId] = useState();
  const [queryState, setQueryState] = useState({
    tree: QbUtils.checkTree(
      QbUtils.loadTree(queryValue),
      queryBuilderConfig
    ),
    config: queryBuilderConfig
  });
  const { request } = useLoading();

  const getAllForms = async () => {
    try {
      const response = await request(getAllFormsRequest);
      const formListResponse = [];
      response.data.forEach((formItem) => {
        formListResponse.push({ value: formItem.id, label: formItem.name });
      });
      setFormList(formListResponse);
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching data',
        message: error.response.data
                      && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const generateQueryBuilderConfig = () => {
    const newFields = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const formConfig of queryForm) {
      const field = {};
      field.label = formConfig.label.blocks[0].text;
      const { element } = formConfig;
      if (element === 'NumberInput' || element === 'Rating' || element === 'Range') {
        field.type = 'number';
      } else if (element === 'Dropdown' || element === 'Checkboxes' || element === 'RadioButtons') {
        field.type = 'select';
        // field.operators = ['equal'];
        field.valueSources = ['value'];
        const listValues = formConfig.options.map((option) => (
          { value: option.id, title: option.value }));
        field.fieldSettings = { listValues };
      } else {
        field.type = 'text';
      }
      newFields[`id_${formConfig.id}`] = field;
    }
    const newConfig = { ...InitialConfig, fields: newFields };
    setQueryBuilderConfig(newConfig);
  };

  const getQueryForm = async () => {
    setShowQueryBuilder(false);
    try {
      const response = await request(() => getFormRequest(selectedForm));
      setQueryForm(JSON.parse(response.data.form.data));
      setFormId(response.data.form.id);
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error while fetching data',
        message: error.response.data
                  && error.response.data.message ? error.response.data.message : error.message
      });
    }
  };

  const onChange = useCallback((immutableTree, config) => {
    setQueryState((prevState) => ({ ...prevState, tree: immutableTree, config }));
  }, []);

  const renderBuilder = useCallback((props) => (
    <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  ), []);

  useEffect(() => {
    getAllForms();
  }, []);

  useEffect(() => {
    if (queryForm) {
      generateQueryBuilderConfig();
      setShowQueryBuilder(true);
    }
  }, [queryForm]);

  return (
    <Container my={50}>
      <Center><Title>Run Query</Title></Center>
      <Select value={selectedForm} onChange={setSelectedForm} data={formList} label="Form Name" />
      <Center><Button onClick={getQueryForm} my={20}>Build Query</Button></Center>
      {showQueryBuilder && (
        <>
          <Query
            {...queryBuilderConfig}
            value={queryState.tree}
            onChange={onChange}
            renderBuilder={renderBuilder}
          />
          <div className="query-builder-result">
            Elastic Search:
            {' '}
            <pre>
              {JSON.stringify(QbUtils.sqlFormat(queryState.tree, queryState.config))}
            </pre>
          </div>
          <Center>
            <Button
              onClick={() => request(() => queryRequest({
                query: JSON.stringify(
                  QbUtils.sqlFormat(queryState.tree, queryState.config)
                ),
                formId
              }))}
              my={20}
            >
              Run Query
            </Button>

          </Center>
        </>
      )}
    </Container>

  );
}
