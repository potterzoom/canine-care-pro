
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Package, Pill, Syringe, Beef, ShoppingCart, AlertTriangle, Plus } from 'lucide-react';

interface StockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StockModal = ({ open, onOpenChange }: StockModalProps) => {
  const [activeTab, setActiveTab] = useState('farmacia');

  // Datos de stock por categoría
  const farmaciaStock = [
    {
      id: 1,
      nombre: 'Amoxicilina 500mg',
      laboratorio: 'Pfizer',
      stock: 15,
      stockMinimo: 20,
      precio: 12.50,
      fechaVencimiento: '2025-03-15',
      lote: 'AM2024001'
    },
    {
      id: 2,
      nombre: 'Meloxicam 15mg',
      laboratorio: 'Boehringer',
      stock: 8,
      stockMinimo: 15,
      precio: 18.00,
      fechaVencimiento: '2025-06-20',
      lote: 'MX2024002'
    },
    {
      id: 3,
      nombre: 'Dexametasona 4mg',
      laboratorio: 'Vetoquinol',
      stock: 25,
      stockMinimo: 10,
      precio: 8.75,
      fechaVencimiento: '2025-08-10',
      lote: 'DX2024003'
    }
  ];

  const vacunasStock = [
    {
      id: 1,
      nombre: 'Vacuna Antirrábica',
      laboratorio: 'Zoetis',
      stock: 12,
      stockMinimo: 25,
      precio: 45.00,
      fechaVencimiento: '2025-04-30',
      lote: 'VAR2024001'
    },
    {
      id: 2,
      nombre: 'Vacuna Múltiple Canina',
      laboratorio: 'MSD',
      stock: 8,
      stockMinimo: 20,
      precio: 35.00,
      fechaVencimiento: '2025-02-28',
      lote: 'VMC2024002'
    },
    {
      id: 3,
      nombre: 'Vacuna Leucemia Felina',
      laboratorio: 'Elanco',
      stock: 18,
      stockMinimo: 15,
      precio: 28.50,
      fechaVencimiento: '2025-07-15',
      lote: 'VLF2024003'
    }
  ];

  const balanceadosStock = [
    {
      id: 1,
      nombre: 'Hills Prescription Diet',
      presentacion: '15kg',
      stock: 5,
      stockMinimo: 12,
      precio: 85.00,
      fechaVencimiento: '2025-05-20',
      proveedor: 'Hills Pet Nutrition'
    },
    {
      id: 2,
      nombre: 'Royal Canin Digestive Care',
      presentacion: '10kg',
      stock: 8,
      stockMinimo: 10,
      precio: 72.00,
      fechaVencimiento: '2025-09-30',
      proveedor: 'Royal Canin'
    },
    {
      id: 3,
      nombre: 'Purina Pro Plan Puppy',
      presentacion: '20kg',
      stock: 15,
      stockMinimo: 8,
      precio: 95.00,
      fechaVencimiento: '2025-11-15',
      proveedor: 'Nestlé Purina'
    }
  ];

  const otrosStock = [
    {
      id: 1,
      nombre: 'Jeringas 5ml',
      categoria: 'Material Médico',
      stock: 45,
      stockMinimo: 100,
      precio: 0.75,
      proveedor: 'BD Medical'
    },
    {
      id: 2,
      nombre: 'Suero Fisiológico 500ml',
      categoria: 'Fluidos',
      stock: 12,
      stockMinimo: 20,
      precio: 4.50,
      fechaVencimiento: '2026-01-30',
      proveedor: 'Baxter'
    },
    {
      id: 3,
      nombre: 'Vendas Elásticas 10cm',
      categoria: 'Material Quirúrgico',
      stock: 25,
      stockMinimo: 15,
      precio: 3.20,
      proveedor: 'Johnson & Johnson'
    }
  ];

  const getStockStatus = (stock: number, stockMinimo: number) => {
    if (stock <= stockMinimo * 0.5) {
      return { label: 'Crítico', color: 'bg-red-100 text-red-800 border-red-200' };
    } else if (stock <= stockMinimo) {
      return { label: 'Bajo', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    } else {
      return { label: 'Normal', color: 'bg-green-100 text-green-800 border-green-200' };
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Control de Stock</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="farmacia" className="flex items-center space-x-2">
                <Pill className="w-4 h-4" />
                <span>Farmacia</span>
              </TabsTrigger>
              <TabsTrigger value="vacunas" className="flex items-center space-x-2">
                <Syringe className="w-4 h-4" />
                <span>Vacunas</span>
              </TabsTrigger>
              <TabsTrigger value="balanceados" className="flex items-center space-x-2">
                <Beef className="w-4 h-4" />
                <span>Balanceados</span>
              </TabsTrigger>
              <TabsTrigger value="otros" className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Otros</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab de Farmacia */}
            <TabsContent value="farmacia" className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Medicamentos</h3>
                <Button className="bg-gray-800 hover:bg-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Medicamento
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicamento</TableHead>
                      <TableHead>Laboratorio</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Lote</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmaciaStock.map((item) => {
                      const status = getStockStatus(item.stock, item.stockMinimo);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.nombre}</TableCell>
                          <TableCell>{item.laboratorio}</TableCell>
                          <TableCell>{item.stock} unidades</TableCell>
                          <TableCell>
                            <Badge className={status.color}>{status.label}</Badge>
                          </TableCell>
                          <TableCell>${item.precio}</TableCell>
                          <TableCell>{item.fechaVencimiento}</TableCell>
                          <TableCell>{item.lote}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab de Vacunas */}
            <TabsContent value="vacunas" className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Vacunas</h3>
                <Button className="bg-gray-800 hover:bg-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Vacuna
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vacuna</TableHead>
                      <TableHead>Laboratorio</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Lote</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vacunasStock.map((item) => {
                      const status = getStockStatus(item.stock, item.stockMinimo);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.nombre}</TableCell>
                          <TableCell>{item.laboratorio}</TableCell>
                          <TableCell>{item.stock} dosis</TableCell>
                          <TableCell>
                            <Badge className={status.color}>{status.label}</Badge>
                          </TableCell>
                          <TableCell>${item.precio}</TableCell>
                          <TableCell>{item.fechaVencimiento}</TableCell>
                          <TableCell>{item.lote}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab de Balanceados */}
            <TabsContent value="balanceados" className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Alimentos Balanceados</h3>
                <Button className="bg-gray-800 hover:bg-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Alimento
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Presentación</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Proveedor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {balanceadosStock.map((item) => {
                      const status = getStockStatus(item.stock, item.stockMinimo);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.nombre}</TableCell>
                          <TableCell>{item.presentacion}</TableCell>
                          <TableCell>{item.stock} unidades</TableCell>
                          <TableCell>
                            <Badge className={status.color}>{status.label}</Badge>
                          </TableCell>
                          <TableCell>${item.precio}</TableCell>
                          <TableCell>{item.fechaVencimiento}</TableCell>
                          <TableCell>{item.proveedor}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Tab de Otros */}
            <TabsContent value="otros" className="mt-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Otros Productos</h3>
                <Button className="bg-gray-800 hover:bg-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Producto
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Vencimiento</TableHead>
                      <TableHead>Proveedor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {otrosStock.map((item) => {
                      const status = getStockStatus(item.stock, item.stockMinimo);
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.nombre}</TableCell>
                          <TableCell>{item.categoria}</TableCell>
                          <TableCell>{item.stock} unidades</TableCell>
                          <TableCell>
                            <Badge className={status.color}>{status.label}</Badge>
                          </TableCell>
                          <TableCell>${item.precio}</TableCell>
                          <TableCell>{item.fechaVencimiento || 'N/A'}</TableCell>
                          <TableCell>{item.proveedor}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <div className="flex justify-end space-x-2 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button className="bg-gray-800 hover:bg-black">
            Generar Reporte
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockModal;
