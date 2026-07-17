'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSmartphone, FiShield, FiZap } from 'react-icons/fi';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary-500 mb-4">
            Financial Freedom at Your Fingertips
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whix VTU is your all-in-one financial platform for airtime, data, bills, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="btn-primary inline-flex items-center gap-2">
              Get Started <FiArrowRight />
            </Link>
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Whix?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FiSmartphone className="text-3xl" />,
              title: 'Mobile First',
              description: 'Seamless experience on all devices'
            },
            {
              icon: <FiShield className="text-3xl" />,
              title: 'Secure',
              description: 'Bank-grade encryption and security'
            },
            {
              icon: <FiZap className="text-3xl" />,
              title: 'Lightning Fast',
              description: 'Instant transactions and confirmations'
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="card text-center"
            >
              <div className="text-primary-500 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
