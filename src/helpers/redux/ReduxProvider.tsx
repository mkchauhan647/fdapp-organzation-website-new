import { Provider } from "react-redux";

import { ChildrenSchema } from "@/utils/schema/commonschema";
import { persistor, store   } from "./store";
import { PersistGate } from "redux-persist/integration/react";


 function ReduxProvider({children} : ChildrenSchema){
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider;