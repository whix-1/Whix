'use client';

import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/Card';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Wallet Summary */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Wallet Balance</h2>
          <div className="text-4xl font-bold text-primary-500">₦50,000.00</div>
          <p className="text-gray-600 mt-2">Available for transactions</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Fund Wallet', href: '#' },
            { label: 'Buy Airtime', href: '#' },
            { label: 'Buy Data', href: '#' },
            { label: 'Pay Bills', href: '#' },
          ].map((action, index) => (
            <button
              key={index}
              className="card text-center hover:shadow-card-hover transition-shadow"
            >
              {action.label}
            </button>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="text-gray-600">No transactions yet</div>
        </div>
      </div>
    </div>
  );
}
