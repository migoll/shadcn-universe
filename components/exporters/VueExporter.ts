import { ComponentMetadata } from '@/lib/component-registry';
import { ExportStyling } from '@/store/editor-store';

const jsxToVueTemplate = (jsx: string): string => {
  return jsx
    // Convert className to class
    .replace(/className=/g, 'class=')
    // Convert self-closing tags
    .replace(/<(\w+)([^>]*)\s*\/>/g, '<$1$2></$1>')
    // Convert camelCase to kebab-case for event handlers
    .replace(/onClick/g, '@click')
    .replace(/onChange/g, '@change')
    .replace(/onInput/g, '@input')
    // Convert boolean props
    .replace(/(\w+)={true}/g, '$1')
    .replace(/(\w+)={false}/g, ':$1="false"');
};

export const generateVueCode = (
  component: ComponentMetadata,
  props: Record<string, any>,
  styling: ExportStyling
): string => {
  const componentName = component.name;
  
  // Generate props object for script section
  const propsObj: Record<string, any> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      propsObj[key] = value;
    }
  });
  
  // Generate template based on component
  let template = '';
  
  switch (component.id) {
    case 'button':
      const variant = props.variant || 'default';
      const size = props.size || 'default';
      template = `<button class="btn btn-${variant} btn-${size}" ${props.disabled ? 'disabled' : ''}>\n    ${props.children || 'Button'}\n  </button>`;
      break;
      
    case 'input':
      template = `<input \n    type="${props.type || 'text'}" \n    placeholder="${props.placeholder || ''}" \n    class="input" \n    ${props.disabled ? 'disabled' : ''}\n  />`;
      break;
      
    case 'textarea':
      template = `<textarea \n    placeholder="${props.placeholder || ''}" \n    rows="${props.rows || 4}" \n    class="textarea"\n    ${props.disabled ? 'disabled' : ''}\n  ></textarea>`;
      break;
      
    case 'checkbox':
      template = `<div class="flex items-center space-x-2">\n    <input type="checkbox" id="checkbox" class="checkbox" ${props.checked ? 'checked' : ''} ${props.disabled ? 'disabled' : ''} />\n    <label for="checkbox">Checkbox</label>\n  </div>`;
      break;
      
    case 'switch':
      template = `<div class="flex items-center space-x-2">\n    <input type="checkbox" class="switch" ${props.checked ? 'checked' : ''} ${props.disabled ? 'disabled' : ''} />\n    <label>Switch</label>\n  </div>`;
      break;
      
    case 'badge':
      template = `<span class="badge badge-${props.variant || 'default'}">\n    ${props.children || 'Badge'}\n  </span>`;
      break;
      
    case 'card':
      template = `<div class="card w-[350px]">\n    <div class="card-header">\n      <h3 class="card-title">Card Title</h3>\n      <p class="card-description">Card Description</p>\n    </div>\n    <div class="card-content">\n      <p>Card content goes here.</p>\n    </div>\n    <div class="card-footer">\n      <p class="text-sm text-muted">Card Footer</p>\n    </div>\n  </div>`;
      break;
      
    case 'alert':
      template = `<div class="alert alert-${props.variant || 'default'}" role="alert">\n    <h4 class="alert-title">Alert Title</h4>\n    <p class="alert-description">This is an alert description.</p>\n  </div>`;
      break;
      
    case 'tabs':
      template = `<div class="tabs w-[400px]">\n    <div class="tabs-list">\n      <button class="tab-trigger" data-value="tab1">Tab 1</button>\n      <button class="tab-trigger" data-value="tab2">Tab 2</button>\n    </div>\n    <div class="tab-content" data-value="tab1">Content for Tab 1</div>\n    <div class="tab-content" data-value="tab2">Content for Tab 2</div>\n  </div>`;
      break;
      
    case 'progress':
      template = `<div class="progress">\n    <div class="progress-bar" :style="{ width: '${props.value || 50}%' }"></div>\n  </div>`;
      break;
      
    case 'slider':
      template = `<input \n    type="range" \n    class="slider" \n    :min="${props.min || 0}" \n    :max="${props.max || 100}" \n    :step="${props.step || 1}"\n    ${props.disabled ? 'disabled' : ''}\n  />`;
      break;
      
    default:
      template = `<div class="${component.id}">\n    <!-- ${component.displayName} Component -->\n  </div>`;
  }
  
  // Generate script section
  const scriptSection = `<script setup lang="ts">
import { ref } from 'vue';

// Component props
const props = ${JSON.stringify(propsObj, null, 2)};
</script>`;

  // Generate style section
  let styleSection = '';
  if (styling === 'css') {
    styleSection = `\n\n<style scoped>
/* Add your CSS styles here */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-default {
  background-color: #000;
  color: #fff;
}

.btn-outline {
  border: 1px solid #d1d5db;
  background-color: transparent;
}

/* Add more styles as needed */
</style>`;
  }
  
  return `<template>
  ${template}
</template>

${scriptSection}${styleSection}`;
};

