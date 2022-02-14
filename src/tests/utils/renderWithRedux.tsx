import React, { ReactNode } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import {
  configureStore,
  ConfigureStoreOptions,
  EnhancedStore,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import racesReducer from "../../redux/racesSlice";

type RenderWithReduxParams = {
  preloadedState: ConfigureStoreOptions["preloadedState"];
  store: EnhancedStore;
} & RenderOptions;

function render(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { races: racesReducer },
      preloadedState,
    }),
    ...renderOptions
  }: Partial<RenderWithReduxParams> = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
