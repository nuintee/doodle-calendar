import { TemplatesContext } from '@/contexts/templates';
import { useContext } from 'react';

export const useTemplates = () => useContext(TemplatesContext);
