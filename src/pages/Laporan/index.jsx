import { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { chartDataPengantaran } from '../../data/mockData';
import { Select } from '../../components/ui/Input';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';

const Laporan = () => {
  const [filter, setFilter] = useState('minggu');

  // Dummy Data for charts
  const absensiData = [
    { name: 'Senin', hadir: 45, terlambat: 5, alpha: 0 },
    { name: 'Selasa', hadir: 42, terlambat: 7, alpha: 1 },
    { name: 'Rabu', hadir: 48, terlambat: 2, alpha: 0 },
    { name: 'Kamis', hadir: 40, terlambat: 8, alpha: 2 },
    { name: 'Jumat', hadir: 46, terlambat: 3, alpha: 1 },
  ];

  const pieData = [
    { name: 'Hadir', value: 85 },
    { name: 'Terlambat', value: 10 },
    { name: 'Sakit/Izin', value: 3 },
    { name: 'Alpha', value: 2 },
  ];
  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'];

  const poinData = [
    { name: 'Week 1', total: 320 },
    { name: 'Week 2', total: 450 },
    { name: 'Week 3', total: 410 },
    { name: 'Week 4', total: 580 },
  ];

  const customTooltipStyle = {
    borderRadius: '12px', 
    border: 'none', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    padding: '12px 16px',
    backgroundColor: '#fff',
    fontWeight: 500
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/20">
              <BarChart3 size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Grafik & Analytics</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">Laporan komprehensif performa operasional</p>
        </div>
        <div className="w-full sm:w-48">
          <Select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: 'hari', label: 'Hari Ini' },
              { value: 'minggu', label: 'Minggu Ini' },
              { value: 'bulan', label: 'Bulan Ini' },
              { value: 'tahun', label: 'Tahun Ini' }
            ]}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="!p-6">
            <CardHeader>
              <CardTitle>Pengantaran vs Pengambilan Paket</CardTitle>
            </CardHeader>
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartDataPengantaran} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <RechartsTooltip cursor={{fill: '#F8FAFC'}} contentStyle={customTooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: 12, fontWeight: 600}} />
                  <Bar dataKey="diantar" name="Diantar" fill="var(--color-jne-blue)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="diambil" name="Diambil" fill="var(--color-jne-red)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="!p-6">
            <CardHeader>
              <CardTitle>Tren Kehadiran Mingguan</CardTitle>
            </CardHeader>
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={absensiData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <RechartsTooltip contentStyle={customTooltipStyle} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: 12, fontWeight: 600}} />
                  <Line type="monotone" dataKey="hadir" name="Hadir" stroke="#10B981" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="terlambat" name="Terlambat" stroke="#F59E0B" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="!p-6">
            <CardHeader>
              <CardTitle>Persentase Status Kehadiran</CardTitle>
            </CardHeader>
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={85}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="!p-6">
            <CardHeader>
              <CardTitle>Perolehan Poin Karyawan</CardTitle>
            </CardHeader>
            <div className="h-80 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={poinData}>
                  <defs>
                    <linearGradient id="colorPoin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-jne-blue)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-jne-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <RechartsTooltip contentStyle={customTooltipStyle} />
                  <Area type="monotone" dataKey="total" name="Total Poin" stroke="var(--color-jne-blue)" fillOpacity={1} fill="url(#colorPoin)" strokeWidth={3} activeDot={{r: 6}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Laporan;
