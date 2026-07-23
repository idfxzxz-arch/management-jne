import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Table, Thead, Tbody, Tr, Th, Td, TableHeader } from '../../components/ui/Table';
import { mockJadwalData } from '../../data/mockData';
import { CalendarDays, Sun, Sunset } from 'lucide-react';
import { Select } from '../../components/ui/Input';
import { motion } from 'framer-motion';

const Jaga = () => {
  const [data] = useState(mockJadwalData);
  const [search, setSearch] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');

  const filteredData = data.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase());
    const matchShift = shiftFilter ? item.shift === shiftFilter : true;
    return matchSearch && matchShift;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
              <CalendarDays size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900">Jadwal Jaga</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12">Jadwal shift karyawan (Pagi & Siang)</p>
        </div>
      </motion.div>

      {/* Shift Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="!p-0 overflow-hidden">
            <div className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
                <Sun size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Shift Pagi</p>
                <p className="text-2xl font-extrabold text-gray-900">{data.filter(d => d.shift === 'Pagi').length} <span className="text-sm font-normal text-gray-400">Karyawan</span></p>
                <p className="text-xs text-gray-400 mt-0.5">08:00 - 16:00 WIB</p>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-60" />
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="!p-0 overflow-hidden">
            <div className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
                <Sunset size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Shift Siang</p>
                <p className="text-2xl font-extrabold text-gray-900">{data.filter(d => d.shift === 'Siang').length} <span className="text-sm font-normal text-gray-400">Karyawan</span></p>
                <p className="text-xs text-gray-400 mt-0.5">16:00 - 00:00 WIB</p>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-60" />
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="!p-0 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <TableHeader 
              onSearch={setSearch}
              rightContent={
                <Select 
                  value={shiftFilter}
                  onChange={(e) => setShiftFilter(e.target.value)}
                  options={['Pagi', 'Siang']}
                  className="!w-36"
                />
              }
            />
          </div>
          
          <Table>
            <Thead>
              <Tr>
                <Th>Karyawan</Th>
                <Th>Hari</Th>
                <Th>Shift</Th>
                <Th>Jam Kerja</Th>
                <Th>Status</Th>
                <Th>Catatan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.length === 0 ? (
                <Tr><Td colSpan={6} className="text-center py-12 text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <CalendarDays size={40} className="text-gray-300" />
                    <p className="font-semibold">Tidak ada jadwal</p>
                  </div>
                </Td></Tr>
              ) : (
                filteredData.map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs">{item.nama.charAt(0)}</div>
                        <span className="font-semibold text-gray-900">{item.nama}</span>
                      </div>
                    </Td>
                    <Td className="font-medium text-gray-700">{item.hari}</Td>
                    <Td>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border ${
                        item.shift === 'Pagi' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {item.shift === 'Pagi' ? <Sun size={12} /> : <Sunset size={12} />}
                        {item.shift}
                      </span>
                    </Td>
                    <Td className="font-mono text-sm font-semibold text-gray-800">{item.jamMasuk} - {item.jamPulang}</Td>
                    <Td>
                      <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
                    </Td>
                    <Td className="text-gray-400 text-sm">{item.catatan}</Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Card>
      </motion.div>
    </div>
  );
};

export default Jaga;
