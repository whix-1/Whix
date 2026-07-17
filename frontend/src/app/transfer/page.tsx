'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiArrowDown, FiQrCode, FiUser } from 'react-icons/fi';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export default function TransferPage() {
  const [activeTab, setActiveTab] = useState<'send' | 'request'>('send');
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Money Transfer</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 bg-white p-2 rounded-lg shadow-md">
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'send'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiSend className="inline mr-2" />
            Send Money
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'request'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiArrowDown className="inline mr-2" />
            Request Money
          </button>
        </div>

        {activeTab === 'send' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setShowQR(true)}
                className="card text-center hover:shadow-card-hover transition-shadow"
              >
                <FiQrCode className="text-4xl text-primary-500 mx-auto mb-2" />
                <p className="font-semibold">Scan QR</p>
              </button>
              <button className="card text-center hover:shadow-card-hover transition-shadow">
                <FiUser className="text-4xl text-primary-500 mx-auto mb-2" />
                <p className="font-semibold">Enter Phone</p>
              </button>
            </div>

            {/* Send Form */}
            <div className="card space-y-4">
              <h2 className="text-xl font-bold">Send Money</h2>
              <Input label="Recipient Email" placeholder="friend@email.com" />
              <Input label="Amount (₦)" placeholder="5000" />
              <Input label="Description" placeholder="Payment for..." />
              <Button className="w-full">Send Money</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card space-y-4"
          >
            <h2 className="text-xl font-bold">Request Money</h2>
            <Input label="Requester Email" placeholder="friend@email.com" />
            <Input label="Amount (₦)" placeholder="5000" />
            <Input label="Reason" placeholder="Loan repayment..." />
            <Button className="w-full">Send Request</Button>
          </motion.div>
        )}

        {/* Recent Transfers */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold mb-4">Recent Transfers</h2>
          <div className="space-y-4">
            {[
              { type: 'sent', to: 'John Doe', amount: '5000', date: '2024-01-15' },
              { type: 'received', from: 'Jane Smith', amount: '10000', date: '2024-01-14' },
            ].map((transfer, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b">
                <div>
                  <p className="font-semibold">
                    {transfer.type === 'sent' ? `Sent to ${transfer.to}` : `Received from ${transfer.from}`}
                  </p>
                  <p className="text-sm text-gray-600">{transfer.date}</p>
                </div>
                <p className={`font-bold ${transfer.type === 'sent' ? 'text-danger-500' : 'text-success-500'}`}>
                  {transfer.type === 'sent' ? '-' : '+'} ₦{transfer.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
