import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

export interface ITransaction {
  id: string;
  userId: string;
  type: 'airtime' | 'data' | 'electricity' | 'tv' | 'exam' | 'topup' | 'withdrawal';
  service: string;
  amount: number;
  fee: number;
  discount: number;
  totalAmount: number;
  provider: string;
  status: 'pending' | 'success' | 'failed';
  reference: string;
  description?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  metadata?: Record<string, any>;
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

class Transaction extends Model<ITransaction> implements ITransaction {
  declare id: string;
  declare userId: string;
  declare type: 'airtime' | 'data' | 'electricity' | 'tv' | 'exam' | 'topup' | 'withdrawal';
  declare service: string;
  declare amount: number;
  declare fee: number;
  declare discount: number;
  declare totalAmount: number;
  declare provider: string;
  declare status: 'pending' | 'success' | 'failed';
  declare reference: string;
  declare description?: string;
  declare recipientPhone?: string;
  declare recipientEmail?: string;
  declare metadata?: Record<string, any>;
  declare receiptUrl?: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    type: {
      type: DataTypes.ENUM('airtime', 'data', 'electricity', 'tv', 'exam', 'topup', 'withdrawal'),
      allowNull: false,
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed'),
      defaultValue: 'pending',
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    recipientPhone: DataTypes.STRING,
    recipientEmail: DataTypes.STRING,
    metadata: DataTypes.JSONB,
    receiptUrl: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
  }
);

Transaction.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Transaction;
