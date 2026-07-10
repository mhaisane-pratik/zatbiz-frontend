import { useState } from 'react';

export function useFormBuilderState() {
  const [customForms, setCustomForms] = useState<{ id: string; title: string; fields: string[] }[]>([
    { id: 'contact', title: 'Contact Us Form', fields: ['Name', 'Email', 'Message'] }
  ]);
  const [mockFormSubmissions, setMockFormSubmissions] = useState<{ formId: string; data: Record<string, string>; date: string }[]>([
    { formId: 'contact', data: { Name: 'Alice Smith', Email: 'alice@gmail.com', Message: 'I love your custom brand catalog!' }, date: '2026-06-09 10:14' }
  ]);

  return {
    customForms,
    setCustomForms,
    mockFormSubmissions,
    setMockFormSubmissions
  };
}
