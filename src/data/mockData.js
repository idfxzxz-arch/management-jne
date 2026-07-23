export const mockUsers = [
  { id: 1, username: 'admin', password: 'password', name: 'Budi Santoso', role: 'Admin' },
  { id: 2, username: 'spv', password: 'password', name: 'Siti Aminah', role: 'Supervisor' },
  { id: 3, username: 'kurir1', password: 'password', name: 'Agus Pratama', role: 'Kurir' },
  { id: 4, username: 'kurir2', password: 'password', name: 'Dodi Setiawan', role: 'Kurir' },
];

export const mockDashboardData = {
  totalDiantar: 145,
  totalDiambil: 89,
  karyawanHadir: 42,
  totalPoin: 1250,
  aktivitas: [
    { id: 1, text: 'Agus Pratama mengantar paket ke Gudang A', time: '10 menit yang lalu' },
    { id: 2, text: 'Siti Aminah memvalidasi absensi', time: '1 jam yang lalu' },
    { id: 3, text: 'Dodi Setiawan mengambil paket dari Gudang B', time: '2 jam yang lalu' },
  ]
};

export const mockGudangData = [
  { id: 1, resi: 'JNE123456789', kurir: 'Agus Pratama', gudang: 'Gudang Pusat (Jakarta)', jumlah: 24, tanggal: '2026-07-24', jam: '08:30', status: 'Selesai', catatan: 'Lengkap' },
  { id: 2, resi: 'JNE987654321', kurir: 'Dodi Setiawan', gudang: 'Gudang Cabang (Bandung)', jumlah: 15, tanggal: '2026-07-24', jam: '10:15', status: 'Proses', catatan: 'Menunggu validasi' },
];

export const mockPaketData = [
  { id: 1, resi: 'PKG00123', pengambil: 'Agus Pratama', jumlah: 10, lokasi: 'Gudang A', tanggal: '2026-07-24', jam: '09:00', status: 'Diambil', catatan: '-' },
  { id: 2, resi: 'PKG00124', pengambil: 'Dodi Setiawan', jumlah: 5, lokasi: 'Gudang B', tanggal: '2026-07-24', jam: '11:00', status: 'Pending', catatan: 'Kurir belum datang' },
];

export const mockJadwalData = [
  { id: 1, nama: 'Agus Pratama', shift: 'Pagi', hari: 'Senin', jamMasuk: '08:00', jamPulang: '16:00', status: 'Aktif', catatan: '-' },
  { id: 2, nama: 'Dodi Setiawan', shift: 'Siang', hari: 'Senin', jamMasuk: '16:00', jamPulang: '00:00', status: 'Aktif', catatan: '-' },
];

export const mockAbsensiData = [
  { id: 1, nama: 'Agus Pratama', tanggal: '2026-07-24', jamMasuk: '07:50', jamKeluar: '16:05', totalJam: 8, status: 'Hadir' },
  { id: 2, nama: 'Dodi Setiawan', tanggal: '2026-07-24', jamMasuk: '16:15', jamKeluar: '-', totalJam: 0, status: 'Terlambat' },
  { id: 3, nama: 'Budi Santoso', tanggal: '2026-07-24', jamMasuk: '-', jamKeluar: '-', totalJam: 0, status: 'Sakit' },
];

export const mockPoinData = [
  { id: 1, nama: 'Agus Pratama', totalPoin: 125, rank: 1, riwayat: [{ tgl: '2026-07-24', aktivitas: 'Mengantar Paket', poin: 10 }] },
  { id: 2, nama: 'Dodi Setiawan', totalPoin: 85, rank: 2, riwayat: [{ tgl: '2026-07-24', aktivitas: 'Hadir Tepat Waktu', poin: 5 }] },
];

// Data for Charts
export const chartDataPengantaran = [
  { name: 'Senin', diantar: 120, diambil: 80 },
  { name: 'Selasa', diantar: 150, diambil: 95 },
  { name: 'Rabu', diantar: 180, diambil: 110 },
  { name: 'Kamis', diantar: 130, diambil: 90 },
  { name: 'Jumat', diantar: 160, diambil: 120 },
  { name: 'Sabtu', diantar: 210, diambil: 150 },
  { name: 'Minggu', diantar: 90, diambil: 60 },
];
