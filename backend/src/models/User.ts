import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcryptjs';

export interface IUser {
  id: string;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  kycVerified: boolean;
  kycLevel: 'unverified' | 'level1' | 'level2' | 'level3';
  bvn?: string;
  nin?: string;
  accountNumber?: string;
  bankCode?: string;
  referralCode: string;
  referredBy?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  biometricEnabled: boolean;
  darkMode: boolean;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model<IUser> implements IUser {
  declare id: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare avatar?: string;
  declare kycVerified: boolean;
  declare kycLevel: 'unverified' | 'level1' | 'level2' | 'level3';
  declare bvn?: string;
  declare nin?: string;
  declare accountNumber?: string;
  declare bankCode?: string;
  declare referralCode: string;
  declare referredBy?: string;
  declare twoFactorEnabled: boolean;
  declare twoFactorSecret?: string;
  declare biometricEnabled: boolean;
  declare darkMode: boolean;
  declare status: 'active' | 'inactive' | 'suspended';
  declare lastLogin?: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  toJSON() {
    const { password, twoFactorSecret, ...rest } = this.get();
    return rest;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      lowercase: true,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: DataTypes.STRING,
    kycVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    kycLevel: {
      type: DataTypes.ENUM('unverified', 'level1', 'level2', 'level3'),
      defaultValue: 'unverified',
    },
    bvn: DataTypes.STRING,
    nin: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    referralCode: {
      type: DataTypes.STRING,
      unique: true,
    },
    referredBy: DataTypes.UUID,
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    twoFactorSecret: DataTypes.STRING,
    biometricEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    darkMode: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active',
    },
    lastLogin: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

export default User;
