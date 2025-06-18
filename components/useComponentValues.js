import React, { createContext, useContext, useState, useEffect } from 'react';

const ComponentValueContext = createContext();

export function ComponentValueProvider({ children }) {
  const [componentValues, setComponentValues] = useState({});


  const updateValue = (componentId, value) => {
    setComponentValues(prevValues => ({
      ...prevValues,
      [componentId]: value,
    }));
  };

  return (
    <ComponentValueContext.Provider value={{ componentValues, updateValue }}>
      {children}
    </ComponentValueContext.Provider>
  );
}


export function useComponentValues() {
  return useContext(ComponentValueContext);
}

export function useOutputComponentData(title, value){
  const { updateValue } = useComponentValues();
  useEffect(() => {
    updateValue(title, value);
  }, [value]);
}



