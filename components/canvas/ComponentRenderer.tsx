import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ComponentRendererProps {
  componentId: string;
  props: Record<string, any>;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ componentId, props }) => {
  try {
    switch (componentId) {
      case 'button':
        return <Button {...props}>{props.label || 'Button'}</Button>;
        
      case 'input':
        return <Input {...props} placeholder={props.placeholder || 'Enter text...'} />;
        
      case 'textarea':
        return <Textarea {...props} placeholder={props.placeholder || 'Type your message...'} />;
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox {...props} id="checkbox-preview" />
            <Label htmlFor="checkbox-preview">Checkbox</Label>
          </div>
        );
        
      case 'radio-group':
        return <RadioGroup {...props} />;
        
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch {...props} id="switch-preview" />
            <Label htmlFor="switch-preview">Switch</Label>
          </div>
        );
        
      case 'select':
        return <Select {...props} />;
        
      case 'slider':
        return <Slider {...props} className="w-[200px]" />;
        
      case 'label':
        return <Label {...props}>{props.children || 'Label'}</Label>;
        
      case 'card':
        return (
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Card Footer</p>
            </CardFooter>
          </Card>
        );
        
      case 'badge':
        return <Badge {...props}>{props.children || 'Badge'}</Badge>;
        
      case 'avatar':
        return (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        );
        
      case 'separator':
        return <Separator {...props} className="my-4" />;
        
      case 'skeleton':
        return (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        );
        
      case 'progress':
        return <Progress {...props} className="w-[200px]" />;
        
      case 'tooltip':
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{props.content || 'Tooltip content'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
        
      case 'tabs':
        return (
          <Tabs defaultValue="tab1" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content for Tab 1</TabsContent>
            <TabsContent value="tab2">Content for Tab 2</TabsContent>
          </Tabs>
        );
        
      case 'alert':
        return (
          <Alert {...props} className="w-[400px]">
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>This is an alert description.</AlertDescription>
          </Alert>
        );
        
      case 'accordion':
        return (
          <Accordion type="single" collapsible className="w-[400px]">
            <AccordionItem value="item-1">
              <AccordionTrigger>Accordion Item 1</AccordionTrigger>
              <AccordionContent>Content for accordion item 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Accordion Item 2</AccordionTrigger>
              <AccordionContent>Content for accordion item 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
        
      case 'table':
        return (
          <Table className="w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Column 1</TableHead>
                <TableHead>Column 2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cell 1</TableCell>
                <TableCell>Cell 2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cell 3</TableCell>
                <TableCell>Cell 4</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
        
      case 'breadcrumb':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Current</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
        
      case 'navigation-menu':
        return (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Item 1</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        );
        
      case 'menubar':
        return (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New</MenubarItem>
                <MenubarItem>Open</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        );
        
      case 'pagination':
        return (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        );
        
      case 'dialog':
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog description goes here.</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
        
      case 'sheet':
        return (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side={props.side || 'right'}>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>Sheet description goes here.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        );
        
      case 'popover':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>Popover content goes here.</PopoverContent>
          </Popover>
        );
        
      case 'dropdown-menu':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Item 1</DropdownMenuItem>
              <DropdownMenuItem>Item 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
        
      case 'collapsible':
        return (
          <Collapsible className="w-[350px]">
            <CollapsibleTrigger asChild>
              <Button variant="outline">Toggle</Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4">Collapsible content</div>
            </CollapsibleContent>
          </Collapsible>
        );
        
      case 'scroll-area':
        return (
          <ScrollArea className="h-[200px] w-[350px] rounded border p-4">
            <div>Scrollable content goes here...</div>
          </ScrollArea>
        );
        
      case 'calendar':
        return <Calendar mode="single" className="rounded-md border" />;
        
      case 'carousel':
        return (
          <Carousel className="w-[300px]">
            <CarouselContent>
              <CarouselItem>
                <div className="p-4 border rounded">Slide 1</div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-4 border rounded">Slide 2</div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        );
        
      case 'aspect-ratio':
        return (
          <AspectRatio ratio={props.ratio || 16/9} className="bg-muted">
            <div className="flex h-full items-center justify-center">16:9 Aspect Ratio</div>
          </AspectRatio>
        );
        
      default:
        return (
          <div className="p-4 border border-dashed border-gray-400 rounded">
            <p className="text-sm text-gray-600">{componentId}</p>
            <p className="text-xs text-gray-400">Component preview not yet implemented</p>
          </div>
        );
    }
  } catch (error) {
    return (
      <div className="p-4 border border-red-400 rounded bg-red-50">
        <p className="text-sm text-red-600">Error rendering component</p>
      </div>
    );
  }
};

