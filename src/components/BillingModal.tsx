
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Receipt, Download, Send, Eye } from 'lucide-react';

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BillingModal = ({ open, onOpenChange }: BillingModalProps) => {
  const recentInvoices = [
    {
      id: "001-001-000000123",
      date: "2024-11-15",
      client: "Juan Pérez",
      pet: "Max",
      service: "Consulta General",
      amount: 35.00,
      status: "pagada"
    },
    {
      id: "001-001-000000124",
      date: "2024-11-15",
      client: "María García",
      pet: "Luna",
      service: "Vacunación",
      amount: 45.00,
      status: "pendiente"
    },
    {
      id: "001-001-000000125",
      date: "2024-11-14",
      client: "Carlos Mendoza",
      pet: "Rocky",
      service: "Cirugía Menor",
      amount: 120.00,
      status: "pagada"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'pagada' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Receipt className="w-5 h-5" />
            <span>Facturación Electrónica</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Nueva factura */}
          <div className="bg-slate-50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold">Generar Nueva Factura</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientSelect">Cliente</Label>
                <select id="clientSelect" className="w-full p-2 border rounded-md">
                  <option value="">Seleccionar cliente...</option>
                  <option value="juan">Juan Pérez</option>
                  <option value="maria">María García</option>
                  <option value="carlos">Carlos Mendoza</option>
                </select>
              </div>
              <div>
                <Label htmlFor="invoiceDate">Fecha</Label>
                <Input id="invoiceDate" type="date" defaultValue="2024-11-15" />
              </div>
            </div>
            
            {/* Servicios */}
            <div className="space-y-2">
              <Label>Servicios</Label>
              <div className="border rounded-md p-4 space-y-3">
                <div className="grid grid-cols-4 gap-2 items-end">
                  <div>
                    <Label htmlFor="service1">Servicio/Producto</Label>
                    <Input id="service1" placeholder="Consulta General" />
                  </div>
                  <div>
                    <Label htmlFor="quantity1">Cantidad</Label>
                    <Input id="quantity1" type="number" defaultValue="1" />
                  </div>
                  <div>
                    <Label htmlFor="price1">Precio Unit.</Label>
                    <Input id="price1" type="number" placeholder="35.00" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Agregar</Button>
                  </div>
                </div>
                
                {/* Items agregados */}
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Consulta General x1</span>
                    <span>$35.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Vacuna Antirrábica x1</span>
                    <span>$25.00</span>
                  </div>
                </div>
                
                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>$60.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IVA (12%):</span>
                    <span>$7.20</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>$67.20</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1">
                Generar Factura
              </Button>
              <Button variant="outline">
                Vista Previa
              </Button>
            </div>
          </div>

          {/* Facturas recientes */}
          <div className="space-y-4">
            <h3 className="font-semibold">Facturas Recientes</h3>
            <div className="space-y-3">
              {recentInvoices.map((invoice, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">#{invoice.id}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status === 'pagada' ? 'Pagada' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {invoice.date} • {invoice.client} • {invoice.pet}
                      </p>
                      <p className="text-sm">{invoice.service}</p>
                      <p className="text-lg font-semibold">${invoice.amount}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-4 h-4 mr-1" />
                        Enviar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen financiero */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Resumen del Mes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">$2,450</p>
                <p className="text-sm text-slate-600">Ingresos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">45</p>
                <p className="text-sm text-slate-600">Facturas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">$320</p>
                <p className="text-sm text-slate-600">Pendientes</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button>
            Exportar Reporte
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillingModal;
