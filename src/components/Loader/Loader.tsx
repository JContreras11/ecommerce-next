import React from 'react';

const Loader = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="inline-block size-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
      <span>Cargando productos</span>
    </div>
  );
};

export default Loader;
