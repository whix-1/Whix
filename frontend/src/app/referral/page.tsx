'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiCreditCard, FiAward } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const referralData = [
  { month: 'Jan', earnings: 5000, referrals: 5 },
  { month: 'Feb', earnings: 12000, referrals: 8 },
  { month: 'Mar', earnings: 25000, referrals: 12 },
  { month: 'Apr', earnings: 42000, referrals: 18 },
  { month: 'May', earnings: 58000, referrals: 25 },
  { month: 'Jun', earnings: 75000, referrals: 32 },
];

export default function ReferralDashboard() {
  const [referralCode] = React.useState('WHIXABC123XY');

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Referral Program</h1>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <FiTrendingUp className="text-3xl" />,
              label: 'Total Earnings',
              value: '₦75,000',
              color: 'from-success-500',
            },
            {
              icon: <FiUsers className="text-3xl" />,
              label: 'Total Referrals',
              value: '32',
              color: 'from-primary-500',
            },
            {
              icon: <FiCreditCard className="text-3xl" />,
              label: 'Pending Commission',
              value: '₦15,000',
              color: 'from-warning-500',
            },
            {
              icon: <FiAward className="text-3xl" />,
              label: 'Current Tier',
              value: 'Gold',
              color: 'from-danger-500',
            },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${kpi.color} to-opacity-0 p-6 rounded-lg text-white shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{kpi.label}</p>
                  <p className="text-3xl font-bold mt-2">{kpi.value}</p>
                </div>
                {kpi.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Referral Code */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Your Referral Code</h2>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <p className="text-gray-600 mb-2">Share this code with friends</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="input flex-1"
                />
                <button className="btn-primary">Copy</button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Referral Link</p>
              <button className="btn-secondary">Share Link</button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Earnings Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#003366" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Referral Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="referrals" fill="#00aa66" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Referrals</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Join Date</th>
                  <th className="text-left py-3 px-4">Transactions</th>
                  <th className="text-left py-3 px-4">Commission</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { email: 'friend1@email.com', date: '2024-01-15', txn: 5, commission: '₦500' },
                  { email: 'friend2@email.com', date: '2024-01-14', txn: 12, commission: '₦1,200' },
                  { email: 'friend3@email.com', date: '2024-01-13', txn: 8, commission: '₦800' },
                ].map((referral, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{referral.email}</td>
                    <td className="py-3 px-4">{referral.date}</td>
                    <td className="py-3 px-4">{referral.txn}</td>
                    <td className="py-3 px-4 font-semibold text-success-500">{referral.commission}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
