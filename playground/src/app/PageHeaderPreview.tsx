import { PageHeader, PageHeaderTitle } from "../../../src/System/PageHeader";

export function PageHeaderPreview() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      <PageHeader>
        <PageHeaderTitle>Page Title</PageHeaderTitle>
      </PageHeader>
    </div>
  );
}
