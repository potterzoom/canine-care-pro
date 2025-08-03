
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Activity, Heart, Thermometer } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HealthMetric {
  date: string;
  peso: number;
  temperatura: number;
  frecuenciaCardiaca: number;
  actividad: number;
}

const HealthDataVisualization = () => {
  const healthData: HealthMetric[] = [
    { date: '2024-08', peso: 23.5, temperatura: 38.2, frecuenciaCardiaca: 95, actividad: 85 },
    { date: '2024-09', peso: 24.1, temperatura: 38.4, frecuenciaCardiaca: 98, actividad: 78 },
    { date: '2024-10', peso: 24.8, temperatura: 38.1, frecuenciaCardiaca: 92, actividad: 82 },
    { date: '2024-11', peso: 25.2, temperatura: 38.3, frecuenciaCardiaca: 96, actividad: 88 },
  ];

  const pesoData = {
    labels: healthData.map(d => d.date),
    datasets: [
      {
        label: 'Peso (kg)',
        data: healthData.map(d => d.peso),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const temperaturaData = {
    labels: healthData.map(d => d.date),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: healthData.map(d => d.temperatura),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const frecuenciaData = {
    labels: healthData.map(d => d.date),
    datasets: [
      {
        label: 'Frecuencia Cardíaca (bpm)',
        data: healthData.map(d => d.frecuenciaCardiaca),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const actividadData = {
    labels: healthData.map(d => d.date),
    datasets: [
      {
        label: 'Nivel de Actividad (%)',
        data: healthData.map(d => d.actividad),
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const getLatestValue = (metric: keyof HealthMetric) => {
    const latest = healthData[healthData.length - 1];
    return latest[metric];
  };

  const getTrend = (metric: keyof HealthMetric) => {
    const values = healthData.map(d => d[metric] as number);
    const latest = values[values.length - 1];
    const previous = values[values.length - 2];
    return latest > previous ? 'up' : latest < previous ? 'down' : 'stable';
  };

  return (
    <div className="space-y-6">
      {/* Métricas Actuales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peso Actual</p>
                <p className="text-2xl font-bold text-gray-900">{getLatestValue('peso')} kg</p>
                <p className={`text-sm ${getTrend('peso') === 'up' ? 'text-red-600' : getTrend('peso') === 'down' ? 'text-green-600' : 'text-gray-600'}`}>
                  {getTrend('peso') === 'up' ? '↗️ Aumentó' : getTrend('peso') === 'down' ? '↘️ Disminuyó' : '➡️ Estable'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temperatura</p>
                <p className="text-2xl font-bold text-gray-900">{getLatestValue('temperatura')}°C</p>
                <p className="text-sm text-green-600">Normal</p>
              </div>
              <Thermometer className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Frecuencia Cardíaca</p>
                <p className="text-2xl font-bold text-gray-900">{getLatestValue('frecuenciaCardiaca')} bpm</p>
                <p className="text-sm text-green-600">Saludable</p>
              </div>
              <Heart className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actividad</p>
                <p className="text-2xl font-bold text-gray-900">{getLatestValue('actividad')}%</p>
                <p className="text-sm text-blue-600">Muy Activo</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <Tabs defaultValue="peso" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="peso">Peso</TabsTrigger>
          <TabsTrigger value="temperatura">Temperatura</TabsTrigger>
          <TabsTrigger value="frecuencia">Frecuencia Cardíaca</TabsTrigger>
          <TabsTrigger value="actividad">Actividad</TabsTrigger>
        </TabsList>

        <TabsContent value="peso" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolución del Peso</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={pesoData} options={chartOptions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temperatura" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Temperatura</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={temperaturaData} options={chartOptions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frecuencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frecuencia Cardíaca</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={frecuenciaData} options={chartOptions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actividad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nivel de Actividad</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={actividadData} options={chartOptions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Análisis e Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis e Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">📈 Tendencia de Peso</h4>
              <p className="text-blue-800">El peso ha aumentado gradualmente en los últimos 4 meses (+1.7kg). Considerar evaluación nutricional.</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-900 mb-2">💚 Estado Cardíaco</h4>
              <p className="text-green-800">Frecuencia cardíaca dentro de rangos normales. Buen estado cardiovascular.</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-900 mb-2">🏃 Nivel de Actividad</h4>
              <p className="text-purple-800">Excelente nivel de actividad física. Mantener rutina actual de ejercicios.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDataVisualization;
