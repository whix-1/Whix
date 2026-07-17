'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 400, transactions: 240 },
  { month: 'Feb', revenue: 3000, transactions: 1398 },
  { month: 'Mar', revenue: 2000, transactions: 9800 },
  { month: 'Apr', revenue: 2780, transactions: 3908 },
  { month: 'May', revenue: 1890, transactions: 4800 },
  { month: 'Jun', revenue: 2390, transactions: 3800 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '15,234', color: 'from-primary-500' },
            { label: 'Total Revenue', value: '₦2.5M', color: 'from-success-500' },
            { label: 'Active Transactions', value: '1,234', color: 'from-warning-500' },
            { label: 'Failed Transactions', value: '23', color: 'from-danger-500' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${kpi.color} to-opacity-0 p-6 rounded-lg text-white shadow-lg`}
            >
              <p className="text-sm opacity-90">{kpi.label}</p>
              <p className="text-3xl font-bold mt-2">{kpi.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#003366" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Transaction Volume</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" fill="#00aa66" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
