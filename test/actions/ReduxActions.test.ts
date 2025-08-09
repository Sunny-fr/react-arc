
import { ReduxActions } from '../../src';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from '../../src/reducers/createReducer';
import axios from 'axios';
import {combineReducers} from "redux";
import {ARCConfig, ARCMetaCollectionMap, ARCStoreState, core} from "../../src";


vi.mock('axios');

describe('ReduxActions', () => {
  type SampleModel = {
    id: number;
    name: string;
  }
  type RequiredProps = {
    id: string;
  }
  const ARCConfig:ARCConfig<SampleModel, RequiredProps> = {
    name: 'test',
    modelProps: ['id'],
    paths: {
      item: '/{id}'
    },
  };

  const responseData = { id: 1, name: 'Test Item' };

  beforeEach(() => {
    vi.clearAllMocks();
    // @ts-ignore
    axios.create = vi.fn(() => vi.fn().mockResolvedValue({ data: responseData }));
  });

  it('should initialize correctly', () => {
    const actions = new ReduxActions({ config: ARCConfig });
    expect(actions.config.name).toBe('test');
  });

  it('should fetch one item successfully', async () => {
    const reducer = createReducer({ config: ARCConfig });
    const reducers = { test: reducer };
    const store = configureStore({ reducer: combineReducers(reducers) });
    type RootState = ReturnType<typeof store.getState>


    const actions = new ReduxActions<SampleModel, RequiredProps>({ config: ARCConfig });
    const props = { id: '1' };
    // props are correct to we don't check null
    // for the sake of this test
    const params = core.getParams(ARCConfig, props) as RequiredProps;
    const modelKey = core.getKey(ARCConfig, params) as string as keyof ARCMetaCollectionMap<SampleModel>;

    await store.dispatch(actions.fetchOne(params, params, {}));

    const state = store.getState() as RootState
    const reducerState = state.test as ARCStoreState<SampleModel>


    expect(reducerState.collection[modelKey].metas.loaded).toBe(true);
    expect(reducerState.collection[modelKey].model).toEqual(responseData);
  });
});