import { Suspense, lazy } from "react";

export interface LazyComponentProps {
  filename: string;
  meta?: any;
}

const LazyComponent = ({ filename, meta }: LazyComponentProps) => {
  const Component = lazy(() => import(`./flows/${filename}/${filename}.tsx`));

  return <Suspense fallback={null}>{filename ? <Component meta={meta} /> : null}</Suspense>;
};

export default LazyComponent;
