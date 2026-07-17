import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

export interface IWallet {
  id: string;
  userId: string;
  balance: number;
  ledgerBalance: number;
  currency: string;
  accountNumber?: string;
  bankCode?: string;
  locked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class Wallet extends Model<IWallet> implements IWallet {
  declare id: string;
  declare userId: string;
  declare balance: number;
  declare ledgerBalance: number;
  declare currency: string;
  declare accountNumber?: string;
  declare bankCode?: string;
  declare locked: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Wallet.init(
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
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    ledgerBalance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'NGN',
    },
    accountNumber: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Wallet',
    tableName: 'wallets',
  }
);

Wallet.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Wallet, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Wallet;
