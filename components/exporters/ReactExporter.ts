import { ComponentMetadata } from '@/lib/component-registry';
import { ExportStyling } from '@/store/editor-store';

export const generateReactCode = (
  component: ComponentMetadata,
  props: Record<string, any>,
  styling: ExportStyling
): string => {
  const componentName = component.name;
  const importPath = `@/components/ui/${component.id}`;
  
  // Generate import statement
  let imports = `import { ${componentName} } from '${importPath}';`;
  
  // Add additional imports for composite components
  if (component.id === 'card') {
    imports = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '${importPath}';`;
  } else if (component.id === 'avatar') {
    imports = `import { Avatar, AvatarImage, AvatarFallback } from '${importPath}';`;
  } else if (component.id === 'tooltip') {
    imports = `import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '${importPath}';\nimport { Button } from '@/components/ui/button';`;
  } else if (component.id === 'tabs') {
    imports = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '${importPath}';`;
  } else if (component.id === 'alert') {
    imports = `import { Alert, AlertTitle, AlertDescription } from '${importPath}';`;
  } else if (component.id === 'accordion') {
    imports = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '${importPath}';`;
  } else if (component.id === 'table') {
    imports = `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '${importPath}';`;
  }
  
  // Generate props string
  const propsArray: string[] = [];
  
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'children') return; // Handle children separately
    
    if (typeof value === 'string') {
      propsArray.push(`${key}="${value}"`);
    } else if (typeof value === 'number') {
      propsArray.push(`${key}={${value}}`);
    } else if (typeof value === 'boolean') {
      if (value) {
        propsArray.push(key);
      }
    }
  });
  
  const propsString = propsArray.length > 0 ? ' ' + propsArray.join(' ') : '';
  
  // Generate JSX
  let jsx = '';
  
  switch (component.id) {
    case 'button':
      jsx = `<${componentName}${propsString}>\n  ${props.children || 'Button'}\n</${componentName}>`;
      break;
      
    case 'input':
    case 'textarea':
    case 'slider':
    case 'separator':
    case 'skeleton':
    case 'progress':
      jsx = `<${componentName}${propsString} />`;
      break;
      
    case 'checkbox':
      imports += `\nimport { Label } from '@/components/ui/label';`;
      jsx = `<div className="flex items-center space-x-2">\n  <Checkbox${propsString} id="checkbox" />\n  <Label htmlFor="checkbox">Checkbox</Label>\n</div>`;
      break;
      
    case 'switch':
      imports += `\nimport { Label } from '@/components/ui/label';`;
      jsx = `<div className="flex items-center space-x-2">\n  <Switch${propsString} id="switch" />\n  <Label htmlFor="switch">Switch</Label>\n</div>`;
      break;
      
    case 'badge':
      jsx = `<${componentName}${propsString}>${props.children || 'Badge'}</${componentName}>`;
      break;
      
    case 'label':
      jsx = `<${componentName}${propsString}>${props.children || 'Label'}</${componentName}>`;
      break;
      
    case 'card':
      jsx = `<Card className="w-[350px]">\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card content goes here.</p>\n  </CardContent>\n  <CardFooter>\n    <p className="text-sm text-muted-foreground">Card Footer</p>\n  </CardFooter>\n</Card>`;
      break;
      
    case 'avatar':
      jsx = `<Avatar>\n  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>`;
      break;
      
    case 'tooltip':
      jsx = `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline">Hover me</Button>\n    </TooltipTrigger>\n    <TooltipContent>\n      <p>${props.content || 'Tooltip content'}</p>\n    </TooltipContent>\n  </Tooltip>\n</TooltipProvider>`;
      break;
      
    case 'tabs':
      jsx = `<Tabs defaultValue="tab1" className="w-[400px]">\n  <TabsList>\n    <TabsTrigger value="tab1">Tab 1</TabsTrigger>\n    <TabsTrigger value="tab2">Tab 2</TabsTrigger>\n  </TabsList>\n  <TabsContent value="tab1">Content for Tab 1</TabsContent>\n  <TabsContent value="tab2">Content for Tab 2</TabsContent>\n</Tabs>`;
      break;
      
    case 'alert':
      jsx = `<Alert${propsString}>\n  <AlertTitle>Alert Title</AlertTitle>\n  <AlertDescription>This is an alert description.</AlertDescription>\n</Alert>`;
      break;
      
    case 'accordion':
      jsx = `<Accordion type="single" collapsible className="w-[400px]">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Accordion Item 1</AccordionTrigger>\n    <AccordionContent>Content for item 1</AccordionContent>\n  </AccordionItem>\n</Accordion>`;
      break;
      
    case 'table':
      jsx = `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Column 1</TableHead>\n      <TableHead>Column 2</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>Cell 1</TableCell>\n      <TableCell>Cell 2</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`;
      break;
      
    default:
      jsx = `<${componentName}${propsString} />`;
  }
  
  // If CSS styling is selected, add note
  let cssNote = '';
  if (styling === 'css') {
    cssNote = '\n\n/* Note: Convert Tailwind classes to CSS */\n/* Example: className="w-full" -> width: 100%; */';
  }
  
  return `${imports}\n\nexport default function Component() {\n  return (\n    ${jsx}\n  );\n}${cssNote}`;
};

