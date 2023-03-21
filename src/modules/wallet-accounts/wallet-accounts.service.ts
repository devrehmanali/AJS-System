import { Injectable } from '@nestjs/common';
import {WalletAccountsRepository} from '@/modules/wallet-accounts/wallet-accounts.repository';
import {CREDIT, DEBIT} from '@/constants/constants';
const { Types: { ObjectId: ObjectId } } = require("mongoose");

@Injectable()
export class WalletAccountsService {
    constructor(private walletAccountsRepository: WalletAccountsRepository) {
    }

    async findOneAndUpdate(filter: any, data: any): Promise<object | null> {
        return  this.walletAccountsRepository.findOneAndUpdate(filter, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async findWalletByUserIdAndType(userId: any, type: string): Promise<any> {
        return  this.walletAccountsRepository.fetchWalletFilter({user_id: userId, name: type});
    }

    async findWalletByType(type: string): Promise<any> {
        return  this.walletAccountsRepository.fetchWalletFilter({name: type});
    }

    async updateWalletById(id: string, amount: number , type: string): Promise<any> {
        if (type === DEBIT) {
            return  this.walletAccountsRepository.updateWallet({_id:  ObjectId(id)}, {$inc: {"wallet": -amount}});
        } else if (type === CREDIT) {
            return  this.walletAccountsRepository.updateWallet({_id:  ObjectId(id)}, {$inc: {"wallet": amount}});
        }
    }
}
