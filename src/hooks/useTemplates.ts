import { useContext } from 'react';
import { TemplatesContext } from '../contexts/templates';

export const useTemplates = () => useContext(TemplatesContext);
