import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

export interface ICommission {
  id: string;
  userId: string;
  referralUserId?: string;
  transactionId?: string;
  amount: number;
  type: 'referral' | 'affiliate' | 'reseller';
  status: 'pending' | 'approved' | 'paid';
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

class Commission extends Model<ICommission> implements ICommission {
  declare id: string;
  declare userId: string;
  declare referralUserId?: string;
  declare transactionId?: string;
  declare amount: number;
  declare type: 'referral' | 'affiliate' | 'reseller';
  declare status: 'pending' | 'approved' | 'paid';
  declare paidAt?: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Commission.init(
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
    referralUserId: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'id' },
    },
    transactionId: DataTypes.UUID,
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('referral', 'affiliate', 'reseller'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'paid'),
      defaultValue: 'pending',
    },
    paidAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Commission',
    tableName: 'commissions',
  }
);

Commission.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Commission, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default Commission;
