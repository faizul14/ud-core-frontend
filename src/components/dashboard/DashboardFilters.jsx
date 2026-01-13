'use client';

import { Calendar, Building2, Filter } from 'lucide-react';

const DashboardFilters = ({
    periodeList = [],
    udList = [],
    filterPeriode,
    setFilterPeriode,
    filterUD,
    setFilterUD,
    onApply
}) => {
    return (
        <div className="bg-white dark:bg-white/[0.03] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Periode
                    </label>
                    <select
                        value={filterPeriode}
                        onChange={(e) => setFilterPeriode(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
                    >
                        <option value="">Semua Periode</option>
                        {periodeList.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.nama_periode}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Unit Dagang (UD)
                    </label>
                    <select
                        value={filterUD}
                        onChange={(e) => setFilterUD(e.target.value)}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all dark:text-white"
                    >
                        <option value="">Semua UD</option>
                        {udList.map((ud) => (
                            <option key={ud._id} value={ud._id}>
                                {ud.nama_ud} ({ud.kode_ud})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={onApply}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-500/25 active:scale-95"
                >
                    <Filter className="w-5 h-5" />
                    Terapkan Filter
                </button>
            </div>
        </div>
    );
};

export default DashboardFilters;
