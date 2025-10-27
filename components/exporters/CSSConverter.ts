/**
 * Tailwind to CSS Converter
 * Converts common Tailwind utility classes to equivalent CSS properties
 */

interface CSSRule {
  [key: string]: string;
}

const TAILWIND_TO_CSS_MAP: Record<string, CSSRule> = {
  // Width
  'w-full': { width: '100%' },
  'w-screen': { width: '100vw' },
  'w-auto': { width: 'auto' },
  'w-1/2': { width: '50%' },
  'w-1/3': { width: '33.333333%' },
  'w-2/3': { width: '66.666667%' },
  'w-[350px]': { width: '350px' },
  'w-[400px]': { width: '400px' },
  'w-[200px]': { width: '200px' },
  'w-[500px]': { width: '500px' },
  
  // Height
  'h-full': { height: '100%' },
  'h-screen': { height: '100vh' },
  'h-auto': { height: 'auto' },
  'h-4': { height: '1rem' },
  'h-10': { height: '2.5rem' },
  'h-12': { height: '3rem' },
  
  // Padding
  'p-4': { padding: '1rem' },
  'p-2': { padding: '0.5rem' },
  'px-5': { paddingLeft: '1.25rem', paddingRight: '1.25rem' },
  'py-2': { paddingTop: '0.5rem', paddingBottom: '0.5rem' },
  
  // Margin
  'my-4': { marginTop: '1rem', marginBottom: '1rem' },
  'm-0': { margin: '0' },
  'mr-1': { marginRight: '0.25rem' },
  
  // Flexbox
  'flex': { display: 'flex' },
  'flex-col': { flexDirection: 'column' },
  'flex-row': { flexDirection: 'row' },
  'items-center': { alignItems: 'center' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'space-x-2': { gap: '0.5rem' },
  
  // Grid
  'grid': { display: 'grid' },
  'grid-cols-2': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
  'gap-2': { gap: '0.5rem' },
  
  // Text
  'text-sm': { fontSize: '0.875rem', lineHeight: '1.25rem' },
  'text-lg': { fontSize: '1.125rem', lineHeight: '1.75rem' },
  'text-xs': { fontSize: '0.75rem', lineHeight: '1rem' },
  'font-medium': { fontWeight: '500' },
  'font-semibold': { fontWeight: '600' },
  'font-bold': { fontWeight: '700' },
  'text-center': { textAlign: 'center' },
  'uppercase': { textTransform: 'uppercase' },
  'capitalize': { textTransform: 'capitalize' },
  'tracking-wide': { letterSpacing: '0.025em' },
  
  // Colors
  'text-white': { color: '#ffffff' },
  'text-black': { color: '#000000' },
  'text-gray-500': { color: '#6b7280' },
  'text-gray-600': { color: '#4b5563' },
  'text-gray-700': { color: '#374151' },
  'text-muted-foreground': { color: 'hsl(var(--muted-foreground))' },
  'bg-white': { backgroundColor: '#ffffff' },
  'bg-black': { backgroundColor: '#000000' },
  'bg-gray-900': { backgroundColor: '#111827' },
  'bg-gray-100': { backgroundColor: '#f3f4f6' },
  
  // Border
  'border': { border: '1px solid #e5e7eb' },
  'border-2': { border: '2px solid #e5e7eb' },
  'border-gray-200': { borderColor: '#e5e7eb' },
  'rounded': { borderRadius: '0.25rem' },
  'rounded-lg': { borderRadius: '0.5rem' },
  'rounded-full': { borderRadius: '9999px' },
  
  // Shadow
  'shadow-lg': { boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
  'shadow-2xl': { boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
  
  // Position
  'relative': { position: 'relative' },
  'absolute': { position: 'absolute' },
  'fixed': { position: 'fixed' },
  'top-0': { top: '0' },
  'right-0': { right: '0' },
  'bottom-0': { bottom: '0' },
  'left-0': { left: '0' },
  'inset-0': { top: '0', right: '0', bottom: '0', left: '0' },
  
  // Z-index
  'z-40': { zIndex: '40' },
  'z-50': { zIndex: '50' },
  
  // Overflow
  'overflow-hidden': { overflow: 'hidden' },
  'overflow-y-auto': { overflowY: 'auto' },
  'overflow-x-auto': { overflowX: 'auto' },
  
  // Transition
  'transition-all': { transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-opacity': { transition: 'opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)' },
  'transition-transform': { transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' },
  'duration-300': { transitionDuration: '300ms' },
  
  // Transform
  'translate-x-0': { transform: 'translateX(0)' },
  'translate-x-full': { transform: 'translateX(100%)' },
  
  // Cursor
  'cursor-pointer': { cursor: 'pointer' },
  'pointer-events-none': { pointerEvents: 'none' },
  
  // Opacity
  'opacity-0': { opacity: '0' },
  'opacity-100': { opacity: '1' },
};

export const convertTailwindToCSS = (tailwindClasses: string): string => {
  const classes = tailwindClasses.split(' ');
  const cssRules: CSSRule = {};
  
  classes.forEach((className) => {
    const rule = TAILWIND_TO_CSS_MAP[className];
    if (rule) {
      Object.assign(cssRules, rule);
    }
  });
  
  // Convert to CSS string
  const cssString = Object.entries(cssRules)
    .map(([property, value]) => {
      // Convert camelCase to kebab-case
      const kebabProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${kebabProperty}: ${value};`;
    })
    .join('\n');
  
  return cssString;
};

export const extractTailwindClasses = (jsxString: string): string[] => {
  const classNameMatches = jsxString.match(/className="([^"]*)"/g);
  if (!classNameMatches) return [];
  
  const allClasses: string[] = [];
  classNameMatches.forEach((match) => {
    const classes = match.replace(/className="/g, '').replace(/"/g, '');
    allClasses.push(...classes.split(' '));
  });
  
  return [...new Set(allClasses)]; // Remove duplicates
};

