import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Calculator, FileText, DollarSign } from 'lucide-react';

interface ServiceInvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface InvoiceItem {
  id: string;
  category: 'servicio' | 'balanceado' | 'vacuna' | 'medicina';
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const ServiceInvoiceModal = ({ open, onOpenChange }: ServiceInvoiceModalProps) => {
  const [clientData, setClientData] = useState({
    name: '',
    cedula: '',
    address: '',
    phone: '',
    email: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', category: 'servicio', name: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const [observations, setObservations] = useState('');

  // IVA Ecuador (15%)
  const IVA_RATE = 0.15;

  const services = [
    { value: 'consulta_general', label: 'Consulta General', price: 25.00 },
    { value: 'vacunacion', label: 'Vacunación', price: 30.00 },
    { value: 'cirugia_menor', label: 'Cirugía Menor', price: 150.00 },
    { value: 'castracion', label: 'Castración', price: 80.00 },
    { value: 'limpieza_dental', label: 'Limpieza Dental', price: 45.00 },
    { value: 'examenes_laboratorio', label: 'Exámenes de Laboratorio', price: 35.00 }
  ];

  const products = [
    { value: 'balanceado_adulto', label: 'Balanceado Adulto 15kg', price: 28.50 },
    { value: 'balanceado_cachorro', label: 'Balanceado Cachorro 15kg', price: 32.00 },
    { value: 'vacuna_rabia', label: 'Vacuna Antirrábica', price: 25.00 },
    { value: 'vacuna_triple', label: 'Vacuna Triple', price: 35.00 },
    { value: 'amoxicilina', label: 'Amoxicilina 500mg', price: 12.50 },
    { value: 'ivermectina', label: 'Ivermectina', price: 18.00 }
  ];

  const addItem = () => {
    const newId = (items.length + 1).toString();
    setItems([...items, { 
      id: newId, 
      category: 'servicio', 
      name: '', 
      quantity: 1, 
      unitPrice: 0, 
      total: 0 
    }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const getProductsByCategory = (category: string) => {
    if (category === 'servicio') return services;
    return products.filter(p => {
      if (category === 'balanceado') return p.value.includes('balanceado');
      if (category === 'vacuna') return p.value.includes('vacuna');
      if (category === 'medicina') return !p.value.includes('balanceado') && !p.value.includes('vacuna');
      return [];
    });
  };

  const handleProductSelect = (itemId: string, productValue: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const availableProducts = getProductsByCategory(item.category);
    const selectedProduct = availableProducts.find(p => p.value === productValue);
    
    if (selectedProduct) {
      updateItem(itemId, 'name', selectedProduct.label);
      updateItem(itemId, 'unitPrice', selectedProduct.price);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const ivaAmount = subtotal * IVA_RATE;
  const total = subtotal + ivaAmount;

  const generateInvoice = () => {
    console.log('Generando factura:', {
      client: clientData,
      items,
      subtotal,
      iva: ivaAmount,
      total,
      observations
    });
    // Aquí se procesaría la factura
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Facturación de Servicios y Productos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Datos del Cliente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Datos del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name">Nombre Completo *</Label>
                <Input
                  id="client-name"
                  value={clientData.name}
                  onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <Label htmlFor="client-cedula">Cédula/RUC</Label>
                <Input
                  id="client-cedula"
                  value={clientData.cedula}
                  onChange={(e) => setClientData({ ...clientData, cedula: e.target.value })}
                  placeholder="0999999999"
                />
              </div>
              <div>
                <Label htmlFor="client-phone">Teléfono</Label>
                <Input
                  id="client-phone"
                  value={clientData.phone}
                  onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                  placeholder="0999999999"
                />
              </div>
              <div>
                <Label htmlFor="client-email">Email</Label>
                <Input
                  id="client-email"
                  type="email"
                  value={clientData.email}
                  onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                  placeholder="cliente@email.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="client-address">Dirección</Label>
                <Input
                  id="client-address"
                  value={clientData.address}
                  onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
            </div>
          </div>

          {/* Items de Facturación */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Servicios y Productos</h3>
              <Button onClick={addItem} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end p-3 border rounded-lg">
                  <div className="col-span-2">
                    <Label>Categoría</Label>
                    <Select
                      value={item.category}
                      onValueChange={(value) => updateItem(item.id, 'category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="servicio">Servicio</SelectItem>
                        <SelectItem value="balanceado">Balanceado</SelectItem>
                        <SelectItem value="vacuna">Vacuna</SelectItem>
                        <SelectItem value="medicina">Medicina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-4">
                    <Label>Producto/Servicio</Label>
                    <Select onValueChange={(value) => handleProductSelect(item.id, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getProductsByCategory(item.category).map((product) => (
                          <SelectItem key={product.value} value={product.value}>
                            {product.label} - ${product.price.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-1">
                    <Label>Cant.</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Precio Unit.</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Total</Label>
                    <Input
                      value={`$${item.total.toFixed(2)}`}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>

                  <div className="col-span-1">
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="outline"
                      size="sm"
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Observaciones adicionales para la factura..."
              rows={3}
            />
          </div>

          {/* Totales */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (15%):</span>
                  <span>${ivaAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={generateInvoice} className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Generar Factura
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceInvoiceModal;