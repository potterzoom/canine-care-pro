
import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Users, BarChart3, Shield, Package, MessageSquare } from 'lucide-react';

const ImprovementSuggestions = () => {
  const suggestions = [
    {
      category: "Dashboard Principal",
      icon: BarChart3,
      status: "good",
      improvements: [
        "✅ Estadísticas en tiempo real implementadas",
        "📈 Agregar gráficos de tendencias mensual/anual",
        "🔔 Mejorar sistema de notificaciones push",
        "📊 Dashboard personalizable por usuario"
      ]
    },
    {
      category: "Gestión de Pacientes",
      icon: Users,
      status: "needs-work",
      improvements: [
        "📋 Historiales médicos más detallados",
        "📷 Galería de fotos por paciente",
        "🧬 Integración con laboratorios externos",
        "📱 App móvil para propietarios"
      ]
    },
    {
      category: "Inventario y Stock",
      icon: Package,
      status: "excellent",
      improvements: [
        "✅ Control por categorías implementado",
        "📈 Agregar predicción de demanda con IA",
        "🔄 Pedidos automáticos cuando stock bajo",
        "📊 Reportes de rotación de productos"
      ]
    },
    {
      category: "Comunicación",
      icon: MessageSquare,
      status: "good",
      improvements: [
        "✅ WhatsApp IA implementado",
        "📧 Campañas de email marketing",
        "📱 SMS recordatorios automáticos",
        "🎥 Videollamadas integradas"
      ]
    },
    {
      category: "Seguridad y Respaldos",
      icon: Shield,
      status: "critical",
      improvements: [
        "🔐 Autenticación de dos factores",
        "💾 Respaldos automáticos diarios",
        "🔒 Encriptación de datos médicos",
        "👥 Control de acceso por roles"
      ]
    },
    {
      category: "Reportes y Analytics",
      icon: TrendingUp,
      status: "needs-work",
      improvements: [
        "📊 Dashboard financiero avanzado",
        "📈 Métricas de satisfacción del cliente",
        "🎯 KPIs de productividad veterinaria",
        "📋 Reportes personalizables"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'needs-work':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'Excelente';
      case 'good':
        return 'Bueno';
      case 'needs-work':
        return 'Mejorar';
      case 'critical':
        return 'Crítico';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Sugerencias de Mejora por Sección
      </h3>
      
      <div className="space-y-6">
        {suggestions.map((section, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <section.icon className="w-5 h-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">{section.category}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(section.status)}`}>
                {getStatusText(section.status)}
              </span>
            </div>
            
            <ul className="space-y-2">
              {section.improvements.map((improvement, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="mr-2 mt-0.5">{improvement.split(' ')[0]}</span>
                  <span>{improvement.substring(improvement.indexOf(' ') + 1)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Próximos Pasos Recomendados:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          <li>Implementar sistema de respaldos automáticos</li>
          <li>Agregar autenticación de dos factores</li>
          <li>Desarrollar dashboard financiero avanzado</li>
          <li>Crear app móvil para propietarios</li>
          <li>Implementar gráficos de tendencias</li>
        </ol>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
