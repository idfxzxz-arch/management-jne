import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../components/ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td, TableHeader } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { mockAbsensiData } from '../../data/mockData';
import { Clock, LogIn, LogOut, CheckCircle, UserCheck, Users, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Absensi = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(mockAbsensiData);
  const [search, setSearch] = useState('');
  const [hasClockIn, setHasClockIn] = useState(false);
  const [hasClockOut, setHasClockOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredData = data.filter(item => 
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleClockIn = () => {
    Swal.fire({
      title: 'Clock In',
      text: "Anda akan melakukan absen masuk sekarang?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#004a8d',
      confirmButtonText: 'Ya, Clock In',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        setHasClockIn(true);
        const newRecord = {
          id: Date.now(),
          nama: user.name,
          tanggal: new Date().toISOString().split('T')[0],
          jamMasuk: time,
          jamKeluar: '-',
          totalJam: 0,
          status: 'Hadir'
        };
        setData([newRecord, ...data]);
        Swal.fire({ title: 'Berhasil!', text: `Clock in pada ${time}`, icon: 'success', customClass: { popup: 'rounded-2xl' } });
      }
    });
  };

  const handleClockOut = () => {
    Swal.fire({
      title: 'Clock Out',
      text: "Anda akan mengakhiri shift hari ini?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e31e24',
      confirmButtonText: 'Ya, Clock Out',
      customClass: { popup: 'rounded-2xl' }
    }).then((result) => {
      if (result.isConfirmed) {
        setHasClockOut(true);
        Swal.fire({ title: 'Berhasil!', text: 'Anda berhasil clock out.', icon: 'success', customClass: { popup: 'rounded-2xl' } });
      }
    });
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Hadir': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Terlambat': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Sakit': 
      case 'Izin': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Alpha': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const hadirCount = data.filter(d => d.status === 'Hadir').length;
  const terlambatCount = data.filter(d => d.status === 'Terlambat').length;
  const absenCount = data.filter(d => ['Sakit', 'Izin', 'Alpha'].includes(d.status)).length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/20">
            <UserCheck size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">Absensi Karyawan</h1>
        </div>
        <p className="text-gray-500 text-sm ml-12">Sistem kehadiran dan jam kerja</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clock In/Out Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="!p-0 overflow-hidden h-full">
            <div className="bg-gradient-to-br from-[var(--color-jne-blue)] via-blue-700 to-blue-900 text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
              
              <Clock size={36} className="mb-4 text-blue-200" />
              <div className="text-5xl font-extrabold tracking-wider mb-1 tabular-nums">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-blue-200 text-sm mb-8 font-medium">
                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              
              <div className="flex gap-3 w-full relative z-10">
                <Button 
                  variant="ghost"
                  className="flex-1 !bg-white !text-[var(--color-jne-blue)] hover:!bg-blue-50 !rounded-xl !font-bold !shadow-lg" 
                  disabled={hasClockIn}
                  onClick={handleClockIn}
                >
                  {hasClockIn ? <CheckCircle size={18} /> : <LogIn size={18} />}
                  Clock In
                </Button>
                <Button 
                  variant="danger"
                  className="flex-1 !rounded-xl !font-bold !shadow-lg !shadow-red-500/30" 
                  disabled={!hasClockIn || hasClockOut}
                  onClick={handleClockOut}
                >
                  {hasClockOut ? <CheckCircle size={18} /> : <LogOut size={18} />}
                  Clock Out
                </Button>
              </div>
            </div>
            
            {/* Mini stats */}
            <div className="grid grid-cols-3 divide-x divide-gray-100">
              {[
                { label: 'Hadir', value: hadirCount, icon: Users, color: 'text-emerald-600' },
                { label: 'Terlambat', value: terlambatCount, icon: Clock, color: 'text-amber-600' },
                { label: 'Absen', value: absenCount, icon: AlertTriangle, color: 'text-red-500' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 text-center">
                  <stat.icon size={18} className={`mx-auto mb-1.5 ${stat.color}`} />
                  <p className="text-xl font-extrabold text-gray-900">{stat.value}</p>
                  <p className="text-[11px] text-gray-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="!p-0 overflow-hidden h-full flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <TableHeader onSearch={setSearch} title="Riwayat Absensi Hari Ini" />
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nama</Th>
                    <Th>Jam Masuk</Th>
                    <Th>Jam Keluar</Th>
                    <Th>Total Jam</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.length === 0 ? (
                    <Tr><Td colSpan={5} className="text-center py-12 text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <UserCheck size={40} className="text-gray-300" />
                        <p className="font-semibold">Tidak ada data</p>
                      </div>
                    </Td></Tr>
                  ) : (
                    filteredData.map((item) => (
                      <Tr key={item.id}>
                        <Td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">{item.nama.charAt(0)}</div>
                            <span className="font-semibold text-gray-900">{item.nama}</span>
                          </div>
                        </Td>
                        <Td className="font-mono font-semibold text-gray-800">{item.jamMasuk}</Td>
                        <Td className="font-mono font-semibold text-gray-800">{item.jamKeluar}</Td>
                        <Td>
                          {item.totalJam > 0 ? (
                            <span className="font-bold text-[var(--color-jne-blue)]">{item.totalJam} Jam</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </Td>
                        <Td>
                          <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Absensi;
